import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { db } from "../firebase-config";
import UpdateModal from "./UpdateModal";
import { createPortal } from "react-dom";

const Task = (props) => {
  const [taskCompleted, setTaskCompleted] = useState(props.status);

  const deleteTask = async () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to Delete this task ?"
    );
    if (userConfirmed) {
      await deleteDoc(doc(db, "tasks", props.id));
    } else {
      return;
    }
  };

  useEffect(() => {
    setTaskCompleted(props.status);
  }, [props.status]);

  useEffect(() => {
    updateDoc(doc(db, "tasks", props.id), {
      status: taskCompleted,
    });
  }, [taskCompleted]);

  return (
    <div className="p-2 md:p-3 bg-base-100 mb-4 flex justify-between items-center rounded-lg">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={taskCompleted}
          onChange={() => setTaskCompleted(!taskCompleted)}
          className="checkbox"
        />
        <div className="divider divider-horizontal m-1"></div>
        <div>
          <h3 className={`text-lg ${taskCompleted && "line-through text-gray-700"}`}>
            {props.title}
          </h3>
          <p>{props.date}</p>
        </div>
      </div>
      <div>
        <button
          className="btn mr-2"
          onClick={() =>
            document.getElementById(`update_modal_${props.id}`).showModal()
          }
        >
          <MdEdit fontSize={20} />
        </button>
        {createPortal(
          <UpdateModal
            title={props.title}
            status={props.status}
            id={props.id}
          />,
          document.getElementById("body")
        )}
        <button className="btn text-lg" onClick={deleteTask}>
          <MdDelete fontSize={20} />
        </button>
      </div>
    </div>
  );
};

export default Task;
