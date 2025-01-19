import SectionContainer from "../../components/container/SectionContainer";
import banner from "../../assets/images/profile-bg.png";
import useContextValue from "../../hooks/useContextValue";
import { useSecureAPI } from "../../hooks/useAPI_Links";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/loading/Loading";
import { RiArticleFill, RiImageEditFill } from "react-icons/ri";
import { PiEyeglassesFill } from "react-icons/pi";
import { FaSackDollar } from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoClose, IoDiamondSharp } from "react-icons/io5";
import { TbDiamondOff } from "react-icons/tb";
import { FaUser, FaUserEdit } from "react-icons/fa";

const MyProfile = () => {
  const { user, loading } = useContextValue();
  const secureAPI = useSecureAPI();
  const {
    data = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-profile", user?.email],
    queryFn: async () => {
      const { data } = await secureAPI.get(`/users/${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  // handle modal
  const handleModal = (action) => {
    const modal = document.getElementById("my_modal_5");
    if (action) modal.showModal();
    else modal.close();
  };

  console.log(data);

  const { email, name, image, isAdmin, isPremium, coverImage } =
    data?.user || {};

  if (loading || isLoading) return <Loading />;

  return (
    <SectionContainer>
      <section className="w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-xl">
        <div className="w-full max-h-64 relative flex overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={coverImage ? coverImage : banner}
            alt=""
          />

          {/* icons */}
          <div className="absolute right-5 bottom-5 flex gap-3">
            <button className="relative overflow-hidden bg-white p-3 rounded hover:w-32 text-left transition-all duration-300 delay-100 flex items-center group">
              <span>
                <RiImageEditFill />
              </span>
              <span className="absolute -right-3 transition-all duration-300 group-hover:translate-x-0 group-hover:right-3 text-right translate-x-[100%]">
                Edit Cover
              </span>
            </button>
            <button
              onClick={() => handleModal(true)}
              className="relative overflow-hidden bg-white p-3 rounded hover:w-32 text-left transition-all duration-300 delay-100 flex items-center group"
            >
              <span>
                <FaUserEdit />
              </span>
              <span className="absolute -right-3 transition-all duration-300 group-hover:translate-x-0 group-hover:right-3 text-right translate-x-[100%]">
                Edit Profile
              </span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* left side */}
          <div className="md:col-span-2 bg-gradient-to-bl from-[#BD3F6E] to-[#6D2E72]">
            <div className="relative flex justify-center items-start">
              <img
                className="absolute w-16 h-16 md:w-40 md:h-40 lg:w-52 lg:h-52 object-cover rounded-full -translate-y-[50%]"
                src={image}
                alt="Profile picture"
              />
            </div>
            <div className="mt-8 md:mt-20 lg:mt-28 p-5 text-white text-center">
              <p className="text-2xl md:text-3xl font-semibold">{name}</p>
              <p className="text-2xl">{email}</p>
            </div>

            <div className="flex text-white border-t border-white/30">
              <span className="flex-1 p-5 flex items-center gap-x-2">
                {isPremium ? <IoDiamondSharp /> : <TbDiamondOff />}
                {isPremium ? "Premium" : "Not Premium"}
              </span>
              <span className="flex-1 border-l border-white/30 p-5 flex items-center gap-x-2">
                {isAdmin ? <MdAdminPanelSettings /> : <FaUser />}
                {isAdmin ? "Admin" : "User"}
              </span>
            </div>
          </div>

          {/* right side  */}
          <div className="md:col-span-3 bg-white p-5 flex items-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
              <div className="text-center border rounded-lg shadow-md p-5">
                <span className="text-7xl inline-block">
                  <RiArticleFill />
                </span>
                <p className="text-xl font-semibold">Total Articles</p>
                <span className="text-4xl font-righteous">
                  {data?.articles}
                </span>
                +
              </div>
              <div className="text-center border rounded-lg shadow-md p-5">
                <span className="text-7xl inline-block">
                  <PiEyeglassesFill />
                </span>
                <p className="text-xl font-semibold">Total Views</p>
                <span className="text-4xl font-righteous">
                  {data?.totalViews}
                </span>
                +
              </div>
              <div className="text-center border rounded-lg shadow-md p-5">
                <span className="text-7xl inline-block">
                  <FaSackDollar />
                </span>
                <p className="text-xl font-semibold">Payments</p>
                <span className="text-4xl font-righteous">
                  {data?.totalPayment}
                </span>
                +
              </div>
            </div>
          </div>
        </div>
      </section>

      <dialog
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle md:w-[600px] mx-auto"
      >
        <div className="modal-box">
          <div className="relative">
            <button
              onClick={() => handleModal(false)}
              className="absolute -right-5 -top-5 btn btn-sm btn-circle text-black"
            >
              <IoClose />
            </button>
          </div>
          <h4 className="text-center font-girassol text-3xl mb-2">Payment</h4>
        </div>
      </dialog>
    </SectionContainer>
  );
};

export default MyProfile;
