import { IBoard } from "@/types/boards";

export const getBoards = async (): Promise<IBoard[]> => {
  const res = await fetch("http://localhost:3000/api/boards");

  if (!res.ok) {
    throw new Error(`Failed to get boards: ${res.statusText}`);
  }

  const boards = await res.json();
  return boards;
};

export const createBoard = async (name: string): Promise<void> => {
  const res = await fetch("http://localhost:3000/api/boards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) {
    throw new Error(`Failed to create board: ${res.statusText}`);
  }
};
