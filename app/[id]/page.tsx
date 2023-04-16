import Sidebar from "@/components/Sidebar";
import BoardViewer from "@/components/BoardViewer";
import Header from "@/components/Header/Header";

interface IProps {
  params: {
    id: string;
  };
}

export default function Board({ params }: IProps) {
  return (
    <main>
      <Header />
      <Sidebar />
      <BoardViewer id={params.id} />
    </main>
  );
}
