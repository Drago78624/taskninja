import React, { useEffect, useState } from "react";
import Task from "./Task";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase-config";
import moment from "moment";
import { ClipLoader } from "react-spinners";

const Tasks = (props) => {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);

  let taskFilter;
  if (props.filter == "completed") {
    taskFilter = true;
  } else if (props.filter == "incomplete") {
    taskFilter = false;
  } else {
    taskFilter = undefined;
  }

  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(
      query(
        collection(db, "tasks"),
        taskFilter !== undefined ? where("status", "==", taskFilter) : undefined,
        orderBy('timestamp', 'desc')
      ),
      (data) => {
        const tasksData = data.docs.map((item) => {
          return { ...item.data(), id: item.id };
        });
        setTasks(tasksData);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [taskFilter]);

  return (
    <div className="min-h-[100px] bg-base-200 p-2 md:p-3 rounded-lg flex flex-col justify-center">
      {loading ? (
        <ClipLoader className="mx-auto" color="oklch(var(--p))" size={34} />
      ) : (
        tasks.map((task) => {
          const timestamp = task.timestamp;
          const momentObject = moment(timestamp?.toDate());
          const formattedDate = momentObject.format("h:mm A, MM/DD/YYYY");

          return (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              status={task.status}
              date={formattedDate}
            />
          );
        })
      )}
      {(!loading && tasks.length == 0) && (
        <h2 className="mx-auto bg-base-100 w-fit p-3 rounded-lg font-semibold">
          No Tasks
        </h2>
      )}
    </div>
  );
};

export default Tasks;
