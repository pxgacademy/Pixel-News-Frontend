import Loading from "../../../components/loading/Loading";
import { useSecureDataLoader } from "../../../hooks/useDataLoader";
import useViewportWidth from "../../../hooks/useViewportWidth";
import { Chart } from "react-google-charts";
import useContextValue from "../../../hooks/useContextValue";

const PieChart = () => {
  const width = useViewportWidth();
  const [data = {}, isLoading] = useSecureDataLoader("/admin/analytics");
  const { isDark } = useContextValue(); // Using dark mode context

  const count =
    data?.articlesPerPublisher?.map((value) => [
      value._id,
      value.totalArticles,
    ]) || [];

  const chartData = [["Publisher's name", "Total articles"], ...count];

  const options = {
    backgroundColor: "transparent",
    chartArea: {
      backgroundColor: "transparent",
    },
    legend: { 
      position: width >= 640 ? "left" : "bottom",
      textStyle: { color: isDark ? "white" : "black" }, // Change text color based on dark mode
    },
    pieHole: 0.2,
  };

  const chartWidth = { width: width };
  if (width > 1530) chartWidth.width = 1530 - 350;
  else if (width < 640) chartWidth.width = width;
  else chartWidth.width = width - 350;

  if (isLoading) return <Loading />;
  
  return (
    <div className="bg-white dark:bg-black/20 pt-10 rounded-2xl overflow-hidden shadow-lg">
      <h4 className="text-center text-xl font-semibold">Publisher's Article Percentages</h4>
      <Chart
        chartType="PieChart"
        data={chartData}
        options={options}
        width={`${chartWidth.width}px`}
        height={"400px"}
      />
    </div>
  );
};

export default PieChart;
