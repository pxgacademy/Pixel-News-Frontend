import SectionContainer from "../../components/container/SectionContainer";
import banner from "../../assets/images/profile-bg.png";
import useContextValue from "../../hooks/useContextValue";
import { usePublicAPI, useSecureAPI } from "../../hooks/useAPI_Links";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/loading/Loading";
import { RiArticleFill, RiImageEditFill } from "react-icons/ri";
import { PiEyeglassesFill } from "react-icons/pi";
import { FaSackDollar } from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoClose, IoDiamondSharp } from "react-icons/io5";
import { TbDiamondOff } from "react-icons/tb";
import { FaUser, FaUserEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
const imgApi = import.meta.env.VITE_IMGBB_API_LINK;

const MyProfile = () => {
  const { user, loading, updateUser } = useContextValue();
  const secureAPI = useSecureAPI();
  const publicAPI = usePublicAPI();
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

  const { _id, email, name, image, isAdmin, isPremium, coverImage } =
    data?.user || {};

  const handleChangeCover = async (e) => {
    try {
      const image = e.target.files[0];
      const formData = new FormData();
      formData.append("image", image);

      const { data } = await publicAPI.post(imgApi, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data?.data?.display_url) {
        await secureAPI.patch(`/users/update/${_id}`, {
          coverImage: data.data.display_url,
        });
        refetch();
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
      });
    }
  };

  const handleChangeProfile = async (e) => {
    e.preventDefault();
    handleModal(false);
    try {
      const update = {
        name: e.target.name.value,
        image: image,
      };

      if (e.target.image.files[0]) {
        const image = e.target.image.files[0];
        const formData = new FormData();
        formData.append("image", image);

        const { data } = await publicAPI.post(imgApi, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (data?.data?.display_url) update.image = data.data?.display_url;
      }

      await updateUser({ displayName: update?.name, photoURL: update?.image });
      await secureAPI.patch(`/users/update/${_id}`, update);
      refetch();
      Swal.fire({
        title: "Success!",
        text: "Profile updated successfully",
        icon: "success",
        showConfirmButton: false,
        position: "center",
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
      });
    }
  };

  if (loading || isLoading) return <Loading />;

  return (
    <SectionContainer>
      <Helmet>
        <title>Profile | Pixel News</title>
      </Helmet>
      <section className="w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-xl cursor-default">
        <div className="w-full min-h-40 max-h-64 relative flex overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={coverImage ? coverImage : banner}
            alt=""
          />

          {/* icons */}
          <div className="absolute right-1 md:right-5 bottom-1 md:bottom-5 flex gap-3">
            <label
              htmlFor="editCover"
              className="relative bg-white rounded text-center transition-all duration-300 flex items-center justify-center group w-10 h-10 hover:w-28 cursor-pointer"
            >
              <input
                onChange={(e) => handleChangeCover(e)}
                type="file"
                id="editCover"
                className="hidden"
              />
              <span className="absolute transition-all duration-300 group-hover:scale-0">
                <RiImageEditFill />
              </span>
              <span className="absolute transition-all duration-300 scale-0 group-hover:scale-100 group-hover: text-right">
                Edit Cover
              </span>
            </label>

            <button
              onClick={() => handleModal(true)}
              className="relative bg-white rounded text-center transition-all duration-300 flex items-center justify-center group w-10 h-10 hover:w-28"
            >
              <span className="absolute transition-all duration-300 group-hover:scale-0">
                <FaUserEdit />
              </span>
              <span className="absolute transition-all duration-300 scale-0 group-hover:scale-100 group-hover: text-right">
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
          <h4 className="text-center font-girassol text-3xl mb-2">
            Update Profile
          </h4>
          <form onSubmit={handleChangeProfile}>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="block mt-1 w-full px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="type your name"
                defaultValue={name}
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="block mt-1 w-full px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={email}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Choose an Image
              </label>
              <input
                type="file"
                name="image"
                className="block w-full px-3 py-2 text-sm text-gray-700"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3 text-sm font-medium text-white bg-blue-500 rounded-md focus:outline-none hover:bg-blue-600"
            >
              Update Profile
            </button>
          </form>
        </div>
      </dialog>
    </SectionContainer>
  );
};

export default MyProfile;
