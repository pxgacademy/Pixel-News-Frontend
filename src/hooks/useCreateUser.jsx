import { useState } from "react";
import { usePublicAPI } from "./useAPI_Links";
import Swal from "sweetalert2";


const useCreateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const publicAPI = usePublicAPI();


  const handleCreateUser = async (user) => {
    setIsLoading(true);
    // create user in firebase
    try {
      const { data } = await publicAPI.post("/users", user);

      if (data?.message === "User already exists") {
        Swal.fire({
          title: "Success!",
          text: "User logged in successfully",
          icon: "success",
          showConfirmButton: false,
          position: "center",
          timer: 2000,
        });
        return;
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
