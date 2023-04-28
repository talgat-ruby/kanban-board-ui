import clsx from "clsx";
import { ITasks, IColumn } from "@/app/api/boards/[id]/fetchBoard";
import ModalUpdateTask from "@/components/ModalUpdateTask";
import styles from "./BoardViewer.module.css";

interface TaskProps {
    task: ITasks;
    columns: IColumn[];
}

export const Task = ({ task, columns }: TaskProps) => (
    <li
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
        <ModalUpdateTask task={task} columns={columns} />
    </li>
);
