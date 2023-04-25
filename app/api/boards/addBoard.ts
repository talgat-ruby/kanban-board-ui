import { gql } from "graphql-request";
import client from "@/app/api/client";

interface IColumnVariables {
  name: string;
  position: number;
}

type TAddMutationVariables = {
  name: string;
  columns: IColumnVariables[];
};

const AddBoardMutation = gql`
  mutation AddBoard($name: String!, $columns: [columns_insert_input!]!) {
    insert: insert_boards_one(
      object: { name: $name, columns: { data: $columns } }
    ) {
      id
      name
    }
  }
`;

interface IColumn {
  name: string;
}

export interface IBody {
  name: string;
  columns: IColumn[];
}

export type TResult = {
  id: string;
};

async function addBoard(body: IBody) {
  const columns = body.columns.map((columnData, i) => ({
    ...columnData,
    position: i,
  }));

  const variables: TAddMutationVariables = {
    name: body.name,
    columns,
  };

  const data = await client.request<{ insert: TResult }, TAddMutationVariables>(
    AddBoardMutation,
    variables
  );

  return data.insert;
}

export default addBoard;
