import { Outlet } from "react-router-dom";
import Header from "../../sharedComponents/header/Header";
import Footer from "../../sharedComponents/footer/Footer";
import HeaderBanner from "../../sharedComponents/header/HeaderBanner";

const MainLayout = () => {
  return (
    <>
      <HeaderBanner />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
