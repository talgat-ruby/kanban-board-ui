import Sidebar from "@/components/Sidebar";
import BoardViewer from "@/components/BoardViewer";

interface IProps {
  params: {
    boardId: string;
  };
}

export default function Board({ params }: IProps) {
  return (
    <div>
      <Sidebar />
      <BoardViewer id={params.boardId} />
    </div>
  );
}
