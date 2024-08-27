export type Flags = {
  svg: string;
  alt: string;
};
export type LangInit = {
  common: string;
};
export type NativeName = {
  [key: string]: LangInit;
};
export type Name = {
  common: string;
  official: string;
  nativeName: NativeName;
};
export type Currency = {
  [key: string]: CurrencyInit;
};
export type CurrencyInit = {
  name: string;
};
export type Languages = {
  [key: string]: string;
};
export type CountryType = {
  flags: Flags;
  name: Name;
  population: number;
  region: string;
  capital: string[];
  subregion: string;
  tld: string;
  currencies: Currency;
  languages: Languages;
  borders: string[];
};
