"use client";

import { FormEvent, MouseEvent, useCallback, useRef, useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import ButtonCreateNewBoard from "@/components/ButtonCreateNewBoard";
import Cross from "@/components/Icons/Cross";
import { IAddBoardBody, TAddBoardResult } from "@/app/api/types";

interface IColumn {
  id: string;
  name: string;
  isLocal: boolean;
}

function ModalAddNewBoard() {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [columns, setColumns] = useState<IColumn[]>([]);

  const handleNewBoardClick = useCallback(() => {
    dialogRef.current?.showModal();
  }, []);

  const handleDialogClick = useCallback(
    (event: MouseEvent<HTMLDialogElement>) => {
      const { target, currentTarget } = event;
      if (target === currentTarget) {
        currentTarget.close("dismiss");
      }
    },
    []
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const { currentTarget } = event;

      const formData = new FormData(currentTarget);

      try {
        const columns = formData
          .getAll("columns")
          .map((column) => ({ name: String(column) }));
        const body: IAddBoardBody = {
          name: String(formData.get("name")),
          columns,
        };
        const res = await fetch("http://localhost:3000/api/boards", {
          method: "POST",
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          await Promise.reject(new Error("response invalid"));
        }

        const result: TAddBoardResult = await res.json();

        router.push(`/${result.id}`);
      } catch (err) {
        console.error(err);
      }
    },
    [router]
  );

  const handleAddColumnClick = useCallback(() => {
    setColumns((prevColumns) => [
      ...prevColumns,
      { id: crypto.randomUUID(), name: "", isLocal: true },
    ]);
  }, []);

  const handleDeleteColumnClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const { currentTarget } = event;
      const { dataset } = currentTarget;

      setColumns((prevColumns) =>
        prevColumns.filter(({ id }) => id !== dataset.id)
      );
    },
    []
  );

  return (
    <>
      <ButtonCreateNewBoard onClick={handleNewBoardClick} />
      <dialog
        ref={dialogRef}
        onClick={handleDialogClick}
        className={clsx(
          "w-[30rem] p-0 text-light-4 rounded-[0.375rem]",
          "grid [&:not([open])]:opacity-0 [&:not([open])]:invisible [&:not([open])]:pointer-events-none",
          "[&::backdrop]:bg-black/50 [&::backdrop]:transition",
          "bg-light-1 dark:bg-dark-3"
        )}
      >
        <form className="p-[2rem]" onSubmit={handleSubmit}>
          <header className="mb-[1.5rem]">
            <h3
              className={clsx(
                "text-[1.125rem] font-bold leading-[1.4375rem]",
                "text-dark-1 dark:text-light-1"
              )}
            >
              Add New Board
            </h3>
          </header>
          <article className="space-y-[1.5rem]">
            <section className="flex flex-col">
              <label
                htmlFor="board-name"
                className={clsx(
                  "mb-[.5rem] text-[.75rem] font-bold leading-[.9375rem]",
                  "text-light-4 dark:text-light-1"
                )}
              >
                Name
              </label>
              <input
                type="text"
                id="board-name"
                name="name"
                placeholder="e.g. Web Design"
                className={clsx(
                  "h-[2.5rem] px-[1rem] bg-transparent text-[.8125rem] leading-[1.4375rem] rounded-[.25rem]",
                  "border-solid border border-light-4/[.25]",
                  "text-dark-1 dark:text-light-1 placeholder:text-dark-1/[0.25] dark:placeholder:text-light-1/[0.25]"
                )}
              />
            </section>
            <section className="flex flex-col">
              <label
                className={clsx(
                  "mb-[.5rem] text-[.75rem] font-bold leading-[.9375rem]",
                  "text-light-4 dark:text-light-1"
                )}
              >
                Columns
              </label>
              <ul className="space-y-[.75rem]">
                {columns.map((column) => (
                  <li
                    key={column.id}
                    className="flex items-center space-x-[1rem]"
                  >
                    <input
                      type="text"
                      name="columns"
                      placeholder="e.g. Backlog, Done"
                      className={clsx(
                        "flex-auto h-[2.5rem] px-[1rem] bg-transparent text-[.8125rem] leading-[1.4375rem] rounded-[.25rem]",
                        "border-solid border border-light-4/[.25]",
                        "text-dark-1 dark:text-light-1 placeholder:text-dark-1/[0.25] dark:placeholder:text-light-1/[0.25]"
                      )}
                    />
                    <button
                      data-id={column.id}
                      onClick={handleDeleteColumnClick}
                    >
                      <Cross className="fill-current" />
                    </button>
                  </li>
                ))}
                <div className="flex w-full h-[2.5rem]">
                  <button
                    type="button"
                    className={clsx(
                      "flex-auto flex justify-center items-center text-purple-1 text-[0.8125rem] font-bold leading-[1.4375rem] rounded-[1.25rem]",
                      "bg-purple-1/[.1] dark:bg-light-1"
                    )}
                    onClick={handleAddColumnClick}
                  >
                    + Add New Column
                  </button>
                </div>
              </ul>
            </section>
            <section>
              <div className="flex w-full h-[2.5rem]">
                <button
                  type="submit"
                  className={clsx(
                    "flex-auto flex justify-center items-center rounded-[1.25rem]",
                    "bg-purple-1 text-light-1 text-[0.8125rem] font-bold leading-[1.4375rem]"
                  )}
                >
                  Create New Board
                </button>
              </div>
            </section>
          </article>
        </form>
      </dialog>
    </>
  );
}

export default ModalAddNewBoard;
