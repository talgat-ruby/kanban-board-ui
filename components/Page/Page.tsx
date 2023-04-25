import BoardData from "@/components/BoardData";
import Sidebar from "@/components/Sidebar";

interface IProps {
  boardId?: string;
}

function Page({ boardId }: IProps) {
  return (
    <div className="flex">
      {/* @ts-ignore */}
      <Sidebar />
      {/* @ts-ignore */}
      <BoardData boardId={boardId} />
    </div>
  );
}

export default Page;
