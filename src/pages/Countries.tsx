import CountrySmall from "../components/CountrySmall";
import { useEffect, useState } from "react";
import { Country } from "../types/CountrySmallProps";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setCountries(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          console.error("Erro desconhecido", error);
        }
      }
    };
    fetchCountries();
  }, []);

  const filterRegion = (region: string) => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/region/${region}?fields=name,flags,population,region,capital`
        );
        const data = await response.json();
        setCountries(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          console.error("Erro desconhecido", error);
        }
      }
    };
    fetchCountries();
  };

  const searchCountry = (countryName: string) => {
    if (!countryName) return;
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${countryName}?fields=name,flags,population,region,capital`
        );
        const data = await response.json();
        if (!data.status) setCountries(data), setError("");
        if (data.status) setError("Country not found!");
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          console.error("Erro desconhecido", error);
        }
      }
    };
    fetchCountries();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a country..."
        onChange={(e) => searchCountry(e.target.value)}
      />
      <select onChange={(e) => filterRegion(e.target.value)}>
        <option hidden>Filter by Region</option>
        <option>Africa</option>
        <option>America</option>
        <option>Asia</option>
        <option>Europe</option>
        <option>Oceania</option>
      </select>
      <div>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          countries.map((country: Country) => (
            <CountrySmall
              key={country.name.common}
              flags={country.flags.png}
              name={country.name.common}
              population={country.population}
              region={country.region}
              capital={country.capital}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Countries;
