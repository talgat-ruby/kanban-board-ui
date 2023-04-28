import React from "react";
import BoardColumn from "./BoardColumn";
import { TFetchBoardResult } from "@/app/api/types";
import styles from "./BoardViewer.module.css";

interface IProps {
  board: TFetchBoardResult;
}

const BoardViewer: React.FC<IProps> = ({ board }) => {
  return (
    <main className="flex-auto max-h-screen pt-[--header-height] flex flex-col bg-light-2 overflow-auto">
      <div className="px-[1.5rem] pt-[1.5rem] pb-[3.125rem] flex">
        <ul className="flex-auto flex">
          {board.columns.map((column) => (
            <BoardColumn key={column.id} column={column} />
          ))}
        </ul>
      </div>
    </main>
  );
};

export default BoardViewer;
