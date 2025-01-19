import DashboardContainer from "../../../components/container/DashboardContainer";
import { Chart } from "react-google-charts";
import { useSecureDataLoader } from "../../../hooks/useDataLoader";
import Loading from "../../../components/loading/Loading";
import useContextValue from "../../../hooks/useContextValue";

const Admin = () => {
  const { loading } = useContextValue();
  const [data, isLoading] = useSecureDataLoader("/admin/analytics");

  const count =
    data?.articlesPerPublisher?.map((value) => [
      value._id,
      value.totalArticles,
    ]) || [];
  console.log(count);

  const tata = [["Publisher's name", "Total articles"], ...count];

  const options = {
    title: "Publisher's Percentage ",
    legend: { position: "left" },
    pieHole: 0.2,
  };

  if (isLoading || loading) return <Loading />;
  return (
    <DashboardContainer header="Admin Dashboard">
      <Chart
        chartType="PieChart"
        data={tata}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    </DashboardContainer>
  );
};

export default Admin;
