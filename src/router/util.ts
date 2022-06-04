import type { MouseEvent } from 'react';

export const handleLinkClick = (
  event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
  disabled = false,
): void => {
  if (disabled) event?.preventDefault();
};
