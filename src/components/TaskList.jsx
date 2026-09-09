// import React, { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCalendarDays, faCircleCheck, faPenToSquare, faMagnifyingGlass, faTrashCan, faSpinner } from "@fortawesome/free-solid-svg-icons";
// import { getTasks, deleteTask, searchTasks, updateTask } from "../services/api";
// import TaskForm from "./TaskForm";
// import "../App.css";

// function TaskList() {
//   const [tasks, setTasks] = useState([]);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [keyword, setKeyword] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [expandedIds, setExpandedIds] = useState(new Set());

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const response = await getTasks();
//       setTasks(response.data);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     await deleteTask(id);
//     fetchTasks();
//   };

//   const handleEdit = (task) => {
//     setSelectedTask(task);
//   };

//   const handleToggleComplete = async (task) => {
//     await updateTask(task.id, { ...task, completed: !task.completed });
//     fetchTasks();
//   };

//   const handleSearch = async (e) => {
//     const value = e.target.value;
//     setKeyword(value);

//     if (value === "") {
//       fetchTasks();
//     } else {
//       const response = await searchTasks(value);
//       setTasks(response.data);
//     }
//   };

//   const clearSelection = () => {
//     setSelectedTask(null);
//   };

//   const toggleExpand = (id) => {
//     setExpandedIds((prev) => {
//       const next = new Set(prev);
//       if (next.has(id)) {
//         next.delete(id);
//       } else {
//         next.add(id);
//       }
//       return next;
//     });
//   };

//   return (
//     <div className="min-h-screen bg-transparent px-4 py-6 text-neutral-900 dark:text-neutral-100 sm:px-6 lg:px-8">
//       <div className="mx-auto flex max-w-7xl flex-col gap-6">
//         <main className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
//           <div className="space-y-6">
//             <TaskForm
//               refresh={fetchTasks}
//               selectedTask={selectedTask}
//               clearSelection={clearSelection}
//             />
//           </div>

//           <section className="rounded-[24px] border border-neutral-200/80 bg-white/90 p-4 shadow-warm-lg backdrop-blur dark:border-neutral-800/80 dark:bg-neutral-900/90 sm:rounded-[28px] sm:p-5 lg:p-6">
//             <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//               <div>
//                 <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-600 dark:text-primary-400 sm:text-sm">
//                   Overview
//                 </p>
//                 <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 sm:text-xl">Your tasks</h2>
//               </div>
//               <div className="self-start rounded-2xl bg-neutral-100 px-3 py-2 text-sm font-semibold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 sm:self-auto">
//                 {tasks.length} tasks
//               </div>
//             </div>

//             <label className="mb-4 flex items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-500 transition focus-within:border-primary-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-primary-100 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-300 dark:focus-within:bg-neutral-900">
//               <FontAwesomeIcon icon={faMagnifyingGlass} className="h-4 w-4 text-neutral-400" />
//               <input
//                 type="text"
//                 placeholder="Search tasks..."
//                 value={keyword}
//                 onChange={handleSearch}
//                 className="w-full border-none bg-transparent outline-none placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
//               />
//             </label>

//             {loading ? (
//               <div className="flex min-h-[220px] items-center justify-center rounded-3xl border border-dashed border-neutral-200 bg-neutral-50/70 dark:border-neutral-800 dark:bg-neutral-900/40">
//                 <div className="flex items-center gap-3 text-sm font-medium text-neutral-600 dark:text-neutral-300">
//                   <FontAwesomeIcon icon={faSpinner} className="h-5 w-5 animate-spin text-primary-600 dark:text-primary-400" />
//                   Loading tasks...
//                 </div>
//               </div>
//             ) : tasks.length === 0 ? (
//               <div className="flex min-h-[220px] flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-200 bg-neutral-50/70 px-6 text-center dark:border-neutral-800 dark:bg-neutral-900/40">
//                 <div className="mb-3 rounded-2xl bg-primary-50 p-3 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
//                   <FontAwesomeIcon icon={faCalendarDays} className="h-6 w-6" />
//                 </div>
//                 <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">No tasks found</h3>
//                 <p className="mt-1 text-sm text-neutral-500">Add your first task to get started.</p>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 {tasks.map((task) => {
//                   const isExpanded = expandedIds.has(task.id);
//                   const isLongDescription = task.description && task.description.length > 120;

