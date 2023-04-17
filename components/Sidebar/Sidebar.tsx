"use client";

import { useState, useEffect } from "react";
import Aside from "@/components/Aside";
import NewBoard from "../NewBoard/NewBoard";
import { getBoards } from "@/app/api/boards/api";
import { IBoard } from "@/types/boards";

function Sidebar() {
  const [boards, setBoards] = useState<IBoard[]>([]);

  useEffect(() => {
    loadBoards();
  }, []);

  const loadBoards = async () => {
    try {
      const boards = await getBoards();
      setBoards(boards);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBoardCreated = () => {
    loadBoards();
  };

  return (
    <aside>
      <Aside boards={boards} />
      <NewBoard onBoardCreated={handleBoardCreated} />
    </aside>
  );
}

export default Sidebar;
