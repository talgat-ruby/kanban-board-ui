import { gql, request } from "graphql-request";
import { NextResponse } from "next/server";
import { createBoard } from "@/types/boards";

const headers = new Headers();
headers.set(
  "x-hasura-admin-secret",
  process.env.HASURA_GRAPHQL_ADMIN_SECRET || ""
);

const query = gql`
  mutation CreateBoard {
    insert_boards(
      objects: {
        name: "homework8"
        columns: { data: [{ name: "start3" }, { name: "start4" }] }
      }
    ) {
      returning {
        id
        name
        columns {
          name
        }
      }
    }
  }
`;

export async function GET(nextRequest: Request) {
  try {
    const data: { insert_boards: createBoard } = await request({
      url: process.env.HASURA_URL || "",
      document: query,
      requestHeaders: headers,
    });

    return NextResponse.json(data.insert_boards);
  } catch (e) {
    return new Response((e as Error).message, { status: 400 });
  }
}
