// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleCheck, faClipboardList, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
// import { addTask, updateTask } from "../services/api";

// function TaskForm({ refresh, selectedTask, clearSelection }) {
//   const [task, setTask] = useState({
//     title: "",
//     description: "",
//     date: ""
//   });

//   useEffect(() => {
//     if (selectedTask) {
//       setTask(selectedTask);
//     }
//   }, [selectedTask]);

//   const handleChange = (e) => {
//     setTask({ ...task, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (task.id) {
//       await updateTask(task.id, task);
//     } else {
//       await addTask(task);
//     }

//     setTask({ title: "", description: "", date: "" });
//     clearSelection();
//     refresh();
//   };

//   return (
//     <section className="rounded-[28px] border border-neutral-200/80 bg-white/90 p-5 shadow-warm-lg backdrop-blur sm:p-6 dark:border-neutral-800/80 dark:bg-neutral-950/90">
//       <div className="mb-4 flex items-start justify-between gap-3">
//         <div>
//           <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary-600 dark:text-primary-400">
//             {task.id ? "Edit Task" : "New Task"}
//           </p>
//           <h3 className=" mt-1 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
//             {task.id ? "Update your task details" : "Plan your next move"}
//           </h3>
//         </div>
//         <div className="rounded-2xl bg-primary-50 p-2.5 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
//           <FontAwesomeIcon icon={faClipboardList} className="h-5 w-5" />
//         </div>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Title</label>
//           <input
//             type="text"
//             name="title"
//             placeholder="Task title"
//             value={task.title}
//             onChange={handleChange}
//             required
//             className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:bg-neutral-950"
//           />
//         </div>

//         <div>
//           <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Description</label>
//           <textarea
//             name="description"
//             rows="3"
//             placeholder="Add some context..."
//             value={task.description}
//             onChange={handleChange}
//             required
//             className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:bg-neutral-950"
//           />
//         </div>

//         <div>
//           <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Due date</label>
//           <div className="relative">
//             <FontAwesomeIcon icon={faCalendarDays} className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" />
//             <input
//               type="date"
//               name="date"
//               value={task.date}
//               onChange={handleChange}
//               required
//               className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 py-3 pl-10 pr-4 text-sm text-neutral-900 outline-none transition focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:bg-neutral-950"
//             />
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/20 transition hover:-translate-y-0.5 hover:shadow-xl"
//         >
//           <FontAwesomeIcon icon={faCircleCheck} className="h-4 w-4" />
//           {task.id ? "Update Task" : "Add Task"}
//         </button>
//       </form>
//     </section>
//   );
// }

// export default TaskForm;


import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faClipboardList, faCalendarDays, faFlag, faTag } from "@fortawesome/free-solid-svg-icons";
import { addTask, updateTask } from "../services/api";

const PRIORITY_OPTIONS = ["HIGH", "MEDIUM", "LOW"];

function TaskForm({ refresh, selectedTask, clearSelection }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    date: "",
    category: "",
    priority: ""
  });

  useEffect(() => {
    if (selectedTask) {
      setTask({
        ...selectedTask,
        category: selectedTask.category || "",
        priority: selectedTask.priority || ""
      });
    }
  }, [selectedTask]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...task,
      category: task.category.trim() === "" ? null : task.category.trim(),
      priority: task.priority === "" ? null : task.priority,
    };

    if (task.id) {
      await updateTask(task.id, payload);
    } else {
      await addTask(payload);
    }

    setTask({ title: "", description: "", date: "", category: "", priority: "" });
    clearSelection();
    refresh();
  };

  return (
    <section className="rounded-[28px] border border-neutral-200/80 bg-white/90 p-5 shadow-warm-lg backdrop-blur sm:p-6 dark:border-neutral-800/80 dark:bg-neutral-950/90">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary-600 dark:text-primary-400">
            {task.id ? "Edit Task" : "New Task"}
          </p>
          <h3 className=" mt-1 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            {task.id ? "Update your task details" : "Plan your next move"}
          </h3>
        </div>
        <div className="rounded-2xl bg-primary-50 p-2.5 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
          <FontAwesomeIcon icon={faClipboardList} className="h-5 w-5" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Task title"
            value={task.title}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:bg-neutral-950"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Description</label>
          <textarea
            name="description"
            rows="3"
            placeholder="Add some context..."
            value={task.description}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:bg-neutral-950"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Priority</label>
            <div className="relative">
              <FontAwesomeIcon icon={faFlag} className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" />
              <select
                name="priority"
                value={task.priority}
                onChange={handleChange}
                className="w-full appearance-none rounded-2xl border border-neutral-200 bg-neutral-50 py-3 pl-10 pr-4 text-sm text-neutral-900 outline-none transition focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:bg-neutral-950"
              >
                <option value="">None</option>
                {PRIORITY_OPTIONS.map((p) => (
                  <option key={p} value={p}>
                    {p.charAt(0) + p.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Category</label>
            <div className="relative">
              <FontAwesomeIcon icon={faTag} className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" />
              <input
                type="text"
                name="category"
                placeholder="e.g. Work"
                value={task.category}
                onChange={handleChange}
                className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 py-3 pl-10 pr-4 text-sm text-neutral-900 outline-none transition focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:bg-neutral-950"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Due date</label>
          <div className="relative">
            <FontAwesomeIcon icon={faCalendarDays} className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" />
            <input
              type="date"
              name="date"
              value={task.date}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 py-3 pl-10 pr-4 text-sm text-neutral-900 outline-none transition focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:bg-neutral-950"
            />
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/20 transition hover:-translate-y-0.5 hover:shadow-xl"
        >
          <FontAwesomeIcon icon={faCircleCheck} className="h-4 w-4" />
          {task.id ? "Update Task" : "Add Task"}
        </button>
      </form>
    </section>
  );
}

export default TaskForm;