import {gql, request} from "graphql-request";
import {NextResponse} from "next/server";

const headers = new Headers();
headers.set(
    "x-hasura-admin-secret",
    process.env.HASURA_GRAPHQL_ADMIN_SECRET || ""
);

const addMutation = gql`
    mutation AddTask($column_id: uuid!, $title: String!, $description: String!, $position: Int!) {
        insert: insert_tasks_one(
            object: {
                title: $title
                description: $description
                column_id: $column_id
                position: $position
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
    position: number;
    column_id: string;
};


const getTasksById = gql`
    query GetTasksById($column_id: uuid!) {
        tasks(where: {column_id: {_eq: $column_id}}, order_by: {position: asc}) {
            id
        }
    }
`;

type IGetTasksByIdVar = {
    column_id: string
}

const updateTasksPosition = gql`
    mutation UpdateTasksPosition($updates: [tasks_updates!]!) {
        update_tasks_many(updates: $updates) {
            affected_rows
        }
    }
`;

type IUpdateTasksPositionUpdateVar = {
    _set: {
        position: number
    },
    where: {
        id: {
            _eq: string
        }
    }
}

type IUpdateTasksPositionVar = {
    updates: IUpdateTasksPositionUpdateVar[]
}

export async function POST(nextRequest: Request) {
    try {
        const body: IPostBody = await nextRequest.json();

        const columnsIdData = await request<
            { tasks: { id: string }[] },
            IGetTasksByIdVar
        >({
            url: process.env.HASURA_URL || "",
            document: getTasksById,
            variables: {column_id: body.columnId},
            requestHeaders: headers,
        })

        const variables: TAddMutationVariable = {
            title: body.title,
            description: body.description,
            position: columnsIdData.tasks.length,
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
        return new Response((e as Error).message, {status: 400});
    }
}
