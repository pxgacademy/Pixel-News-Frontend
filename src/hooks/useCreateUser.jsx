import { useState } from "react";
import { usePublicAPI } from "./useAPI_Links";
import Swal from "sweetalert2";
import useContextValue from "./useContextValue";

const useCreateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const publicAPI = usePublicAPI();
  const { signOutUser } = useContextValue();

  const handleCreateUser = async (user) => {
    setIsLoading(true);
    // create user in firebase
    try {
      const { data } = await publicAPI.post("/users", user);

      // if user already exists, send a patch req to update last login time
      if (data?.message === "User already exists") {
        const { data: res } = await publicAPI.patch(`/users/${user?.email}`, {
          lastLoginAt: user?.lastLoginAt,
        });
        console.log(res);
        if (res?.modifiedCount <= 0) {
          // if failed to update last login time, signout user to login again.
          signOutUser();
          Swal.fire({
            title: "Error!",
            text: "Failed to update user, Login again!",
            icon: "error",
          });
          return;
        }
      }

      // if new user created successfully, notify user by success message
      if (data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "User created successfully",
          icon: "success",
          showConfirmButton: false,
          position: "center",
          timer: 2000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return [handleCreateUser, isLoading];
};

export default useCreateUser;
