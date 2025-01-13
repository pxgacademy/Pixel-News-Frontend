import { useContext } from "react";
import ContextProvider from "../contexts/ContextProvider";


const useContextValue = () => {
  const context = useContext(ContextProvider);
  return context;
};

export default useContextValue;
