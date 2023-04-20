"use client";

import { useState } from "react";
import clsx from "clsx";
import { IBoard } from "@/types/boards";
import LogoContainer from "@/components/LogoContainer";
import DarkLightSwitcher from "@/components/DarkLightSwitcher";

interface IProps {
  boards: IBoard[];
}

function Aside({ boards }: IProps) {
  const [isShowing, setIsShowing] = useState(true);

  return (
    <>
      <aside
        className={clsx(
          "sticky top-0 z-10 w-[--sidebar-width] h-screen flex flex-col transition-[margin] bg-light-1 dark:bg-dark-3",
          !isShowing && "-ml-[--sidebar-width]"
        )}
      >
        <LogoContainer className="h-[--header-height]" />
        <div className="pt-[1rem]">
          <span className="text-xs font-bold tracking-[.15em] text-light-4">
            ALL BOARDS (3)
          </span>
        </div>
        <DarkLightSwitcher />
        <button className="" onClick={() => setIsShowing(false)}>
          Hide Sidebar
        </button>
      </aside>
      <button
        className="fixed bottom-[2rem]"
        onClick={() => setIsShowing(true)}
      >
        Show Sidebar
      </button>
    </>
  );

  // const router = useRouter();
  // const params = useParams();
  // const [isShowing, setIsShowing] = useState(true);
  // const [columns, setColumns] = useState<string[]>([]);
  //
  // const handleSubmit = useCallback(
  //   async (event: FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();
  //     const { currentTarget } = event;
  //
  //     const formData = new FormData(currentTarget);
  //
  //     const boardName = formData.get("board-name");
  //
  //     try {
  //       const req = new Request("http://localhost:3000/api/boards", {
  //         method: "POST",
  //         body: JSON.stringify({
  //           name: boardName,
  //           columnsData: columns.map((column) => ({ name: column })),
  //         }),
  //       });
  //       const res = await fetch(req);
  //       const json: { id: string } = await res.json();
  //
  //       router.push(`/${json.id}`);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   },
  //   [columns, router]
  // );
  //
  // const handleDelete = useCallback(
  //   async (event: MouseEvent<HTMLButtonElement>) => {
  //     const { dataset } = event.currentTarget;
  //     const id = dataset.id || "";
  //
  //     try {
  //       const res = await fetch(`http://localhost:3000/api/boards/${id}`, {
  //         method: "DELETE",
  //       });
  //       const json: { id: string; name: string } = await res.json();
  //
  //       if (params.boardId === id) {
  //         router.push("/");
  //       } else {
  //         router.refresh();
  //       }
  //
  //       alert(`Board ${json.name} was deleted`);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   },
  //   [params.boardId, router]
  // );
  //
  // const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
  //   const { currentTarget } = event;
  //   const { value, dataset } = currentTarget;
  //   const ind = Number(dataset.ind);
  //
  //   setColumns((columns) => [
  //     ...columns.slice(0, ind),
  //     value,
  //     ...columns.slice(ind + 1),
  //   ]);
  // }, []);
  //
  // return (
  //   <aside>
  //     <ul className={clsx(!isShowing && "invisible")}>
  //       {boards.map((board) => (
  //         <li key={board.id}>
  //           <Link href={`/${board.id}`}>{board.name}</Link>
  //           <button>Update</button>
  //           <button data-id={board.id} onClick={handleDelete}>
  //             Delete
  //           </button>
  //         </li>
  //       ))}
  //     </ul>
  //     <form action="" onSubmit={handleSubmit}>
  //       <label htmlFor="board-name">Name</label>
  //       <input type="text" id="board-name" name="board-name" />
  //
  //       <label htmlFor="">Column</label>
  //       <ul>
  //         {columns.map((column, ind) => (
  //           <li key={ind}>
  //             <input
  //               type="text"
  //               data-ind={ind}
  //               value={column}
  //               onChange={handleChange}
  //             />
  //             <button
  //               type="button"
  //               onClick={() =>
  //                 setColumns((prevColumns) =>
  //                   prevColumns.filter((_, prevInd) => prevInd !== ind)
  //                 )
  //               }
  //             >
  //               X
  //             </button>
  //           </li>
  //         ))}
  //       </ul>
  //       <button
  //         type="button"
  //         onClick={() => setColumns((columns) => [...columns, ""])}
  //       >
  //         Add new column
  //       </button>
  //       <button type="submit">Create new board</button>
  //     </form>
  //     <button onClick={() => setIsShowing((prevIsShowing) => !prevIsShowing)}>
  //       {isShowing ? "Hide" : "Show"}
  //     </button>
  //   </aside>
  // );
}

export default Aside;
