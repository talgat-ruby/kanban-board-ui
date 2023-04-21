import { IBoard } from "@/types/boards";
import Aside from "@/components/Aside";

async function Sidebar() {
  try {
    const res = await fetch("http://localhost:3000/api/boards");

    if (!res.ok) {
      await Promise.reject(res.statusText);
    }

    const boards: IBoard[] = await res.json();

    return <Aside boards={boards} />;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default Sidebar;
