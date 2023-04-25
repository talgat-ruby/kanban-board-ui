import { gql } from "graphql-request";
import client from "@/app/api/client";

const GetBoardsQuery = gql`
  query GetBoards {
    list: boards {
      id
      name
    }
  }
`;

interface IBoard {
  id: string;
  name: string;
}

export type TResult = IBoard[];

async function fetchBoards() {
  const data = await client.request<{ list: TResult }>(GetBoardsQuery);

  return data.list;
}

export default fetchBoards;
