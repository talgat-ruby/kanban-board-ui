import { gql, request } from "graphql-request";
import { NextResponse } from "next/server";

const headers = new Headers();
headers.set(
  "x-hasura-admin-secret",
  process.env.HASURA_GRAPHQL_ADMIN_SECRET || ""
);

const addMutation = gql`
  mutation AddTask($column_id: uuid!, $title: String!, $description: String!) {
    insert: insert_tasks_one(
      object: {
        title: $title
        description: $description
        column_id: $column_id
      }
    ) {
      id
    }
  }
`;

interface IPostBody {
  title: string;
  description: string;
  columnId: string;
}

type TAddMutationVariable = {
  title: string;
  description: string;
  column_id: string;
};

export async function POST(nextRequest: Request) {
  try {
    const body: IPostBody = await nextRequest.json();

    const variables: TAddMutationVariable = {
      title: body.title,
      description: body.description,
      column_id: body.columnId,
    };

    const data = await request<
      { insert: { id: string } },
      TAddMutationVariable
    >({
      url: process.env.HASURA_URL || "",
      document: addMutation,
      variables,
      requestHeaders: headers,
    });

    return NextResponse.json(data.insert);
  } catch (e) {
    return new Response((e as Error).message, { status: 400 });
  }
}
