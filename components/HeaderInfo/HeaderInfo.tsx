import ModalUpdateBoard from "@/components/ModalUpdateBoard";
import { TFetchBoardResult } from "@/app/api/types";
import ModalDeleteBoard from "@/components/ModalDeleteBoard";
import ModalAddNewTask from "@/components/ModalAddNewTask";

interface IProps {
  board: TFetchBoardResult;
}

function HeaderInfo({ board }: IProps) {
  return (
    <section className="flex-auto flex">
      <div className="px-[1.5rem] flex-auto flex items-center">
        <h1 className="text-[1.5rem] text-dark-1 font-bold leading-[1.875rem] dark:text-light-1">
          {board.name}
        </h1>
      </div>
      <div className="flex items-center mr-[2rem] space-x-[1.5rem]">
        <ModalAddNewTask columns={board.columns} />
        <ModalUpdateBoard board={board} />
        <ModalDeleteBoard board={board} />
        {/*<button*/}
        {/*  id="dropdownMenuIconButton"*/}
        {/*  data-dropdown-toggle="dropdownDots"*/}
        {/*  className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"*/}
        {/*  type="button"*/}
        {/*>*/}
        {/*  <Ellipsis />*/}
        {/*</button>*/}

        {/*<Dropdown name="board-actions" options={["Edit Board", "Delete Board"]}>*/}
        {/*  <Ellipsis />*/}
        {/*</Dropdown>*/}
      </div>
    </section>
  );
}

export default HeaderInfo;
