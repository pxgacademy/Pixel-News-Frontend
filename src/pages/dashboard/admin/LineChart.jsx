import Loading from "../../../components/loading/Loading";
import { useSecureDataLoader } from "../../../hooks/useDataLoader";
import useViewportWidth from "../../../hooks/useViewportWidth";
import { Chart } from "react-google-charts";
import useContextValue from "../../../hooks/useContextValue";

const LineChart = () => {
  const width = useViewportWidth() || 0;
  const [data = {}, isLoading] = useSecureDataLoader("/admin/analytics");
  const { isDark } = useContextValue(); // Get dark mode status

  const chartData = [
    ["Label", "Value"],
    ["Users", data.users || 0],
    ["Premium", data.premium || 0],
    ["Normal", data.nonPremium || 0],
  ];

  const options = {
    redFrom: 90,
    redTo: 100,
    yellowFrom: 75,
    yellowTo: 90,
    minorTicks: 5,
    backgroundColor: "transparent",
    chartArea: {
      backgroundColor: "transparent",
    },
    legend: {
      textStyle: { color: isDark ? "white" : "black" }, // Adjust text color based on dark mode
    },
  };

  const chartWidth = { width };
  if (width > 1530) chartWidth.width = 1530 - 350;
  else if (width < 640) chartWidth.width = width;
  else chartWidth.width = width - 350;

  if (isLoading) return <Loading />;

  return (
    <div className="bg-white dark:bg-black/20 pt-10 rounded-2xl overflow-hidden shadow-lg mt-10">
      <h4 className="text-center text-xl font-semibold mb-7">Pixel News Users</h4>
      <Chart
        chartType="Gauge"
        width={`${chartWidth.width}px`}
        height="400px"
        data={chartData}
        options={options}
      />
    </div>
  );
};

export default LineChart;
