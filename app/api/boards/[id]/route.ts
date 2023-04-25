import { NextResponse } from "next/server";
import deleteBoard from "@/app/api/boards/[id]/deleteBoard";
import updateBoard, {
  IBody as IUpdateBoardBody,
} from "@/app/api/boards/[id]/updateBoard";
import fetchBoard from "@/app/api/boards/[id]/fetchBoard";

interface IContext {
  params: {
    id: string;
  };
}

export async function GET(nextRequest: Request, { params }: IContext) {
  try {
    const board = await fetchBoard(params.id);
    return NextResponse.json(board);
  } catch (e) {
    return new Response((e as Error).message, { status: 400 });
  }
}

export async function PUT(nextRequest: Request, { params }: IContext) {
  try {
    const body: IUpdateBoardBody = await nextRequest.json();
    const updated = await updateBoard(params.id, body);

    return NextResponse.json(updated);
  } catch (e) {
    return new Response((e as Error).message, { status: 400 });
  }
}

export async function DELETE(nextRequest: Request, { params }: IContext) {
  try {
    const deleted = await deleteBoard(params.id);
    return NextResponse.json(deleted);
  } catch (e) {
    return new Response((e as Error).message, { status: 400 });
  }
}
