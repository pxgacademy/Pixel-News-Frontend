import Swal from "sweetalert2";
import DashboardContainer from "../../../components/container/DashboardContainer";
import { usePublicAPI, useSecureAPI } from "../../../hooks/useAPI_Links";
const imgApi = import.meta.env.VITE_IMGBB_API_LINK;

const AddPublisher = () => {
  const secureAPI = useSecureAPI();
  const publicAPI = usePublicAPI();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const image = event.target.photo.files[0];

    if (!image) {
      Swal.fire({
        title: "Please select a logo!",
        text: "You must select logo to add a publisher",
        icon: "error",
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    const { data } = await publicAPI.post(imgApi, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (data?.data?.display_url) {
      const publisher = {
        name: event.target.name.value,
        photo: data?.data?.display_url,
      };
      const { data: result } = await secureAPI.post("/publishers", publisher);
      if (result?.insertedId) {
        event.target.reset();
        Swal.fire({
          title: "Success!",
          text: "Publisher added successfully",
          icon: "success",
          showConfirmButton: false,
          position: "center",
          timer: 2000,
        });
      } else
        Swal.fire({
          title: "Try again!",
          text: "Failed to add publisher",
          icon: "error",
        });
    }
  };
  return (
    <DashboardContainer header="Add Publisher">
      <div className="w-full h-[calc(100vh-12rem)] flex items-center justify-center">
        <div className="w-full max-w-xl mx-auto p-5 md:p-8 bg-white rounded-lg shadow-xl">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label>Publisher Name</label>
            <input
              type="text"
              name="name"
              placeholder="Type here"
              className="input input-bordered mt-1 mb-3"
              required
            />
            <label>Select Publisher Logo</label>
            <input type="file" name="photo" className="mt-2" required />
            <button role="submit" className="btn mt-5">
              Add Publisher
            </button>
          </form>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default AddPublisher;
