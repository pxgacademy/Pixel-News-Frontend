import { Controller, useForm } from "react-hook-form";
import SectionContainer from "../../components/container/SectionContainer";
import Input from "../../components/formInputs/Input";
import Select from "../../components/formInputs/Select";
import Textarea from "../../components/formInputs/Textarea";
import ReactSelect from "../../components/formInputs/ReactSelect";
import useContextValue from "../../hooks/useContextValue";
import { usePublicAPI, useSecureAPI } from "../../hooks/useAPI_Links";
import Swal from "sweetalert2";

const AddArticles = () => {
  const { user } = useContextValue();
  const imgApi = import.meta.env.VITE_IMGBB_API_LINK;
  const publicAPI = usePublicAPI();
  const secureAPI = useSecureAPI();

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: { email: user?.email } });

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    console.log(data);
    try {
      const { data: res } = await publicAPI.post(imgApi, imageFile, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res?.data?.display_url) {
        data.image = res.data.display_url;
        data.tags = data.tags.map((tag) => tag.value);
        data.viewCount = 0;
        data.isPaid = false;
        const { name, email, ...article } = data;
        article.publisher = { name, email };
        article.publisher.email = user?.email

        const { data: result } = await secureAPI.post("/articles", article);
        if (result.insertedId) {
          // clear the image input field after successful upload
          reset();
          setValue("tags", [])
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

  const options = [
    { value: "politics", name: "Politics" },
    { value: "business", name: "Business" },
    { value: "technology", name: "Technology" },
    { value: "health", name: "Health" },
    { value: "science", name: "Science" },
    { value: "entertainment", name: "Entertainment" },
    { value: "sports", name: "Sports" },
    { value: "lifestyle", name: "Lifestyle" },
    { value: "world_news", name: "World News" },
    { value: "environment", name: "Environment" },
    { value: "education", name: "Education" },
    { value: "opinion", name: "Opinion" },
  ];

  return (
    <SectionContainer>
      <h5 className="text-center text-3xl md:text-4xl font-davidLibre">
        Add An Article
      </h5>

      <div className="max-w-3xl mx-auto p-5 md:p-10 rounded mt-6 shadow-lg bg-white ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            htmlFor="name"
            label="Your Name"
            validation={{ ...register("name", { required: true }) }}
            errors={errors}
          />
          <Input
            htmlFor="email"
            type="email"
            readOnly={true}
            label="Your Email"
            validation={{ ...register("email", { required: true }) }}
            errors={errors}
          />

          <Input
            htmlFor="image"
            label="Select An Image"
            type="file"
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

          <Select
            htmlFor="category"
            label="Category"
            validation={{ ...register("category", { required: true }) }}
            errors={errors}
            options={options}
          />

          <label className="block mt-2 ml-2 mb-1">Select Tags</label>
          <span>
            <Controller
              name="tags"
              control={control}
              defaultValue={[]}
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

export default AddArticles;


