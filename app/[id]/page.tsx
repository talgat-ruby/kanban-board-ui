import Sidebar from "@/components/Sidebar";
import BoardViewer from "@/components/BoardViewer";

interface IProps {
  params: {
    id: string;
  };
}

export default function Board({ params }: IProps) {
  return (
    <div>
      <Sidebar />
      <BoardViewer id={params.id} />
    </div>
  );
}
