"use client";

import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { IBoard } from "@/types/boards";
import styles from "./Aside.module.css";

import shape from "./shape.svg";
import eye from "./eye-slash.1.svg";
import deleteIcon from "./delete.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface IProps {
  boards: IBoard[];
}

function Aside({ boards }: IProps) {
  const [isShowing, setIsShowing] = useState(true);
  const [modal, setModal] = useState(false);
  const [columns, setColumns] = useState([{ name: "", id: 0 }]);
  const router = useRouter();

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const { currentTarget } = event;

      const formData = new FormData(currentTarget);

      const boardName = formData.get("board-name");

      try {
        const req = new Request("http://localhost:3000/api/boards", {
          method: "POST",
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
    setColumns((columns) => [...columns, { name: "", id: getId() }]);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { currentTarget } = event;
    const { value, dataset } = currentTarget;
    const ind = Number(dataset.ind);
    setColumns((columns) =>
      columns.map((column) => {
        if (column.id === ind) {
          column.name = value;
          return column;
        } else {
          return column;
        }
      })
    );
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
          <form className={styles.modal} onSubmit={handleSubmit}>
            <h3>Add New Boards</h3>
            <div className={styles.name}>
              <p>Name</p>
              <input
                type="text"
                placeholder="e.g. Web Design"
                name="board-name"
              />
            </div>

            <div className={styles.modalColumns}>
              <p>Columns</p>

              {columns.map((elem, index) => {
                return (
                  <div className={styles.modalColumn} key={elem.id}>
                    <input
                      type="text"
                      data-ind={elem.id}
                      value={elem.name}
                      onChange={handleChange}
                    />
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
              type="button"
              className={styles.addNewColumnButton}
              onClick={addNewColumnHandler}
            >
              + Add New Column
            </button>
            <button className={styles.createNewBoardButton}>
              + Create New Board
            </button>
          </form>
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
