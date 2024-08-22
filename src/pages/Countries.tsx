import CountrySmall from "../components/CountrySmall";

const Countries = () => {
  return (
    <div>
      <input type="text" placeholder="Search for a country..." />
      <select>
        <option hidden>Filter by Region</option>
        <option>Africa</option>
        <option>América</option>
        <option>Asia</option>
        <option>Europe</option>
        <option>Oceania</option>
      </select>
      <div>
        <CountrySmall />
      </div>
    </div>
  );
};

export default Countries;
