import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Menu from "../components/Menu";
import Countries from "./Countries";
import Country from "./Country";
import Error from "./Error";
const Home = () => {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<Countries />} />
        <Route path="/country" element={<Country />} />
        <Route path="/404" element={<Error />} />
        <Route path="*" element={<Navigate to="404" />} />
      </Routes>
    </Router>
  );
};

export default Home;
