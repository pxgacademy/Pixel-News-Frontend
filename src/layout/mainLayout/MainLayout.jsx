import { Outlet } from "react-router-dom";
import Header from "../../sharedComponents/header/Header";
import Footer from "../../sharedComponents/footer/Footer";
import HeaderBanner from "../../sharedComponents/header/HeaderBanner";
import useContextValue from "../../hooks/useContextValue";

const MainLayout = () => {
  const { isDark } = useContextValue();
  return (
    <section className={`${isDark && "dark"}`}>
      <HeaderBanner />
      <Header />
      <Outlet />
      <Footer />
    </section>
  );
};

export default MainLayout;
