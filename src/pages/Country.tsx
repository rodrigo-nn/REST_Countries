import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CountryType } from "../types/countryType";

const Country = () => {
  const { countryID } = useParams();
  const [country, setCountry] = useState<CountryType>();
  const [error, setError] = useState("");
  const [currency, setCurrency] = useState<string[]>([]);
  const [language, setLanguage] = useState<string[]>([]);
  const [bordersObj, setBordersObj] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${countryID}?fields=name,flags,population,region,capital,subregion,languages,borders,tld,currencies`
        );
        if (!response.ok) {
          return navigate("/NotFound");
        }
        const data = await response.json();
        setCountry(data[0]);
        if (data[0]?.borders?.length > 0) {
          const bordersResponse = await fetch(
            `https://restcountries.com/v3.1/alpha?codes=${data[0].borders.join(
              ","
            )}&fields=name`
          );
          const borderData = await bordersResponse.json();
          setBordersObj(borderData);
        }
        const getCurrency = Object.keys(data[0].currencies);
        const getLanguage = Object.keys(data[0].languages);
        setCurrency(getCurrency);
        setLanguage(getLanguage);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
          setError(error.message);
        } else {
          console.error("Erro desconhecido", error);
        }
      }
    };
    fetchCountries();
  }, [countryID, navigate]);

  if (!country) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <div>
        <button onClick={() => navigate("/")}>Back</button>
      </div>
      <div>
        <img src={country.flags?.svg} alt={country.flags?.alt} />
        <div>
          <h2>{country.name.common}</h2>
          <div>
            <div>
              <div>
                <h4>Native Names:</h4>
                {language.map((langInit) => (
                  <div key={langInit}>
                    {country.name.nativeName?.[langInit]?.common || "N/A"}
                  </div>
                ))}
              </div>
              <div>
                <h4>Population:</h4>
                <div>{country.population}</div>
              </div>
              <div>
                <h4>Region:</h4>
                <div>{country.region}</div>
              </div>
              <div>
                <h4>Sub Region:</h4>
                <div>{country.subregion}</div>
              </div>
              <div>
                <h4>Capital:</h4>
                <div>{country.capital}</div>
              </div>
            </div>
            <div>
              <div>
                <h4>Top Level Domain:</h4>
                <div>{country.tld}</div>
              </div>
              <div>
                <h4>Currencies:</h4>
                {currency.map((currencyInit) => (
                  <div key={currencyInit}>
                    {country.currencies?.[currencyInit]?.name || "N/A"}
                  </div>
                ))}
              </div>
              <div>
                <h4>Languages:</h4>
                {language.map((Languages) => (
                  <div key={Languages}>
                    {country.languages?.[Languages] || "N/A"}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h4>Border Countries</h4>
            {bordersObj.map((borderCountry: CountryType) => (
              <Link
                to={`../country/${borderCountry.name.official}`}
                key={borderCountry.name.common}
              >
                {borderCountry.name.common}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Country;
