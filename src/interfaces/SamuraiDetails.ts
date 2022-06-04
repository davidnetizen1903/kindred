/* eslint-disable camelcase */

/**
 * Structure of a samurai attribute
 */
export interface Attribute {
  trait_type: string;
  value: string | number;
  display_type: string;
}

/**
 * Structure of the details for a Samurai entity
 */
export interface SamuraiDetails {
  readonly id: number;
  readonly description: string;
  readonly external_url: string;
  readonly image: string;
  readonly name: string;
  readonly attributes: Attribute[];
}
