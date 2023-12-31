import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { db } from "../firebase-config";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const AddModal = () => {
  const addModalRef = useRef()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const formSchema = yup.object().shape({
    title: yup.string().required("Please enter a title"),
    status: yup.string().default("incomplete"),
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const addTask = async (data) => {
    await addDoc(collection(db, "tasks"), {
      title: data.title,
      status: data.status == "completed" ? true : false,
      timestamp: serverTimestamp(),
    });
    reset();
    addModalRef.current.close()
  };

  return (
    <dialog id="add_modal" ref={addModalRef} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-2xl mb-4">ADD TASK</h3>
        <form method="dialog" onSubmit={handleSubmit(addTask)}>
          <div className="form-control w-full mb-2 ">
            <label className="label">
              <span className="label-text text-lg">Title</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full text-lg"
              {...register("title")}
            />
          </div>
          <div className="form-control w-full mb-8">
            <label className="label">
              <span className="label-text text-lg">Status</span>
            </label>
            <select
              className="select select-bordered w-full text-lg"
              {...register("status")}
            >
              <option value="incomplete">Incomplete</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="flex gap-1">
            <button className="btn btn-primary text-lg mr-3">Add Task</button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default AddModal;
