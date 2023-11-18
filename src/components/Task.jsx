import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";

const Task = () => {
  return (
    <div className="p-2 md:p-3 bg-base-100 mb-4 flex justify-between items-center rounded-lg">
      <div className="flex items-center">
        <input type="checkbox" className="checkbox" />
        <div className="divider divider-horizontal m-1"></div>
        <div>
          <h3 className="text-lg">Title</h3>
          <p>8:58 PM, 11/18/2023</p>
        </div>
      </div>
      <div>
        <button className="btn mr-2">
          <MdEdit fontSize={20} />
        </button>
        <button className="btn text-lg">
          <MdDelete fontSize={20} />
        </button>
      </div>
    </div>
  );
};

export default Task;
