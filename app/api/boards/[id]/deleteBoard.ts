import { gql } from "graphql-request";
import client from "@/app/api/client";

type TDeleteMutationVariables = {
  id: string;
};

export type TResult = {
  id: string;
  name: string;
};

const DeleteBoardMutation = gql`
  mutation DeleteBoard($id: uuid!) {
    delete: delete_boards_by_pk(id: $id) {
      id
      name
    }
  }
`;

async function deleteBoard(id: string) {
  const variables: TDeleteMutationVariables = { id };

  const data = await client.request<
    { delete: TResult },
    TDeleteMutationVariables
  >(DeleteBoardMutation, variables);

  return data.delete;
}

export default deleteBoard;
