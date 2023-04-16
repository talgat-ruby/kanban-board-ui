import { IBoardWithColumnsWithTasksWithSubtasksAggr } from "@/types/boards";
import styles from "./BoardViewer.module.css";

interface IProps {
  id: string;
}

async function BoardViewer({ id }: IProps) {
  if (!id) {
    return null;
  }

  try {
    const res = await fetch(`http://localhost:3000/api/boards/${id}`);

    if (!res.ok) {
      await Promise.reject(res.statusText);
    }

    const board: IBoardWithColumnsWithTasksWithSubtasksAggr = await res.json();

    return (
      <div className={styles.table}>
        <h1 className={styles.boardTitle}>{board.name}</h1>
        <ul className={styles.columns}>
          {board.columns.map((column) => (
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
    );
  } catch (e) {
    console.error(e);
    return null;
  }
}

export default BoardViewer;
