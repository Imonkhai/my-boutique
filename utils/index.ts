export const formatPrice = (price: number): string =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

export const cn = (...classes: (string | undefined | null | false)[]): string =>
  classes.filter(Boolean).join(' ');

export const truncate = (str: string, length: number): string =>
  str.length > length ? `${str.slice(0, length)}...` : str;

export const getDiscountedPrice = (price: number, discount: number): number =>
  Math.round(price * (1 - discount / 100));
