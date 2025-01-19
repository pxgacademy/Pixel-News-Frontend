import Loading from "../../../components/loading/Loading";
import { usePublicDataLoader } from "../../../hooks/useDataLoader";

const AllPublishers = () => {
  const [publishers = [], isLoading] = usePublicDataLoader("/publishers");

  if (isLoading) return <Loading minHeight="" />;
  return (
    <div className="mt-16">
      <h3 className="text-3xl font-semibold text-center">All Publishers</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-5 cursor-default">
        {publishers.map((publisher) => (
          <div key={publisher._id} className="flex items-center gap-x-3 shadow p-2">
            <img className="w-16 h-16 object-cover" src={publisher.photo} alt={publisher.name} />
            <h3 className="text-lg font-semibold">{publisher.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPublishers;
