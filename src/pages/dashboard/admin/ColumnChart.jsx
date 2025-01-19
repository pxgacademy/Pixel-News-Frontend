import Loading from "../../../components/loading/Loading";
import { useSecureDataLoader } from "../../../hooks/useDataLoader";
import { Chart } from "react-google-charts";
import useViewportWidth from "../../../hooks/useViewportWidth";

const ColumnChart = () => {
    const width = useViewportWidth() || 0
  const [data, isLoading] = useSecureDataLoader("/admin/analytics");

  const count =
    data?.articlesPerPublisher?.map((value) => [value._id, value.totalViews]) ||
    [];

  const chartData = [["Publisher's name", "views"], ...count];

  const chartWidth = {width: width}
  if(width>1530) chartWidth.width = 1530 - 350
  else if (width<640) chartWidth.width = width
  else chartWidth.width = width - 350

  if (isLoading) return <Loading />;
  return (
    <div className="bg-white pt-10 rounded-2xl overflow-hidden shadow-lg mt-16">
      <h4 className="text-center text-xl font-semibold">
        Publisher's Article Views
      </h4>
      <Chart
        chartType="ColumnChart"
        data={chartData}
        width={`${chartWidth.width}px`}
        height={"400px"}
      />
    </div>
  );
};

export default ColumnChart;
