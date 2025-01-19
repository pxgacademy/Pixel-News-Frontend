import { Controller, useForm } from "react-hook-form";
import SectionContainer from "../../components/container/SectionContainer";
import Input from "../../components/formInputs/Input";
import Textarea from "../../components/formInputs/Textarea";
import ReactSelect from "../../components/formInputs/ReactSelect";
import useContextValue from "../../hooks/useContextValue";
import { usePublicAPI, useSecureAPI } from "../../hooks/useAPI_Links";
import Swal from "sweetalert2";
import { usePublicDataLoader } from "../../hooks/useDataLoader";
import Loading from "../../components/loading/Loading";
import PublisherSelect from "../../components/formInputs/PublisherSelect";
import useMyArticles from "../../hooks/useMyArticles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
const imgApi = import.meta.env.VITE_IMGBB_API_LINK;

const AddArticles = () => {
  const [isPermitted, setIsPermitted] = useState(true);
  const { user, loading, userRole } = useContextValue();
  const publicAPI = usePublicAPI();
  const secureAPI = useSecureAPI();
  const navigate = useNavigate()
  const [publishers, isLoading] = usePublicDataLoader("/publishers");
  const [articles, articlesLoading] = useMyArticles();


  useEffect(() => {
    if (articles.length >= 1 && !userRole.isPremium) {
      if (userRole.isAdmin) setIsPermitted(true);
      else setIsPermitted(false);
    }
    // eslint-disable-next-line
  }, [userRole.isPremium, userRole.inAdmin, articles]);

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    try {
      const { data: res } = await publicAPI.post(imgApi, imageFile, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res?.data?.display_url) {
        data.image = res.data.display_url;
        data.tags = data.tags.map((tag) => tag.value);
        data.creator = user?.email;
        const { data: result } = await secureAPI.post("/articles", data);
        if (result.message === "Failed to insert article") {
          Swal.fire({
            title: "Try again!",
            text: "Failed to insert article",
            icon: "error",
          });
          return;
        }
        if (result.insertedId) {
          // clear the image input field after successful upload
          reset();
          setValue("tags", []);
          navigate('/my-articles')
          Swal.fire({
            title: "Success!",
            text: "Article added successfully",
            icon: "success",
            showConfirmButton: false,
            position: "center",
            timer: 2000,
          });
        } else
          Swal.fire({
            title: "Error!",
            text: "Failed to add article",
            icon: "error",
          });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
      });
    }
  };

  if (isLoading || loading || articlesLoading) return <Loading />;

  return (
    <SectionContainer header="Add An Article">
      <Helmet>
        <title>Add Article | Pixel News</title>
      </Helmet>
      <div className="max-w-3xl mx-auto p-5 md:p-10 rounded mt-6 shadow-lg bg-white ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            htmlFor="image"
            label="Select an Image"
            type="file"
            clearStyle
            className="w-full p-3 pl-2 "
            validation={{ ...register("image", { required: true }) }}
            errors={errors}
          />

          <Input
            htmlFor="title"
            label="Article Title"
            validation={{ ...register("title", { required: true }) }}
            errors={errors}
          />

          <Textarea
            htmlFor="description"
            label="Article Description"
            validation={{ ...register("description", { required: true }) }}
            errors={errors}
            className="min-h-32 max-h-52"
          />

          <PublisherSelect
            htmlFor="publisher"
            label="Publisher"
            validation={{ ...register("publisher", { required: true }) }}
            errors={errors}
            options={publishers}
          />

          <label className="block mt-2 ml-2 mb-1">Select Tags</label>
          <span>
            <Controller
              name="tags"
              control={control}
              defaultValue={[]}
              rules={{ required: "Tags are required" }}
              render={({ field }) => <ReactSelect field={field} />}
            />
          </span>
          {errors && errors.tags?.type === "required" && (
            <span className="text-error inline-block mt-1 ml-2 lowercase">
              Tags are required
            </span>
          )}

          <label className="block text-center mt-4">
            <button
            disabled={!isPermitted}
            className="btn px-10 btn-accent text-white disabled:bg-error disabled:text-white">
              {isPermitted? 'Add Article':'Get Premium to Add More Articles'}
            </button>
          </label>
        </form>
      </div>
    </SectionContainer>
  );
};

export default AddArticles;
