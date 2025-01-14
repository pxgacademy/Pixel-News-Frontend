import PropTypes from "prop-types";
import ContextProvider from "./ContextProvider";
import { useEffect, useState } from "react";
import auth from "../utilities/firebase/firebase.config";
import axios from "axios";
import Swal from "sweetalert2";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

function APIcontext({ children }) {
  const API_LINK = import.meta.env.VITE_API_LINK;
  const googleProvider = new GoogleAuthProvider();
  // const [isDark, setIsDark] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState({
    isAdmin: false,
    isPremium: false,
  });

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (userInfo) => {
    return updateProfile(auth.currentUser, userInfo);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      // send jwt token
      const sendToken = async () => {
        const user = { email: currentUser?.email };
        try {
          const { data } = await axios.post(`${API_LINK}/jwt`, user, {
            withCredentials: true,
          });
          if (data?.message === "JWT token successfully created") {
            const { data } = await axios.get(
              `${API_LINK}/users/role/${currentUser?.email}`,
              { withCredentials: true }
            );
            // if (data?.isPremium) {
            //   const date = new Date();
            //   const presentDate = date.getTime();
            //   const expiryDate =
            //     data.isPremium?.paidDate && parseInt(data.isPremium?.paidDate);
            //   if (presentDate > expiryDate) {
            //     data.isPremium = false;
            //     setUserRole(data);
            //     const { data: res } = await axios.patch(
            //       `${API_LINK}/users/role/update/${currentUser?.email}`,
            //       { isPremium: false },
            //       {
            //         withCredentials: true,
            //       }
            //     );
            //     console.log(res);
            //   }
            // } else 
            setUserRole(data);
          }
        } catch (err) {
          Swal.fire({
            title: err.message,
            icon: "error",
          });
        } finally {
          setLoading(false);
        }
      };

      // delete jwt token
      const deleteToken = async () => {
        try {
          setUserRole({ isAdmin: false, isPremium: false });
          await axios.delete(`${API_LINK}/logout`, { withCredentials: true });
        } catch (err) {
          Swal.fire({
            title: err.message,
            icon: "error",
          });
        } finally {
          setLoading(false);
        }
      };

      if (currentUser?.email) sendToken();
      else deleteToken();
    });

    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);

  const value = {
    userRole,
    setUserRole,
    user,
    setUser,
    loading,
    createUser,
    signInUser,
    updateUser,
    googleSignIn,
    signOutUser,
  };

  return (
    <ContextProvider.Provider value={value}>
      {children}
    </ContextProvider.Provider>
  );
}

APIcontext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default APIcontext;
