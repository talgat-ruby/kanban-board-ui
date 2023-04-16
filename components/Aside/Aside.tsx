"use client";

import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { IBoard, createBoard } from "@/types/boards";
import styles from "./Aside.module.css";

import shape from "./shape.svg";
import eye from "./eye-slash.1.svg";
import deleteIcon from "./delete.svg";
import Image from "next/image";

interface IProps {
  boards: IBoard[];
}

function Aside({ boards }: IProps) {
  const [isShowing, setIsShowing] = useState(true);
  const [modal, setModal] = useState(false);
  const [columns, setColumns] = useState([
    { name: "Todo", id: 0 },
    { name: "Doing", id: 1 },
  ]);

  const createNewBoardHandler = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/createBoard`);

      if (!res.ok) {
        await Promise.reject(res.statusText);
      }

      const board: createBoard = await res.json();
      setModal((prevModal) => !prevModal);
      console.log(board);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteHandler = (event: { currentTarget: any }) => {
    let id = event.currentTarget.id;
    console.log(id);

    setColumns((columns) =>
      columns.filter((elem) => elem.id.toString() !== id)
    );
  };

  const getId = () => {
    return Math.floor(Math.random() * 100);
  };

  const addNewColumnHandler = () => {
    setColumns((columns) => [...columns, { name: "Todo", id: getId() }]);
  };

  return (
    <>
      <aside className={`${styles.aside} ${clsx(!isShowing && "invisible")}`}>
        <div className={styles.allBoards}>ALL BOARDS (3)</div>
        <ul>
          {boards.map((board) => (
            <li className={styles.board} key={board.id}>
              <Image
                src={shape}
                alt="shape"
                width={16}
                height={16}
                className={styles.shape}
              ></Image>
              <Link className={styles.boardName} href={`/${board.id}`}>
                {board.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.createNewBoard}>
          <Image
            src={shape}
            alt="shape"
            width={16}
            height={16}
            className={styles.shape}
          ></Image>
          <div
            className={styles.createNeweBoardText}
            onClick={() => setModal((prevModal) => !prevModal)}
          >
            + Create New Board
          </div>
        </div>
      </aside>
      <button
        className={styles.hide}
        onClick={() => setIsShowing((prevIsShowing) => !prevIsShowing)}
      >
        {isShowing ? (
          <div className={styles.hideText}>
            <Image src={eye} alt="eye" width={16} height={16}></Image>
            <div>Hide Sidebar</div>
          </div>
        ) : (
          "Show Sidebar"
        )}
      </button>
      {modal ? (
        <>
          <div className={styles.modal}>
            <h3>Add New Boards</h3>
            <div className={styles.name}>
              <p>Name</p>
              <input type="text" placeholder="e.g. Web Design" />
            </div>

            <div className={styles.modalColumns}>
              <p>Columns</p>

              {columns.map((elem) => {
                return (
                  <div className={styles.modalColumn} key={elem.id}>
                    <input type="text" defaultValue={elem.name} />
                    <button onClick={deleteHandler} id={elem.id.toString()}>
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
            </div>
            <button
              className={styles.addNewColumnButton}
              onClick={addNewColumnHandler}
            >
              + Add New Column
            </button>
            <button
              className={styles.createNewBoardButton}
              onClick={createNewBoardHandler}
            >
              + Create New Board
            </button>
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
}

export default Aside;
