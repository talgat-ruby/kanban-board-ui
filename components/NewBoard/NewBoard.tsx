import { useState } from "react";
import { createBoard } from "@/app/api/boards/api";

interface BoardFormProps {
  onBoardCreated: () => void;
}

function NewBoard({ onBoardCreated }: BoardFormProps) {
  const [name, setName] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name.trim() === "") {
      return;
    }

    try {
      await createBoard(name);
      setName("");
      onBoardCreated();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button type="submit">Add Board</button>
    </form>
  );
}

export default NewBoard;
