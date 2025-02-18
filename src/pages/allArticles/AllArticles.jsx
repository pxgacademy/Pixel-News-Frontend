import { FaSearch } from "react-icons/fa";
import ArticleCard from "../../components/articleCard/ArticleCard";
import SectionContainer from "../../components/container/SectionContainer";
import Loading from "../../components/loading/Loading";
import { useEffect, useState } from "react";
import reactSelectOptions from "../../components/formInputs/ReactSelectOptions";
import useContextValue from "../../hooks/useContextValue";
import { useQuery } from "@tanstack/react-query";
import { usePublicAPI } from "../../hooks/useAPI_Links";
import { useLoaderData } from "react-router-dom";
import NoDataFound from "../../components/loading/NoDataFound";
import { Helmet } from "react-helmet";

const AllArticles = () => {
  const { loading } = useContextValue();
  const publicAPI = usePublicAPI();
  const { data: allPublishers } = useLoaderData();
  const [type, setType] = useState("all");
  const [search, setSearch] = useState("");
  const [publisher, setPublisher] = useState("All Publishers");
  const categories = [
    { value: "all", label: "All Categories" },
    ...reactSelectOptions,
  ];
  
  const publishers = [{ name: "All Publishers" }, ...allPublishers];

  const {
    data: articles = [],
    isLoading,
    refetch: refresh,
  } = useQuery({
    queryKey: ["All-approved-Articles"],
    queryFn: async () => {
      const { data } = await publicAPI.get(
        `/articles/approved?tags=${type}&publisher=${publisher}&title=${search}`
      );
      return data;
    },
  });

  useEffect(() => {
    refresh();
    // eslint-disable-next-line
  }, [type, publisher, search]);

  const handleReset = () => {
    setType("all");
    setPublisher("All Publishers");
    setSearch("");
  };

  if (isLoading || loading) return <Loading />;

  return (
    <SectionContainer header="All Articles">
      <Helmet>
        <title> All Articles | Pixel News</title>
      </Helmet>
      <div className="w-full mx-auto bg-gray-50 dark:bg-black/10 shadow dark:shadow-xl py-4 px-3 rounded-xl border dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-2">
          <label className="block w-full h-12">
            <select
              onChange={(e) => setType(e.target.value)}
              value={type}
              className="bg-transparent w-full py-3 px-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-within:border-0 focus-within:outline focus-within:outline-2 focus-within:outline-blue-500"
            >
              {categories.map((category) => (
                <option
                  key={category.value}
                  value={category.value}
                  className="bg-white dark:bg-darkOne text-darkTwo dark:text-white"
                >
                  {category.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block w-full h-12">
            <select
              onChange={(e) => setPublisher(e.target.value)}
              value={publisher}
              className="bg-transparent w-full py-3 px-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-within:border-0 focus-within:outline focus-within:outline-2 focus-within:outline-blue-500"
            >
              {publishers.map((publisher) => (
                <option
                  key={publisher.name}
                  value={publisher.name}
                  className="bg-white dark:bg-darkOne text-darkTwo dark:text-white"
                >
                  {publisher.name}
                </option>
              ))}
            </select>
          </label>

          <label className="md:col-span-2 md:flex items-center gap-4">
            <label className=" h-12 grow flex items-center justify-between overflow-hidden border border-gray-300 dark:border-gray-600 rounded-lg focus-within:border-0 focus-within:outline focus-within:outline-2 focus-within:outline-blue-500">
              <input
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                type="text"
                placeholder="search by title or location..."
                className="bg-transparent pl-3 py-2 grow border-none outline-none"
              />
              <button className="px-6 py-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600">
                <FaSearch />
              </button>
            </label>
            <button
              onClick={handleReset}
              className="mt-2 md:mt-0 w-full md:w-auto h-12 px-6 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg"
            >
              reset
            </button>
          </label>
        </div>
      </div>

      {articles.length === 0 ? (
        <NoDataFound />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      )}
    </SectionContainer>
  );
};

export default AllArticles;
