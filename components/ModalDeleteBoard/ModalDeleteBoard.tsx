"use client";

import { FormEvent, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Dialog from "@/components/Dialog";
import ButtonDeleteBoard from "@/components/ButtonDeleteBoard";
import FormConfirmation from "@/components/FormConfirmation";
import { TDeleteBoardResult, TFetchBoardResult } from "@/app/api/types";

interface IColumn {
  id?: string;
  name: string;
}

interface IProps {
  board: TFetchBoardResult;
}

function ModalDeleteBoard({ board }: IProps) {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);

  const handleNewBoardClick = useCallback(() => {
    setOpenDialog(true);
  }, []);

  const handleDialogClose = useCallback(() => {
    setOpenDialog(false);
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      const { currentTarget } = event;
      const { dataset } = currentTarget;

      const id = String(dataset.id);

      try {
        const res = await fetch(`http://localhost:3000/api/boards/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          await Promise.reject(new Error("response invalid"));
        }

        const result: TDeleteBoardResult = await res.json();

        router.push("/");
      } catch (err) {
        console.error(err);
      }
    },
    [router]
  );

  return (
    <>
      <ButtonDeleteBoard onClick={handleNewBoardClick} />
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <FormConfirmation
          id={board.id}
          title="Delete this board?"
          description="Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and tasks and cannot be reversed."
          onSubmit={handleSubmit}
          onCancel={handleDialogClose}
        />
      </Dialog>
    </>
  );
}

export default ModalDeleteBoard;