//                   return (
//                     <article
//                       key={task.id}
//                       className="group rounded-[20px] border border-neutral-200 bg-white p-3.5 shadow-sm transition hover:-translate-y-1 hover:shadow-warm-lg dark:border-neutral-800 dark:bg-neutral-950 sm:rounded-[24px] sm:p-4"
//                     >
//                       <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
//                         <div className="min-w-0 flex-1">
//                           <h3 className={`text-base font-semibold break-words ${task.completed ? "text-success-500 dark:text-success-300" : "text-neutral-900 dark:text-neutral-100"}`}>{task.title}</h3>
//                           <p
//                             className={`mt-1 whitespace-pre-line break-words text-sm leading-6 ${
//                               task.completed
//                                 ? "text-neutral-400 line-through dark:text-neutral-500/80"
//                                 : "text-neutral-600 dark:text-neutral-400"
//                             } ${isExpanded ? "" : "line-clamp-3"}`}
//                           >
//                             {task.description}
//                           </p>
//                           {isLongDescription && (
//                             <button
//                               type="button"
//                               onClick={() => toggleExpand(task.id)}
//                               className="mt-1 text-xs font-semibold text-primary-600 hover:underline dark:text-primary-400"
//                             >
//                               {isExpanded ? "Show less" : "Read more"}
//                             </button>
//                           )}
//                         </div>
//                         <span className="inline-block w-fit shrink-0 rounded-full bg-success-500/10 px-3 py-1 text-xs font-semibold text-success-500 dark:bg-success-500/15 dark:text-success-300">
//                           {task.date || "No date"}
//                         </span>
//                       </div>

//                       <div className="mt-4 flex flex-col gap-3 border-t border-neutral-100 pt-3 dark:border-neutral-800">
//                         <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
//                           <FontAwesomeIcon icon={faCalendarDays} className="h-4 w-4" />
//                           {task.date || "No due date"}
//                         </div>
//                         <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
//                           <button
//                             type="button"
//                             onClick={() => handleToggleComplete(task)}
//                             className={`col-span-2 inline-flex items-center justify-center gap-2 rounded-2xl px-3 py-2 text-xs font-semibold transition hover:-translate-y-0.5 sm:justify-start sm:text-sm ${task.completed ? "bg-success-500/10 text-success-500 hover:bg-success-500/20 dark:bg-success-500/15 dark:text-success-300 dark:hover:bg-success-500/25" : "bg-neutral-50 text-neutral-700 hover:bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"}`}
//                           >
//                             <FontAwesomeIcon icon={faCircleCheck} className="h-4 w-4" />
//                             {task.completed ? "Mark Incomplete" : "Mark Complete"}
//                           </button>
//                           <button
//                             type="button"
//                             onClick={() => handleEdit(task)}
//                             className="inline-flex items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs font-semibold text-neutral-700 transition hover:-translate-y-0.5 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 sm:text-sm"
//                           >
//                             <FontAwesomeIcon icon={faPenToSquare} className="h-4 w-4" />
//                             Edit
//                           </button>
//                           <button
//                             type="button"
//                             onClick={() => handleDelete(task.id)}
//                             className="inline-flex items-center justify-center gap-2 rounded-2xl bg-danger-500/10 px-3 py-2 text-xs font-semibold text-danger-500 transition hover:-translate-y-0.5 hover:bg-danger-500/20 dark:bg-danger-500/15 dark:text-danger-300 dark:hover:bg-danger-500/25 sm:text-sm"
//                           >
//                             <FontAwesomeIcon icon={faTrashCan} className="h-4 w-4" />
//                             Delete
//                           </button>
//                         </div>
//                       </div>
//                     </article>
//                   );
//                 })}
//               </div>
//             )}
//           </section>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default TaskList;


import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faCircleCheck, faPenToSquare, faMagnifyingGlass, faTrashCan, faSpinner, faFlag, faTag } from "@fortawesome/free-solid-svg-icons";
import { getTasks, deleteTask, searchTasks, updateTask } from "../services/api";
import TaskForm from "./TaskForm";
import "../App.css";

