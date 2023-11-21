import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../firebase-config";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const UpdateModal = (props) => {
  const [t, setT] = useState(props.status)
  const updateModalRef = useRef();

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

  const resetForm = () => {
    reset();
  };

  const updateTask = async (data) => {
    await updateDoc(doc(db, "tasks", props.id), {
      title: data.title,
      status: t,
      timestamp: serverTimestamp(),
    });
    reset();
    updateModalRef.current.close();
  };

  useEffect(() => {
    setT(props.status);
  }, [props.status]);

  return (
    <dialog
      id={`update_modal_${props.id}`}
      ref={updateModalRef}
      className="modal"
    >
      <div className="modal-box">
        <h3 className="font-bold text-2xl mb-4">UPDATE TASK</h3>
        <form method="dialog" onSubmit={handleSubmit(updateTask)}>
          <div className="form-control w-full mb-2 ">
            <label className="label">
              <span className="label-text text-lg">Title</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full text-lg"
              defaultValue={props.title}
              {...register("title")}
            />
          </div>
          <div className="form-control w-full mb-8">
            <label className="label">
              <span className="label-text text-lg">Status</span>
            </label>
            <select
              className="select select-bordered w-full text-lg"
              value={t ? "completed" : "incomplete"}
              onChange={e => setT(e.target.value)}
            >
              <option value="incomplete">Incomplete</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="flex gap-1">
            <button className="btn btn-primary text-lg mr-3">
              Update Task
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={resetForm}>close</button>
      </form>
    </dialog>
  );
};

export default UpdateModal;
