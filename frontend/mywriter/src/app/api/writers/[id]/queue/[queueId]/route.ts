import { QueueRequest } from "@/lib/user";
import { addStoryRequest, deleteRequest, getStoryRequests } from "@/lib/user_functions";

export async function GET(request: Request, { params }: {params: { id: string, queueId: string }}) {
  const allRequests = await getStoryRequests(params.id) as QueueRequest[]
  return Response.json(
    allRequests
        .filter((request) => {
          return request.id == params.queueId
        })[0]);
}

export async function DELETE(request: Request, { params }: {params: { id: string, queueId: string }}) {
  await deleteRequest(params.id, params.queueId)

  return Response.json({success: true})
}