import Menu from "../components/Menu";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Menu />
      <Outlet />
    </>
  );
};

export default Home;
