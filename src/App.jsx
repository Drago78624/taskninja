import React, { useEffect, useState } from "react";
import Tasks from "./components/Tasks";
import { createPortal } from "react-dom";
import AddModal from "./components/AddModal";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const App = () => {
  const [theme, setTheme] = useState("dark");
  const [isDarkMode, setDarkMode] = useState(true);

  const toggleDarkMode = (checked) => {
    const newTheme = isDarkMode ? "light" : "dark";
    setTheme(newTheme);
    setDarkMode(checked);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <div className="container mx-auto p-2 max-w-5xl">
      <div className="flex justify-center py-4">
        <DarkModeSwitch
          checked={isDarkMode}
          onChange={toggleDarkMode}
          size={20}
          sunColor="#64758B"
        />
      </div>
      <h1 className="text-center p-4 text-2xl md:text-4xl font-bold tracking-wide mb-2">
        TASK NINJA
      </h1>
      <div className="flex justify-between mb-4">
        <button
          className="btn btn-primary text-lg"
          onClick={() => document.getElementById("my_modal_2").showModal()}
        >
          Add Task
        </button>
        {createPortal(<AddModal />, document.getElementById("body"))}
        <div>
          <select className="select select-bordered w-full max-w-xs text-lg">
            <option selected>All</option>
            <option>Completed</option>
            <option>Incomplete</option>
          </select>
        </div>
      </div>
      <Tasks />
    </div>
  );
};

export default App;
