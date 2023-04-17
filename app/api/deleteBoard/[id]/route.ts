import { gql, request } from "graphql-request";
import { NextResponse } from "next/server";
import { IBoardWithColumnsWithTasksWithSubtasksAggr } from "@/types/boards";

const headers = new Headers();
headers.set(
  "x-hasura-admin-secret",
  process.env.HASURA_GRAPHQL_ADMIN_SECRET || ""
);

const query = gql`
  mutation deleteBoard($id: uuid!) {
    delete_boards_by_pk(id: $id)
    id
  }
`;

interface IProps {
  params: {
    id: string;
  };
}

export async function GET(nextRequest: Request, { params }: IProps) {
  try {
    const data: { board: IBoardWithColumnsWithTasksWithSubtasksAggr } =
      await request({
        url: process.env.HASURA_URL || "",
        document: query,
        variables: { id: params.id },
        requestHeaders: headers,
      });

    return NextResponse.json(data.board);
  } catch (e) {
    return new Response((e as Error).message, { status: 400 });
  }
}
