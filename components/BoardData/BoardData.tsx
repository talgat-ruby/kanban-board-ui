import Header from "@/components/Header";
import BoardViewer from "@/components/BoardViewer";
import { IBoardWithColumnsWithTasksWithSubtasksAggr } from "@/types/boards";

interface IProps {
  boardId?: string;
}

async function BoardData({ boardId }: IProps) {
  if (!boardId) {
    return (
      <>
        <Header />
        <main className="flex-auto mt-[var(--header-height)] bg-light-2 dark:bg-dark-2">
          Main
        </main>
      </>
    );
  }

  try {
    const res = await fetch(`http://localhost:3000/api/boards/${boardId}`);

    if (!res.ok) {
      await Promise.reject(res.statusText);
    }

    const board: IBoardWithColumnsWithTasksWithSubtasksAggr = await res.json();

    return (
      <>
        <Header boardId={boardId} boardName={board.name} />
        <BoardViewer board={board} />
      </>
    );
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default BoardData;
