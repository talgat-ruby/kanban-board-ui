import { gql } from "graphql-request";
import client from "@/app/api/client";

type TGetBoardVariables = {
  id: string;
};

const GetBoardQuery = gql`
  query GetBoard($id: uuid!) {
    board: boards_by_pk(id: $id) {
      id
      name
      columns(order_by: { position: asc }) {
        id
        name
        tasks(order_by: { position: desc }) {
          id
          description
          title
          allSubtasks: subtasks_aggregate {
            aggregate {
              count
            }
          }
          doneSubtasks: subtasks_aggregate(
            where: { is_completed: { _eq: true } }
          ) {
            aggregate {
              count
            }
          }
        }
      }
    }
  }
`;

interface ISubtasksAggr {
  aggregate: {
    count: number;
  };
}

interface ITasks {
  id: string;
  description: string;
  title: string;
  allSubtasks: ISubtasksAggr;
  doneSubtasks: ISubtasksAggr;
}

interface IColumn {
  id: string;
  name: string;
  tasks: ITasks[];
}

export type TResult = {
  id: string;
  name: string;
  columns: IColumn[];
};

async function fetchBoard(id: string) {
  const variables: TGetBoardVariables = { id };

  const data = await client.request<{ board: TResult }, TGetBoardVariables>(
    GetBoardQuery,
    variables
  );

  return data.board;
}

export default fetchBoard;
