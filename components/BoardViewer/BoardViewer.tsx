"use client";
import {
  IBoardWithColumnsWithTasksWithSubtasksAggr,
  deleteBoard,
} from "@/types/boards";
import styles from "./BoardViewer.module.css";
import { useEffect, useState } from "react";

interface IProps {
  id: string;
}

const BoardViewer = ({ id }: IProps) => {
  const [modal, setModal] = useState(false);
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

  const func = async () => {
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
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  };

  useEffect(() => {
    func();
  }, []);

  // const deleteButtonHandler = async () => {
  //   try {
  //     const res = await fetch(`http://localhost:3000/api/deleteBoard/${id}`);

  //     if (!res.ok) {
  //       await Promise.reject(res.statusText);
  //     }

  //     const board: deleteBoard = await res.json();
  //     setModal((prevModal) => !prevModal);
  //     console.log(board);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <>
      <div className={styles.table}>
        <div className={styles.boardTitle}>
          <h1>{board?.name}</h1>
          <button className={styles.editButton}>Edit</button>
          <button
            className={styles.deleteButton}
            onClick={() => setModal((prevModal) => !prevModal)}
          >
            Delete
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
                // onClick={deleteButtonHandler}
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
    </>
  );
};

export default BoardViewer;
