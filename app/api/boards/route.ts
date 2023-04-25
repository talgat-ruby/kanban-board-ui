import { NextResponse } from "next/server";
import fetchBoards from "@/app/api/boards/fetchBoards";
import addBoard, {
  IBody as IAddBoardMutationBody,
} from "@/app/api/boards/addBoard";

export async function GET() {
  try {
    const list = await fetchBoards();
    return NextResponse.json(list);
  } catch (e) {
    return new Response((e as Error).message, { status: 400 });
  }
}

export async function POST(nextRequest: Request) {
  try {
    const body: IAddBoardMutationBody = await nextRequest.json();
    const board = await addBoard(body);

    return NextResponse.json(board);
  } catch (e) {
    return new Response((e as Error).message, { status: 400 });
  }
}
