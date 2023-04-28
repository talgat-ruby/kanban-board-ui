import React from "react";
import clsx from "clsx";
import ModalUpdateTask from "@/components/ModalUpdateTask";
import { TTask } from "@/app/api/types";
import styles from "./BoardViewer.module.css";

interface IProps {
  task: TTask;
}

const BoardTask: React.FC<IProps> = ({ task }) => {
  return (
    <li
      key={task.id}
      className={clsx(
        "flex flex-col justify-center px-[1rem] w-[17.5rem] h-[5.5rem] bg-light-1 rounded-[.5rem]",
        styles.shadow
      )}
    >
      <h4>{task.title}</h4>
      <p>
        {task?.doneSubtasks?.aggregate?.count} of{" "}
        {task?.allSubtasks?.aggregate?.count}
      </p>
      <ModalUpdateTask task={task} />
    </li>
  );
};

export default BoardTask;
