import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import SectionContainer from "../../components/container/SectionContainer";
import Loading from "../../components/loading/Loading";
import useContextValue from "../../hooks/useContextValue";
import Swal from "sweetalert2";
import { Controller, useForm } from "react-hook-form";
import { usePublicAPI, useSecureAPI } from "../../hooks/useAPI_Links";
import Input from "../../components/formInputs/Input";
import Textarea from "../../components/formInputs/Textarea";
import PublisherSelect from "../../components/formInputs/PublisherSelect";
import ReactSelect from "../../components/formInputs/ReactSelect";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import reactSelectOptions from "../../components/formInputs/ReactSelectOptions";
import { Helmet } from "react-helmet";
const imgApi = import.meta.env.VITE_IMGBB_API_LINK;

const UpdateArticles = () => {
  const { loading, user } = useContextValue();
  const { data } = useLoaderData();
  const publicAPI = usePublicAPI();
  const secureAPI = useSecureAPI();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: article, isLoading } = useQuery({
    queryKey: ["update-articles", user?.email, id],
    queryFn: async () => {
      const { data } = await secureAPI.get(`/articles/${id}`);
      return data;
    },
    enabled: !!user?.email,
  });

  const { date, image, title, description, viewCount, publisher, tags, _id } =
    article || {};

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title,
      description,
      publisher: publisher?._id,
    },
  });

  useEffect(() => {
    if (article) {
      reset({
        title: article.title,
        description: article.description,
        publisher: article.publisher?._id,
      });
    }
  }, [article, reset]);

  const onSubmit = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to update ${title}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const imageFile = { image: data.image[0] };
        if (imageFile?.image) {
          try {
            const { data: res } = await publicAPI.post(imgApi, imageFile, {
              headers: { "Content-Type": "multipart/form-data" },
            });
            if (res?.data?.display_url) {
              data.image = res.data.display_url;
            } else {
              Swal.fire({
                title: "Error!",
                text: "Failed to upload image",
                icon: "error",
              });
              return;
            }
          } catch (error) {
            Swal.fire({
              title: "Error!",
              text: error.message,
              icon: "error",
            });
            return;
          }
        } else data.image = image;

        data.tags = data.tags?.map((tag) => tag.value) || tags;
        data.viewCount = viewCount;
        data.creator = user?.email;
        data.date = date;

        try {
          const { data: updatedData } = await secureAPI.put(
            `/articles/${_id}`,
            data
          );
          if (updatedData?.modifiedCount > 0) {
            navigate("/my-articles");
            // show success message
            Swal.fire({
              title: "Updated!",
              text: "The data has been updated successfully!",
              icon: "success",
              showConfirmButton: false,
              position: "center",
              timer: 2000,
            });
          } else
            Swal.fire({
              title: "Error!",
              text: "Failed to update article!",
              icon: "error",
            });
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: error.message,
            icon: "error",
          });
        }
      }
    });
  };
  if (isLoading || loading) return <Loading />;

  return (
    <SectionContainer>
      <Helmet>
        <title>Update Articles | Pixel News</title>
      </Helmet>
      <h4 className="text-4xl font-semibold text-center">Update Articles</h4>

      <div className="max-w-3xl mx-auto p-5 md:p-10 rounded mt-6 shadow-lg bg-white ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            htmlFor="image"
            label="Article Image"
            type="file"
            clearStyle
            className="w-full p-3 pl-2 "
            validation={{ ...register("image") }}
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
            options={data}
          />

          <label className="block mt-2 ml-2 mb-1">Select Tags</label>
          <span>
            <Controller
              name="tags"
              control={control}
              defaultValue={reactSelectOptions.filter((option) =>
                tags.includes(option.value)
              )}
              render={({ field }) => <ReactSelect field={field} />}
            />
          </span>

          <label className="block text-center mt-4">
            <button className="btn btn-wide btn-accent text-white">
              Add Article
            </button>
          </label>
        </form>
      </div>
    </SectionContainer>
  );
};

export default UpdateArticles;
