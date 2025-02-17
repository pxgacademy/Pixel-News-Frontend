import { useEffect } from "react";
import useContextValue from "../../hooks/useContextValue";
import { IoSunny } from "react-icons/io5";
import { IoMdMoon } from "react-icons/io";

const ThemeModeBtn = () => {
  const { isDark, setIsDark } = useContextValue();

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const isDarkMode = theme === "true";
    setIsDark(isDarkMode);
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [setIsDark]);

  const toggleDarkMode = () => {
    const theme = !isDark;
    setIsDark(theme);
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute(
      "data-theme",
      theme ? "dark" : "light"
    );
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-darkOne text-2xl"
    >
      {isDark ? <IoSunny /> : <IoMdMoon />}
    </button>
  );
};

export default ThemeModeBtn;
