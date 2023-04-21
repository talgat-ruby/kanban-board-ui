import Ellipsis from "@/components/Icons/Ellipsis";

interface IProps {
  boardId: string;
  boardName: string;
}

function HeaderInfo({ boardId, boardName }: IProps) {
  return (
    <section className="flex-auto flex">
      <div className="px-[1.5rem] flex-auto flex items-center">
        <h1 className="text-[1.5rem] text-dark-1 font-bold leading-[1.875rem] dark:text-light-1">
          {boardName}
        </h1>
      </div>
      <div className="flex items-center mr-[2rem] space-x-[1.5rem]">
        <button
          type="button"
          className="w-[10.25rem] h-[3rem] flex items-center justify-center bg-purple-1 text-[.9375rem] font-bold text-light-1 rounded-[1.5rem]"
        >
          + Add New Task
        </button>
        <button
          id="dropdownMenuIconButton"
          data-dropdown-toggle="dropdownDots"
          className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          type="button"
        >
          <Ellipsis />
        </button>

        <div
          id="dropdownDots"
          className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownMenuIconButton"
          >
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Earnings
              </a>
            </li>
          </ul>
          <div className="py-2">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Separated link
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeaderInfo;
