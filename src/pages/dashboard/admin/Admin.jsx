import { Helmet } from "react-helmet";
import DashboardContainer from "../../../components/container/DashboardContainer";
import Loading from "../../../components/loading/Loading";
import useContextValue from "../../../hooks/useContextValue";
import ColumnChart from "./ColumnChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

const Admin = () => {
  const { loading } = useContextValue();

  if (loading) return <Loading />;
  return (
    <DashboardContainer header="Admin Dashboard">
      <Helmet>
        <title>Admin | Pixel News</title>
      </Helmet>
      <PieChart />
      <ColumnChart />
      {/* <LineChart /> */}
    </DashboardContainer>
  );
};

export default Admin;
