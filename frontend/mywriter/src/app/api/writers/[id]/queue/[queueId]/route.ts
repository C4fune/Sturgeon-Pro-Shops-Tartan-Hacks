import { QueueRequest } from "@/lib/user";
import { addStoryRequest, getStoryRequests } from "@/lib/user_functions";

export async function GET(request: Request, { params }: {params: { id: string, queueId: string }}) {
  return Response.json(
    (await getStoryRequests(params.id) as QueueRequest[])
        .filter((request) => {
            request.id == params.queueId
        })[0]);
}