import React from "react";
import BoardTask from "./BoardTask";
import { TColumn } from "@/app/api/types";
import styles from "./BoardViewer.module.css";

interface IProps {
  column: TColumn;
}

const BoardColumn: React.FC<IProps> = ({ column }) => {
  return (
    <li key={column.id} className="flex-auto flex flex-col space-x-[1.5rem]">
      <h3>{column.name}</h3>
      <ul className="flex flex-col space-y-[1.25rem]">
        {column.tasks.map((task) => (
          <BoardTask key={task.id} task={task} />
        ))}
      </ul>
    </li>
  );
};

export default BoardColumn;
