import React from "react";

const AddModal = () => {
  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-2xl mb-4">ADD TASK</h3>
        <form>
          <div className="form-control w-full mb-2 ">
            <label className="label">
              <span className="label-text text-lg">Title</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full text-lg"
            />
          </div>
          <div className="form-control w-full mb-8">
            <label className="label">
              <span className="label-text text-lg">Status</span>
            </label>
            <select className="select select-bordered w-full text-lg">
              <option selected>Incomplete</option>
              <option>Completed</option>
            </select>
          </div>
          <div>
            <button className="btn btn-primary text-lg mr-3">Add Task</button>
            <button className="btn btn-outline text-lg">Cancel</button>
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
