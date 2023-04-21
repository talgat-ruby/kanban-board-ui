import BoardData from "@/components/BoardData";
import Sidebar from "@/components/Sidebar";

interface IProps {
  boardId?: string;
}

function Page({ boardId }: IProps) {
  return (
    <div className="h-[78rem] flex">
      <Sidebar />
      <BoardData boardId={boardId} />
    </div>
  );
}

export default Page;
