import { Outlet } from "react-router-dom";
import Header from "../../sharedComponents/header/Header";
import Footer from "../../sharedComponents/footer/Footer";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
