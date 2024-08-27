import CountrySmall from "../components/CountrySmall";
import { useEffect, useState } from "react";
import { Country } from "../types/CountrySmallProps";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetchCountries("all");
  }, []);

  const fetchCountries = async (url: string, prevURL?: string) => {
    if (!prevURL) prevURL = "";
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/${prevURL}${url}?fields=name,flags,population,region,capital`
      );
      const data = await response.json();
      if (!data.message) setCountries(data), setError("");
      if (data.message) setError("Country not found!");
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        console.error("Erro desconhecido", error);
      }
    }
  };

  const filterRegion = (region: string) => {
    if (region === "all") fetchCountries(region), setRegionFilter("");
    if (region !== "all")
      fetchCountries(region, "region/"), setRegionFilter(region);
  };
  const searchCountry = (countryName: string) => {
    if (!countryName) return fetchCountries("all"), setSearchInput("");
    fetchCountries(countryName, "name/");
    setSearchInput(countryName);
  };

  return (
    <div>
      <input
        name="SearchCountryInput"
        type="text"
        placeholder="Search for a country..."
        value={searchInput}
        onChange={(e) => searchCountry(e.target.value)}
      />
      <select
        name="RegionSelect"
        onChange={(e) => filterRegion(e.target.value)}
      >
        <option value="all">Filter by Region</option>
        <option>Africa</option>
        <option>Americas</option>
        <option>Asia</option>
        <option>Europe</option>
        <option>Oceania</option>
      </select>
      <div>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          countries.map((country: Country) =>
            !regionFilter || regionFilter === country.region ? (
              <CountrySmall
                key={country.name.common}
                flags={country.flags.png}
                name={country.name.common}
                officialName={country.name.official}
                population={country.population}
                region={country.region}
                capital={country.capital}
              />
            ) : null
          )
        )}
      </div>
    </div>
  );
};

export default Countries;
