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
  const [isDark, setIsDark] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

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
          await axios.post(`${API_LINK}/jwt`, user, { withCredentials: true });
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
    isDark,
    setIsDark,
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
