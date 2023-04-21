import Link from "next/link";
import clsx from "clsx";
import { IBoard } from "@/types/boards";
import Board from "@/components/Icons/Board";
import ButtonCreateNewBoard from "@/components/ButtonCreateNewBoard";

interface IProps {
  activeBoardId?: string;
  boards: IBoard[];
}

function BoardsList({ activeBoardId, boards }: IProps) {
  return (
    <div className="flex-auto flex flex-col overflow-hidden">
      <span className="pl-[2rem] text-xs font-bold tracking-[.15rem] text-light-4">
        ALL BOARDS (3)
      </span>
      <ul className="mt-[1.125rem] flex-initial overflow-y-auto">
        {boards.map(({ id, name }) => (
          <li key={id} className="mr-[1.5rem]">
            <Link
              href={`/${id}`}
              className={clsx(
                "h-[3rem] px-[2rem] flex items-center rounded-r-[6.25rem]",
                id === activeBoardId
                  ? "bg-purple-1 text-light-1"
                  : "text-light-4 hover:text-purple-1 hover:bg-purple-1/10 dark:hover:bg-light-1"
              )}
            >
              <div className="w-[1rem] h-[1rem]">
                <Board className="fill-current" />
              </div>
              <span className="inline-block ml-[1rem] font-[.9375rem] font-bold leading-[1.1875rem] truncate text-inherit">
                {name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <ButtonCreateNewBoard onClick={() => null} />
    </div>
  );
}

export default BoardsList;