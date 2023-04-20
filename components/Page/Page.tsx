import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import BoardViewer from "@/components/BoardViewer";

function Page() {
  return (
    <div className="h-[78rem] flex">
      <Header />
      <Sidebar />
      <BoardViewer />
    </div>
  );
}

export default Page;
