import Loading from "../../../components/loading/Loading";
import { useSecureDataLoader } from "../../../hooks/useDataLoader";
import { Chart } from "react-google-charts";
import useViewportWidth from "../../../hooks/useViewportWidth";
import useContextValue from "../../../hooks/useContextValue";

const ColumnChart = () => {
  const width = useViewportWidth() || 0;
  const [data = {}, isLoading] = useSecureDataLoader("/admin/analytics");
  const { isDark } = useContextValue(); // Get dark mode state

  const count =
    data?.articlesPerPublisher?.map((value) => [value._id, value.totalViews]) || [];

  const chartData = [["Publisher's name", "Views"], ...count];

  const options = {
    backgroundColor: "transparent",
    chartArea: {
      backgroundColor: "transparent",
    },
    legend: {
      textStyle: { color: isDark ? "white" : "black" }, // Adjust text color based on dark mode
    },
    hAxis: {
      textStyle: { color: isDark ? "white" : "black" }, // X-axis text color
    },
    vAxis: {
      textStyle: { color: isDark ? "white" : "black" }, // Y-axis text color
      gridlines: { color: isDark ? "#444" : "#ddd" }, // Gridlines color
    },
    colors: isDark ? ["#4F46E5"] : ["#2563EB"], // Bar color (Dark mode: Indigo, Light mode: Blue)
  };

  const chartWidth = { width };
  if (width > 1530) chartWidth.width = 1530 - 350;
  else if (width < 640) chartWidth.width = width;
  else chartWidth.width = width - 350;

  if (isLoading) return <Loading />;

  return (
    <div className="bg-white dark:bg-black/20 pt-10 rounded-2xl overflow-hidden shadow-lg mt-16">
      <h4 className="text-center text-xl font-semibold">Publisher's Article Views</h4>
      <Chart
        chartType="ColumnChart"
        data={chartData}
        width={`${chartWidth.width}px`}
        height="400px"
        options={options}
      />
    </div>
  );
};

export default ColumnChart;
