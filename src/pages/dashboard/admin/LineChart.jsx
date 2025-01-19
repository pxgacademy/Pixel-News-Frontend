import Loading from "../../../components/loading/Loading";
import { useSecureDataLoader } from "../../../hooks/useDataLoader";
import useViewportWidth from "../../../hooks/useViewportWidth";
import { Chart } from "react-google-charts";

const LineChart = () => {
  const width = useViewportWidth() || 0
  const [data ={}, isLoading] = useSecureDataLoader("/admin/analytics");

  const chartData = [
    ["Label", "Value"],
    ['Users',data.users],
    ['Premium',data.premium],
    ['Normal',data.nonPremium],
  ];

  const options = {
    redFrom: 90,
    redTo: 100,
    yellowFrom: 75,
    yellowTo: 90,
    minorTicks: 5,
  };

  const chartWidth = {width: width}
  if(width>1530) chartWidth.width = 1530 - 350
  else if (width<640) chartWidth.width = width
  else chartWidth.width = width - 350

  if (isLoading) return <Loading />;
  return (
    <div className="bg-white pt-10 rounded-2xl overflow-hidden shadow-lg mt-10">
      <h4 className="text-center text-xl font-semibold mb-7">
        Pixel News Users
      </h4>
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
