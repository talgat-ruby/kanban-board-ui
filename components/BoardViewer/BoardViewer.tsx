import { Column } from "./Column";
import { TFetchBoardResult } from "@/app/api/types";

interface IProps {
    board: TFetchBoardResult;
}

function BoardViewer({ board }: IProps) {
    return (
        <main className="flex-auto max-h-screen pt-[--header-height] flex flex-col bg-light-2 overflow-auto">
            <div className="px-[1.5rem] pt-[1.5rem] pb-[3.125rem] flex">
                <ul className="flex-auto flex">
                    {board.columns.map((column) => (
                        <Column key={column.id} column={column} board={board} />
                    ))}
                </ul>
            </div>
        </main>
    );
}

export default BoardViewer;
