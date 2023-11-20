import React, { useEffect, useState } from "react";
import Tasks from "./components/Tasks";
import { createPortal } from "react-dom";
import AddModal from "./components/AddModal";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const App = () => {
  const [filter, setFilter] = useState("all")
  const [theme, setTheme] = useState("dark");
  const [isDarkMode, setDarkMode] = useState(true);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

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
          onClick={() => document.getElementById("add_modal").showModal()}
        >
          Add Task
        </button>
        {createPortal(<AddModal />, document.getElementById("body"))}
        <div>
          <select value={filter} onChange={handleFilterChange} className="select select-bordered w-full max-w-xs text-lg">
            <option value={"all"}>All</option>
            <option value={"completed"}>Completed</option>
            <option value={"incomplete"}>Incomplete</option>
          </select>
        </div>
      </div>
      <Tasks filter={filter} />
    </div>
  );
};

export default App;
