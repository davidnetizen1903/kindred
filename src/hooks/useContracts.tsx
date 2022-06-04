import { createContext, useContext, useEffect, useState } from 'react';

import { ethers } from 'ethers';
// import { formatUnits, parseUnits } from 'ethers/lib/utils';

import madladABI from '../features/contracts/madlads-abi.json';
// import { setUser } from 'features';
// import { useAppDispatch } from 'hooks/useAppDispatch';
// import { useAppSelector } from 'hooks/useAppSelector';

export const MOST_EXPENSIVE_PACK = 4;
const ITEMS_PER_COLLECTION_PAGE = 12;
const ITEMS_PER_CATALOG_PAGE = 12;

const bscProvider = new ethers.providers.JsonRpcProvider(
  process.env.REACT_APP_TESTNET !== 'false'
    ? process.env.REACT_APP_RPC_TEST
    : process.env.REACT_APP_RPC_MAIN,
);

const DESIRED_CHAIN_ID =
  process.env.REACT_APP_TESTNET !== 'false'
    ? process.env.REACT_APP_CHAIN_ID_T
    : process.env.REACT_APP_CHAIN_ID_M;

const SAMURAI_ADR =
  process.env.REACT_APP_TESTNET !== 'false'
    ? process.env.REACT_APP_SAMURAI_T
    : process.env.REACT_APP_SAMURAI_M;

const samurai = new ethers.Contract(SAMURAI_ADR || '', madladABI, bscProvider);

// let user = '';
// let signer: ethers.Signer | undefined;
// let connected = false;

// const catalogPagesLoaded: number[] = [];
// let curCatalogPage = 0;
let numCatalogPages = 0;
let currentIndexUsedForCatalog: number = 0;

let numCollPages = 0;
// let collectionElementsLoaded: number[] = [];
// let curCollectionPage = 0;
// let rsunApproved = false;

// let packs: Pack[] = [];

export const ContractDataContext = createContext<any>({
  // samurai,
  // rsun,
  // connect: undefined,
  // disconnect: undefined,
  // tryFetchingWeb3Provider: undefined,
  // checkApprovals: undefined,
  // web3Provider: undefined,
  // signer: undefined,
  // user: '',
  // connected: false,
  // rsunApproved: undefined,
  // rsunBalance: undefined,
  // packs: undefined,
  // approveRsun: undefined,
  // purchasePack: undefined,
  // connecting: false,
  // approving: false,
  // purchasing: false,
  // collection: undefined,
  // fetchCollection: undefined,
  // catalog: undefined,
  // fetchCatalog: undefined,
});

export const useContracts = () => useContext(ContractDataContext);

/**
 * A hook that initializes contracts
 *
 * @returns The initialized contracts + useful data
 */