const PRIORITY_STYLES = {
  HIGH: "bg-danger-500/10 text-danger-500 dark:bg-danger-500/15 dark:text-danger-300",
  MEDIUM: "bg-warning-500/10 text-warning-600 dark:bg-warning-500/15 dark:text-warning-300",
  LOW: "bg-success-500/10 text-success-500 dark:bg-success-500/15 dark:text-success-300",
};

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState(new Set());

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await getTasks();
      setTasks(response.data);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
  };

  const handleToggleComplete = async (task) => {
    await updateTask(task.id, { ...task, completed: !task.completed });
    fetchTasks();
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setKeyword(value);

    if (value === "") {
      fetchTasks();
    } else {
      const response = await searchTasks(value);
      setTasks(response.data);
    }
  };

  const clearSelection = () => {
    setSelectedTask(null);
  };

  const toggleExpand = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-transparent px-4 py-6 text-neutral-900 dark:text-neutral-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <main className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <TaskForm
              refresh={fetchTasks}
              selectedTask={selectedTask}
              clearSelection={clearSelection}
            />
          </div>

          <section className="rounded-[24px] border border-neutral-200/80 bg-white/90 p-4 shadow-warm-lg backdrop-blur dark:border-neutral-800/80 dark:bg-neutral-900/90 sm:rounded-[28px] sm:p-5 lg:p-6">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-600 dark:text-primary-400 sm:text-sm">
                  Overview
                </p>
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 sm:text-xl">Your tasks</h2>
              </div>
              <div className="self-start rounded-2xl bg-neutral-100 px-3 py-2 text-sm font-semibold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 sm:self-auto">
                {tasks.length} tasks
              </div>
            </div>

            <label className="mb-4 flex items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-500 transition focus-within:border-primary-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-primary-100 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-300 dark:focus-within:bg-neutral-900">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={keyword}
                onChange={handleSearch}
                className="w-full border-none bg-transparent outline-none placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
              />
            </label>

            {loading ? (
              <div className="flex min-h-[220px] items-center justify-center rounded-3xl border border-dashed border-neutral-200 bg-neutral-50/70 dark:border-neutral-800 dark:bg-neutral-900/40">
                <div className="flex items-center gap-3 text-sm font-medium text-neutral-600 dark:text-neutral-300">
                  <FontAwesomeIcon icon={faSpinner} className="h-5 w-5 animate-spin text-primary-600 dark:text-primary-400" />
                  Loading tasks...
                </div>
              </div>
            ) : tasks.length === 0 ? (
              <div className="flex min-h-[220px] flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-200 bg-neutral-50/70 px-6 text-center dark:border-neutral-800 dark:bg-neutral-900/40">
                <div className="mb-3 rounded-2xl bg-primary-50 p-3 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
                  <FontAwesomeIcon icon={faCalendarDays} className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">No tasks found</h3>
                <p className="mt-1 text-sm text-neutral-500">Add your first task to get started.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {tasks.map((task) => {
                  const isExpanded = expandedIds.has(task.id);
                  const isLongDescription = task.description && task.description.length > 120;

                  return (
                    <article
                      key={task.id}
                      className="group rounded-[20px] border border-neutral-200 bg-white p-3.5 shadow-sm transition hover:-translate-y-1 hover:shadow-warm-lg dark:border-neutral-800 dark:bg-neutral-950 sm:rounded-[24px] sm:p-4"
                    >
                      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className={`text-base font-semibold break-words ${task.completed ? "text-success-500 dark:text-success-300" : "text-neutral-900 dark:text-neutral-100"}`}>{task.title}</h3>
                            {task.priority && (
                              <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${PRIORITY_STYLES[task.priority] || "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"}`}>
                                <FontAwesomeIcon icon={faFlag} className="h-2.5 w-2.5" />
                                {task.priority.charAt(0) + task.priority.slice(1).toLowerCase()}
                              </span>
                            )}
                            {task.category && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] font-semibold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                                <FontAwesomeIcon icon={faTag} className="h-2.5 w-2.5" />
                                {task.category}
                              </span>
                            )}
                          </div>
                          <p
                            className={`mt-1 whitespace-pre-line break-words text-sm leading-6 ${
                              task.completed
                                ? "text-neutral-400 line-through dark:text-neutral-500/80"
                                : "text-neutral-600 dark:text-neutral-400"
                            } ${isExpanded ? "" : "line-clamp-3"}`}
                          >
                            {task.description}
                          </p>
                          {isLongDescription && (
                            <button
                              type="button"
                              onClick={() => toggleExpand(task.id)}
                              className="mt-1 text-xs font-semibold text-primary-600 hover:underline dark:text-primary-400"
                            >
                              {isExpanded ? "Show less" : "Read more"}
                            </button>
                          )}
                        </div>
                        <span className="inline-block w-fit shrink-0 rounded-full bg-success-500/10 px-3 py-1 text-xs font-semibold text-success-500 dark:bg-success-500/15 dark:text-success-300">
                          {task.date || "No date"}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-col gap-3 border-t border-neutral-100 pt-3 dark:border-neutral-800">
                        <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                          <FontAwesomeIcon icon={faCalendarDays} className="h-4 w-4" />
                          {task.date || "No due date"}
                        </div>
                        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
                          <button
                            type="button"
                            onClick={() => handleToggleComplete(task)}
                            className={`col-span-2 inline-flex items-center justify-center gap-2 rounded-2xl px-3 py-2 text-xs font-semibold transition hover:-translate-y-0.5 sm:justify-start sm:text-sm ${task.completed ? "bg-success-500/10 text-success-500 hover:bg-success-500/20 dark:bg-success-500/15 dark:text-success-300 dark:hover:bg-success-500/25" : "bg-neutral-50 text-neutral-700 hover:bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"}`}
                          >
                            <FontAwesomeIcon icon={faCircleCheck} className="h-4 w-4" />
                            {task.completed ? "Mark Incomplete" : "Mark Complete"}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleEdit(task)}
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs font-semibold text-neutral-700 transition hover:-translate-y-0.5 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 sm:text-sm"
                          >
                            <FontAwesomeIcon icon={faPenToSquare} className="h-4 w-4" />
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(task.id)}
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-danger-500/10 px-3 py-2 text-xs font-semibold text-danger-500 transition hover:-translate-y-0.5 hover:bg-danger-500/20 dark:bg-danger-500/15 dark:text-danger-300 dark:hover:bg-danger-500/25 sm:text-sm"
                          >
                            <FontAwesomeIcon icon={faTrashCan} className="h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default TaskList;