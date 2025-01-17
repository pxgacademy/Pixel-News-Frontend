import { useQuery } from "@tanstack/react-query";
import DashboardContainer from "../../../components/container/DashboardContainer";
import { useSecureAPI } from "../../../hooks/useAPI_Links";
import useContextValue from "../../../hooks/useContextValue";
import Loading from "../../../components/loading/Loading";
import NoDataFound from "../../../components/loading/NoDataFound";
import { useSecureDataLoader } from "../../../hooks/useDataLoader";
import AllUsersTableRow from "./AllUsersTableRow";

const AllUsers = () => {
  const secureAPI = useSecureAPI();
  const { user, loading } = useContextValue();
  const [analytics = {}, analyticsLoading] =
    useSecureDataLoader("/admin/analytics");

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const { data } = await secureAPI.get(`/users`);
      return data;
    },
    enabled: !!user?.email,
  });

  if (loading || isLoading || analyticsLoading) return <Loading />;
  return (
    <DashboardContainer header="All Users">
      {users.length <= 0 ? (
        <NoDataFound />
      ) : (
        <div className="overflow-x-auto bg-white rounded-3xl p-3 md:p-6 mt-8">
          <table className="table table-zebra rounded-xl overflow-hidden">
            {/* head */}
            <thead>
              <tr className="uppercase bg-sky-200">
                <th>#</th>
                <th>Picture</th>
                <th>Name</th>
                <th>Email</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((singleUser, i) => (
                <AllUsersTableRow
                  key={i}
                  singleUser={singleUser}
                  serial={i + 1}
                  refetch={refetch}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardContainer>
  );
};

export default AllUsers;
