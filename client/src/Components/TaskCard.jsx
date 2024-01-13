import React from "react";

function TaskCard({ task }) {
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <h3 className="text-2xl font-bold mb-2">{task.title}</h3>
    
      <p className="text-stale-300 text-xl">{task.description}</p>
      <p>{new Date(task.date).toLocaleDateString()}</p>
      <div className="my-4 flex gap-x-4 justify-end px-2">
        <button>Delete</button>
        <button>Edit</button>
      </div>
    </div>
  );
}

export default TaskCard;
