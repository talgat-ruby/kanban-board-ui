import Header from "@/components/Header";
import BoardViewer from "@/components/BoardViewer";

interface IProps {
  boardId?: string;
}

async function BoardData({ boardId }: IProps) {
  return (
    <>
      <Header />
      <BoardViewer />
    </>
  );
}

export default BoardData;
