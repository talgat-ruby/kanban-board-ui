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
  const [subTasks, setSubTasks] = useState([
    { name: "e.g. Make coffee", id: getId() },
    { name: "e.g. Drink coffee & smile", id: getId() },
  ]);
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
            Add New Task
          </button>
        </div>

        <ul className={styles.columns}>
          {board?.columns.map((column) => (
            <li key={column.id} className={styles.column}>
              <h3 className={styles.columnTitle}>{column.name}</h3>
              <ul>
                {column.tasks.map((task) => (
                  <li key={task.id} className={styles.task}>
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
          <form
            className={styles.addNewTaskModal}
            // onSubmit={handleTaskSubmit}
          >
            <h3>Add New Task</h3>
            <div className={styles.inputBlock}>
              <label htmlFor="taskTitle">Title</label>
              <input
                type="text"
                id="TaskTitle"
                placeholder="e.g. Take coffee break"
              />
            </div>
            <div className={styles.inputBlock}>
              <label>Description</label>
              <textarea
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
                      // onChange={handleTaskChange}
                    />
                    <button
                      // onClick={deleteTaskHandler}
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
                // onClick={addNewSubtaskHandler}
              >
                + Add New Subtasks
              </button>
              <div className={styles.inputBlock}>
                <label>Status</label>
                <select name="status">
                  <option value="todo">Todo</option>
                  <option value="doing">Doing</option>
                  <option value="done">Done</option>
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
    </>
  );
};

export default BoardViewer;
