import { TFetchBoardResult } from "@/app/api/types";
import { IColumn } from "@/app/api/boards/[id]/fetchBoard";
import { Task } from "./Task";

interface ColumnProps {
    column: IColumn;
    board: TFetchBoardResult;
}

export const Column = ({ column, board }: ColumnProps) => (
    <li className="flex-auto flex flex-col space-x-[1.5rem]">
        <h3>{column.name}</h3>
        <ul className="flex flex-col space-y-[1.25rem]">
            {column.tasks.map((task) => (
                <Task key={task.id} task={task} columns={board.columns} />
            ))}
        </ul>
    </li>
);
