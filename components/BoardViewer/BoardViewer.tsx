import { IBoardWithColumnsWithTasksWithSubtasksAggr } from "@/types/boards";

interface IProps {
  board: IBoardWithColumnsWithTasksWithSubtasksAggr;
}

async function BoardViewer({ board }: IProps) {
  return (
    <main>
      <h1>{board.name}</h1>
      <ul className="flex justify-between">
        {board.columns.map((column) => (
          <li key={column.id} className="ml-1">
            <h3>{column.name}</h3>
            <ul>
              {column.tasks.map((task) => (
                <li key={task.id} className="w-3 h-3 border-2">
                  <h4>{task.title}</h4>
                  <p>{task.description}</p>
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
    </main>
  );
}

export default BoardViewer;
