import Swal from "sweetalert2";
import { useSecureAPI } from "./useAPI_Links";

const useDelete = () => {
  const secureAPI = useSecureAPI();

  const handleDelete = ({
    link = false,
    refetch = false,
    questionTitle = "Are you sure?",
    questionText = "You will not be able to recover this data!",
    successTitle = "Deleted!",
    successText = "Data has been deleted.",
  }) => {
    // check isLink!
    if (!link)
      return Swal.fire({
        title: "Error!",
        text: "Link is required!",
        icon: "error",
      });


    // ask before deleting
    Swal.fire({
      title: questionTitle,
      text: questionText,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await secureAPI.delete(link);
          // check data successfully deleted or not
          if (data.deletedCount <= 0)
            return Swal.fire({
              title: "Error!",
              text: "Data can not delete!",
              icon: "error",
            });

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

  return [handleDelete];
};

export default useDelete;
