import { useState } from "react";
import { useSecureAPI } from "./useAPI_Links";
import Swal from "sweetalert2";

const useCreateUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const secureAPI = useSecureAPI();

  const handleCreateUser = async (user) => {
    setIsLoading(true);
    // create user in firebase

    try {
      const { data } = await secureAPI.post("/users", user);
      if (data.insertedId)
        Swal.fire({
          title: "Success!",
          text: "User created successfully",
          icon: "success",
          showConfirmButton: false,
          position: "center",
          timer: 2000,
        });
      else
        Swal.fire({
          title: "Error!",
          text: "Failed to create user",
          icon: "error",
        });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return [handleCreateUser, isLoading];
};

export default useCreateUser;
