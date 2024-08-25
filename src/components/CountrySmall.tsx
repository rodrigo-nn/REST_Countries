import { CountrySmallProps } from "../types/CountrySmallProps";
const CountrySmall: React.FC<CountrySmallProps> = ({
  flags,
  name,
  population,
  region,
  capital,
}) => {
  return (
    <div>
      <img src={flags} alt={name} />
      <div>
        <h3>{name}</h3>
        <div>
          <h4>Population:</h4>
          <p>{population}</p>
        </div>
        <div>
          <h4>Region:</h4>
          <p>{region}</p>
        </div>
        <div>
          <h4>Capital:</h4>
          <p>{capital}</p>
        </div>
      </div>
    </div>
  );
};

export default CountrySmall;
