import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") !== "light"
  );

  useEffect(() => {
    const theme = darkMode ? "dark" : "light";

    localStorage.setItem(
      "theme",
      theme
    );

    document.documentElement.setAttribute(
      "data-theme",
      theme
    );
  }, [darkMode]);

  return (
    <button
      onClick={() =>
        setDarkMode(!darkMode)
      }
      className="bg-cyan-500 px-4 py-2 rounded font-bold"
    >
      {darkMode
        ? "🌞 Light Mode"
        : "🌙 Dark Mode"}
    </button>
  );
}