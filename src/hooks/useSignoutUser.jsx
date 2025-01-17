import Swal from "sweetalert2";
import useContextValue from "./useContextValue";

const useSignoutUser = () => {
  const { signOutUser } = useContextValue();

  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser()
          .then(() =>
            Swal.fire({
              title: "Successfully Logout",
              icon: "success",
              showConfirmButton: false,
              position: "center",
              timer: 2000,
            })
          )
          .catch((err) =>
            Swal.fire({
              title: err.message,
              icon: "error",
            })
          );
      }
    });
  };

  return [handleSignOut];
};

export default useSignoutUser;
