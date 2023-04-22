import { IBoardWithColumnsWithTasksWithSubtasksAggr } from "@/types/boards";
import styles from "./BoardViewer.module.css";
import clsx from "clsx";

styles;

interface IProps {
  board: IBoardWithColumnsWithTasksWithSubtasksAggr;
}

async function BoardViewer({ board }: IProps) {
  return (
    <main className="flex-auto pt-[--header-height] max-h-screen flex flex-col bg-light-2 overflow-auto">
      <div className="px-[1.5rem] pt-[1.5rem] pb-[3.125rem] flex">
        <ul className="flex-auto flex">
          {board.columns.map((column) => (
            <li
              key={column.id}
              className="flex-auto flex flex-col space-x-[1.5rem]"
            >
              <h3>{column.name}</h3>
              <ul className="flex flex-col space-y-[1.25rem]">
                {column.tasks.map((task) => (
                  <li
                    key={task.id}
                    className={clsx(
                      "flex flex-col justify-center px-[1rem] w-[17.5rem] h-[5.5rem] bg-light-1 rounded-[.5rem]",
                      styles.shadow
                    )}
                  >
                    <h4>{task.title}</h4>
                    <p>
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
    </main>
  );
}

export default BoardViewer;
