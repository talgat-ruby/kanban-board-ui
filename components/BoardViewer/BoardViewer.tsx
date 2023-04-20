"use client";
import {
  IBoardWithColumnsWithTasksWithSubtasksAggr,
  deleteBoard,
} from "@/types/boards";
import styles from "./BoardViewer.module.css";
import {
  useCallback,
  useEffect,
  useState,
  MouseEvent,
  ChangeEvent,
  FormEvent,
} from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Image from "next/image";
import deleteIcon from "./delete.svg";
import dots from "./dots.svg";

interface IProps {
  id: string;
}

const BoardViewer = ({ id }: IProps) => {
  const params = useParams();
  const router = useRouter();
  const getId = () => {
    return Math.floor(Math.random() * 100);
  };

  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [addNewTaskModal, setAddNewTaskModal] = useState(false);
  const [columns, setColumns] = useState([{ name: "", id: 0 }]);
  const [task, setTask] = useState("");
  const [taskModal, setTaskModal] = useState(false);
  const [subTasks, setSubTasks] = useState([{ name: "", id: getId() }]);
  const [board, setBoard] = useState({
    id: "",
    name: "",
    columns: [
      {
        id: "",
        name: "",
        tasks: [
          {
            id: "",
            title: "",
            description: "",
            all_subtasks: {
              aggregate: {
                count: 0,
              },
            },
            done_subtasks: {
              aggregate: {
                count: 0,
              },
            },
          },
        ],
      },
    ],
  });

  const func = useCallback(async () => {
    if (!id) {
      return null;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/boards/${id}`);

      if (!res.ok) {
        await Promise.reject(res.statusText);
      }
      const board = await res.json();
      setBoard(() => board);
      setColumns(() => board.columns);
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }, [id]);

  useEffect(() => {
    func();
  }, [func]);

  const handleDelete = useCallback(async () => {
    const id = params.id;

    try {
      const res = await fetch(`http://localhost:3000/api/boards/${id}`, {
        method: "DELETE",
      });
      const json: { id: string; name: string } = await res.json();

      router.push("/");

      alert(`Board ${json.name} was deleted`);
    } catch (e) {
      console.error(e);
    }
  }, [router, params.id]);

  const addNewColumnHandler = () => {
    setColumns((columns) => [...columns, { name: "", id: getId() }]);
    console.log(columns);
  };

  const deleteHandler = (event: { currentTarget: any }) => {
    let id = event.currentTarget.id;
    console.log(id);

    setColumns((columns) =>
      columns.filter((elem) => elem.id.toString() !== id)
    );
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { currentTarget } = event;
    const { value, dataset } = currentTarget;
    const ind = dataset.ind;
    setColumns((columns) =>
      columns.map((column) => {
        if (column.id.toString() === ind) {
          console.log(ind);
          column.name = value;
          return column;
        } else {
          return column;
        }
      })
    );
  };

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const { currentTarget } = event;

      const formData = new FormData(currentTarget);

      const boardName = formData.get("board-name");

      try {
        const req = new Request("http://localhost:3000/api/boards", {
          method: "PATCH",
          body: JSON.stringify({
            name: boardName,
            columnsData: columns.map((column) => ({ name: column.name })),
          }),
        });
        const res = await fetch(req);
        const json: { id: string } = await res.json();

        router.push(`/${json.id}`);
      } catch (e) {
        console.error(e);
      }
    },
    [columns, router]
  );

  const handleSubTaskChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { currentTarget } = event;
    const { value, dataset } = currentTarget;
    const ind = Number(dataset.ind);
    setSubTasks((task) =>
      task.map((subTask) => {
        if (subTask.id === ind) {
          subTask.name = value;
          return subTask;
        } else {
          return subTask;
        }
      })
    );
  };

  const deleteSubTaskHandler = (event: { currentTarget: any }) => {
    let id = event.currentTarget.id;
    console.log(id);

    setSubTasks((subTasks) =>
      subTasks.filter((subTask) => subTask.id.toString() !== id)
    );
  };

  const addNewSubtaskHandler = () => {
    setSubTasks((subTasks) => [...subTasks, { name: "", id: getId() }]);
  };

  const handleTaskSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const { currentTarget } = event;

      const formData = new FormData(currentTarget);
      const taskTitle = formData.get("task-title");
      const taskDescription = formData.get("task-description");
      const taskStatus = formData.get("status");
      console.log(taskStatus);
      console.log(board);

      const column = board.columns.filter(
        (column) => column.name === taskStatus
      );

      const columnId = column[0].id;

      try {
        const req = new Request("http://localhost:3000/api/tasks", {
          method: "POST",
          body: JSON.stringify({
            title: taskTitle,
            description: taskDescription,
            columnId: columnId,
          }),
        });

        const res = await fetch(req);
        const json = await res.json();
        console.log(json);
        setAddNewTaskModal((prevModal) => !prevModal);
      } catch (e) {
        console.error(e);
      }
    },
    [board]
  );

  const handleTaskModal = (event: MouseEvent) => {
    const { currentTarget } = event;
    console.log(currentTarget.id);
    setTask(() => currentTarget.id);
    setTaskModal((prevModal) => !prevModal);
  };

  return (
    <>
      <div className={styles.table}>
        <div className={styles.boardTitle}>
          <div className={styles.boardLeft}>
            <h1>{board?.name}</h1>
            <button
              className={styles.editButton}
              onClick={() => setEditModal((prevEditModal) => !prevEditModal)}
            >
              Edit
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => setModal((prevModal) => !prevModal)}
            >
              Delete
            </button>
          </div>

          <button
            className={styles.addNewTaskButton}
            onClick={() => setAddNewTaskModal((prevModal) => !prevModal)}
          >
            + Add New Task
          </button>
        </div>

        <ul className={styles.columns}>
          {board?.columns.map((column) => (
            <li key={column.id} className={styles.column}>
              <h3 className={styles.columnTitle}>{column.name}</h3>
              <ul>
                {column.tasks.map((task) => (
                  <li
                    id={task.id}
                    key={task.id}
                    className={styles.task}
                    onClick={handleTaskModal}
                  >
                    <h4 className={styles.title}>{task.title}</h4>
                    {/* <p className={styles.description}>{task.description}</p> */}
                    <p className={styles.count}>
                      {task?.done_subtasks?.aggregate?.count} of{" "}
                      {task?.all_subtasks.aggregate?.count}
                    </p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      {modal ? (
        <>
          <div className={styles.deleteModal}>
            <h3>Delete board</h3>
            <p>
              Are you sure you want to delete the ‘Platform Launch’ board? This
              action will remove all columns and tasks and cannot be reversed.
            </p>
            <div className={styles.modalButtons}>
              <button
                className={styles.modalDeleteButton}
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className={styles.modalCancelButton}
                onClick={() => setModal((prevModal) => !prevModal)}
              >
                Cancel
              </button>
            </div>
          </div>
          <div
            className={styles.overlay}
            onClick={() => setModal((prevModal) => !prevModal)}
          ></div>
        </>
      ) : (
        <></>
      )}
      {editModal ? (
        <>
          <form className={styles.editModal} onSubmit={handleSubmit}>
            <h3>Edit board</h3>
            <div className={styles.inputBlock}>
              <label htmlFor="boardName">Board Name</label>
              <input type="text" id="boardName" />
            </div>
            <div className={styles.editColumns}>
              <label>Board Columns</label>
              {columns.map((elem, index) => {
                return (
                  <div className={styles.editColumn} key={elem.id}>
                    <input
                      type="text"
                      data-ind={elem.id}
                      value={elem.name}
                      onChange={handleChange}
                    />
                    <button
                      onClick={deleteHandler}
                      type="button"
                      id={elem.id.toString()}
                    >
                      <Image
                        src={deleteIcon}
                        alt="delete"
                        width={15}
                        height={15}
                      ></Image>
                    </button>
                  </div>
                );
              })}
              <button
                type="button"
                className={styles.addNewColumnButton}
                onClick={addNewColumnHandler}
              >
                + Add New Column
              </button>
              <button className={styles.createNewBoardButton}>
                Save Changes
              </button>
            </div>
          </form>
          <div
            className={styles.overlay}
            onClick={() => setEditModal((prevEditModal) => !prevEditModal)}
          ></div>
        </>
      ) : (
        <></>
      )}
      {addNewTaskModal ? (
        <>
          <form className={styles.addNewTaskModal} onSubmit={handleTaskSubmit}>
            <h3>Add New Task</h3>
            <div className={styles.inputBlock}>
              <label htmlFor="taskTitle">Title</label>
              <input
                type="text"
                id="TaskTitle"
                name="task-title"
                placeholder="e.g. Take coffee break"
              />
            </div>
            <div className={styles.inputBlock}>
              <label>Description</label>
              <textarea
                name="task-description"
                placeholder="e.g. It’s always good to take a break. This 15 minute break will 
                recharge the batteries a little."
              />
            </div>
            <div className={styles.modalSubTasks}>
              <label>Subtasks</label>
              {subTasks.map((elem, index) => {
                return (
                  <div className={styles.modalSubTask} key={elem.id}>
                    <input
                      type="text"
                      data-ind={elem.id}
                      value={elem.name}
                      onChange={handleSubTaskChange}
                    />
                    <button
                      onClick={deleteSubTaskHandler}
                      id={elem.id.toString()}
                    >
                      <Image
                        src={deleteIcon}
                        alt="delete"
                        width={15}
                        height={15}
                      ></Image>
                    </button>
                  </div>
                );
              })}

              <button
                type="button"
                className={styles.addNewSubTaskButton}
                onClick={addNewSubtaskHandler}
              >
                + Add New Subtasks
              </button>
              <div className={styles.inputBlock}>
                <label>Status</label>
                <select name="status">
                  {columns.map((column, index) => (
                    <option key={index} value={column.name}>
                      {column.name}
                    </option>
                  ))}
                </select>
              </div>
              <button className={styles.createNewTaskButton}>
                Create Task
              </button>
            </div>
          </form>
          <div
            className={styles.overlay}
            onClick={() => setAddNewTaskModal((prevModal) => !prevModal)}
          ></div>
        </>
      ) : (
        <></>
      )}
      {taskModal ? (
        <>
          <div className={styles.taskModal}>
            <div className={styles.taskModalHeader}>
              <div className={styles.taskModalTitle}>
                Research pricing points of various competitors and trial
                different business models
              </div>
              <Image src={dots} alt="dots" width={5} height={20}></Image>
            </div>
            <div className={styles.taskModalDescription}>
              We know what we`re planning to build for version one. Now we need
              to finalise the first pricing model we`ll use. Keep iterating the
              subtasks until we have a coherent proposition.
            </div>
            <div className={styles.taskModalCount}>
              <p>Subtasks (2 of 3)</p>
              <div>
                <input type="checkbox" id="1" name="1" />
                <label htmlFor="1">
                  Research competitor pricing and business models
                </label>
              </div>

              <div>
                <input type="checkbox" id="2" name="2" />
                <label htmlFor="2">
                  Outline a business model that works for our solution
                </label>
              </div>
              <div>
                <input type="checkbox" id="3" name="3" />
                <label htmlFor="3">
                  Talk to potential customers about our proposed solution and
                  ask for fair price expectancy
                </label>
              </div>
            </div>
            <div className={styles.inputBlock}>
              <label>Status</label>
              <select name="status">
                {columns.map((column, index) => (
                  <option key={index} value={column.name}>
                    {column.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div
            className={styles.overlay}
            onClick={() => setTaskModal((prevModal) => !prevModal)}
          ></div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default BoardViewer;