export const ContractDataProvider = ({ children }: any) => {
  // const dispatch = useAppDispatch();
  // const { user } = useAppSelector((state) => state.app)

  // const handleSetUser = (u: string) => dispatch(setUser(u));

  const [user, setUser] = useState('');
  const [signer, setSigner] = useState<ethers.Signer | undefined>(undefined);
  const [connected, setConnected] = useState(false);

  const [web3Provider, setWeb3Provider] =
    useState<ethers.providers.Web3Provider>();

  const [inFetchBalance, setInFetchBalance] = useState(false);

  const [packs] = useState<Pack[]>([]);

  const [inFetchCollection, setInFetchCollection] = useState(false);
  const [collection, setCollection] = useState<number[]>([]);

  const [connecting, setConnecting] = useState(false);
  const [approving] = useState(false);
  const [purchasing, setPurchasing] = useState(false);

  const [successfullyPurchased, setSuccessfullyPurchased] = useState(0);

  const [catalog, setCatalog] = useState<number[]>([]);
  const [price, setPrice] = useState(0);
  const [prvPrice, setPrivatePrice] = useState(0);
  const [idsToOwners, setIdsToOwners] = useState<NumbersToStrings>({});

  const [isWrongNetwork, setIsWrongNetwork] = useState(false);

  const tryFetchingWeb3Provider = () => {
    // console.debug(`tryFetchingWeb3Provider entered`);
    if (Object.keys(window).includes('ethereum')) {
      setWeb3Provider(
        new ethers.providers.Web3Provider((window as any).ethereum, 'any'),
      );
    } else if (Object.keys(window).includes('web3')) {
      setWeb3Provider(
        new ethers.providers.Web3Provider((window as any).web3, 'any'),
      );
    }
  };

  useEffect(() => {
    setTimeout(() => tryFetchingWeb3Provider(), 100);
  }, [ethers]);

  // need BNB balance instead
  const fetchBalance = async () => {
    // console.debug(
    //   `entering fetchBalance: inFetchBalance: ${inFetchBalance}; user: ${user}`,
    // );
    if (inFetchBalance) return;
    setInFetchBalance(true);

    if (user && user.length === 42) {
      // console.debug('fetchBalance: if passed');

      setConnecting(false);
    }

    setInFetchBalance(false);
  };

  const fetchPrice = async () => {
    const cost = await samurai.getCost(true);
    setPrice(
      ethers.BigNumber.from(cost).div(ethers.BigNumber.from(1e15)).toNumber(),
    );
  };

  const fetchPrivatePrice = async () => {
    const cost = await samurai.getCost(false);
    setPrivatePrice(
      ethers.BigNumber.from(cost).div(ethers.BigNumber.from(1e15)).toNumber(),
    );
  };

  // should map to Madlads contract
  const fetchCollection = async (
    page = 1,
    // pageSize = ITEMS_PER_COLLECTION_PAGE,
  ) => {
    if (inFetchCollection) return;
    setInFetchCollection(true);

    if (user) {
      const bal = await samurai.balanceOf(user).catch(() => {});

      const arr = [];
      for (let i = 0; i < ITEMS_PER_COLLECTION_PAGE; i += 1) {
        const el = i + (page - 1) * ITEMS_PER_COLLECTION_PAGE;
        if (el < bal /*  && !collectionElementsLoaded.includes(el) */)
          arr.push(el);
        else break;
      }

      // console.debug("fetchCollection: arr:");
      // console.debug(arr);

      const queries = arr.map((e) =>
        samurai.tokenOfOwnerByIndex(user, e).catch(() => {}),
      );
      const coll = await Promise.all(queries);

      if (!coll.length) return;

      for (let i = 0; i < coll.length; i += 1) {
        coll[i] = parseInt(coll[i].toString(), 10);
      }

      setCollection(coll);

      numCollPages = Math.ceil(
        parseFloat(bal.toString()) / ITEMS_PER_COLLECTION_PAGE,
      );
      // collectionElementsLoaded = [...collectionElementsLoaded, ...arr];

      /*
      console.debug('fetchCollection: coll:');
      console.debug(`fetchCollection: numCollPages: ${numCollPages}`);
      console.debug(coll);
      */
    }
    setInFetchCollection(false);
  };

  // call totalSupply() to get the current number of NFT's for madlad contract
  const fetchCatalog = async (page = 1, pageSize = ITEMS_PER_CATALOG_PAGE) => {
    let currentIndex;
    // console.log('fetching');

    if (!currentIndexUsedForCatalog) {
      currentIndex = await samurai.totalSupply().catch(() => {}); // dealing with burnt tokens properly could be difficult

      currentIndexUsedForCatalog = currentIndex;
    } else {
      currentIndex = currentIndexUsedForCatalog;
    }

    // if (catalogPagesLoaded && catalogPagesLoaded.includes(page)) {
    //   return;
    // }

    const arr = [];
    for (let i = 1; i <= pageSize; i += 1) {
      const el = currentIndex - (i + (page - 1) * pageSize);
      if (el >= 0) arr.push(el);
    }

    const queries = arr.map((e) => samurai.ownerOf(e).catch(() => {}));
    const owners = await Promise.all(queries);

    let idsToOwnrs: NumbersToStrings = {};
    for (let i = 0; i < arr.length; i += 1) {
      const id = arr[i];
      const owner = owners[i];

      idsToOwnrs = { ...idsToOwnrs, [id]: owner };
    }

    // for filtering out burned tokens, probably not needed
    // for (let i = 0; i < arr.length; i++) {
    //   const el: number = arr[i];

    //   if (!idsToOwnrs[el]) { // in case a new element added in this loop is a burnt one
    //     idsToOwnrs[el] = await samurai.ownerOf(el)
    //   }

    //   if (idsToOwnrs[el].includes('0x000000000000000000000000000000000000')) { // both 0x0..0000 and 0x0..dead
    //     arr = arr.filter((e: number) => {if (e !== el) return e;})
    //     arr.push(arr[-1] - 1) // lowest num in array is at the last index (-1) so this adds the next in sequence
    //   }
    // }

    setCatalog(arr);
    setIdsToOwners({ ...idsToOwners, ...idsToOwnrs });

    numCatalogPages = Math.ceil(
      parseFloat(currentIndex.toString()) / ITEMS_PER_CATALOG_PAGE,
    );

    // catalogPagesLoaded.push(page);
    // curCatalogPage = page;

    // console.debug('fetchCatalog: arr:');
    // console.debug(arr);
  };

  useEffect(() => {
    setTimeout(() => fetchBalance(), 100);
    setTimeout(() => fetchCollection(), 1000);
    fetchPrice();
    fetchPrivatePrice();
  }, [user]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeout(() => fetchBalance(), 1000);
    }, 10000);

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, []);

  const connect = async () => {
    if (!web3Provider) {
      tryFetchingWeb3Provider();
    }

    // Prompt user for account connections
    if (web3Provider && !signer) {
      setConnecting(true);

      await web3Provider.send('eth_requestAccounts', []);

      const s = web3Provider.getSigner();
      const chainId = await s.getChainId();
      // console.log(chainId);

      if (chainId.toString() !== (DESIRED_CHAIN_ID || '56')) {
        // console.error('Wrong Network');
        setIsWrongNetwork(true);
        setConnecting(false);
        setConnected(false);
        return;
      }

      // signer = s;
      setSigner(s);

      const u = await s.getAddress().catch(() => {});
      setUser(u || '');
      // user = u || '';

      setConnected(true);
      // connected = true;
      // console.debug('Connected to account with address ', u);

      // setConnecting(false);
    }
  };

  const disconnect = () => {
    setSigner(undefined);
    // signer = undefined;
    setConnected(false);
    // connected = false;
    setUser('');
    // user = '';

    // console.debug('Disconnected from account');
  };

  const purchasePack = async (type: number) => {
    setSuccessfullyPurchased(0);

    // console.debug(`purchasePack entered with type: ${type}`);
    if (signer && packs[type]) {
      setPurchasing(true);
      const samSigner = samurai.connect(signer);
      await samSigner
        .purchasePack(type)
        .then((res: ethers.ContractTransaction) => {
          // console.log(`purchasePack: res:`);
          // console.log(res);

          res.wait(1).then(() => {
            setPurchasing(false);
            setSuccessfullyPurchased(packs[type].numCards);
            fetchCollection();
          });
        })
        .catch(() => {
          // console.error(`purchasePack: purchasePack(${type}) failed with:`);
          // console.error(e);
          setPurchasing(false);
          setSuccessfullyPurchased(0);
        });
    } else {
      // console.debug(`purchasePack failed, no signer`);
    }
  };

  return (
    <ContractDataContext.Provider
      value={{
        samurai,

        connect,
        disconnect,
        tryFetchingWeb3Provider,

        web3Provider,
        signer,
        user,
        connected,
        price,
        prvPrice,
        packs,

        purchasePack,

        connecting,
        approving,
        purchasing,

        collection,
        fetchCollection,
        catalog,
        fetchCatalog,
        successfullyPurchased,

        numCatalogPages,
        numCollPages,

        isWrongNetwork,
      }}
    >
      {children}
    </ContractDataContext.Provider>
  );
};

interface Pack {
  cost: number;
  numCards: number;
  onSale: boolean;
}

interface NumbersToStrings {
  [id: number]: string;
}

// interface ContractData {
//   samurai: ethers.Contract;

//   connect: any;
//   disconnect: any;
//   tryFetchingWeb3Provider: any;
//   checkApprovals: any;

//   web3Provider: any;
//   signer: ethers.Signer;
//   user: string;
//   connected: boolean;

//   packs: any;

//   purchasePack: any;

//   connecting: boolean;
//   approving: boolean;
//   purchasing: boolean;

//   collection: any;
//   fetchCollection: any;
//   catalog: any;
//   fetchCatalog: any;
// }
