import Swal from "sweetalert2";
import { useSecureAPI } from "./useAPI_Links";

const usePatch = () => {
  const secureAPI = useSecureAPI();

  const handleUpdate = ({
    link = false,
    data = {},
    refetch = false,
    questionTitle = "Are you sure?",
    questionText = "You are about to update a data!",
    successTitle = "Updated!",
    successText = "The data has been updated successfully!",
  }) => {
    // check isLink!
    if (!link)
      return Swal.fire({
        title: "Error!",
        text: "Link is required!",
        icon: "error",
      });

    // ask before updating
    Swal.fire({
      title: questionTitle,
      text: questionText,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await secureAPI.patch(link, data);
          // check refetch is required or not
          if (refetch) refetch();
          // show success message
          Swal.fire({
            title: successTitle,
            text: successText,
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
      }
    });
  };

  return [handleUpdate];
};

export default usePatch;
