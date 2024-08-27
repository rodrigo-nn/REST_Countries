export type Flags = {
  png: string;
};
export type Name = {
  common: string;
  official: string;
};

export type Country = {
  flags: Flags;
  name: Name;
  population: number;
  region: string;
  capital: string[];
};

export type CountrySmallProps = {
  flags: string;
  name: string;
  officialName: string;
  population: number;
  region: string;
  capital: string[];
};
