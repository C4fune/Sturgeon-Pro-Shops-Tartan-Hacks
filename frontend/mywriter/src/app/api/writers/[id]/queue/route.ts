import { addStoryRequest, getStoryRequests } from "@/lib/user_functions";

export async function GET(request: Request, { params }: {params: { id: string }}) {
  return Response.json(await getStoryRequests(params.id));
}

export async function PUT(request: Request, { params }: {params: { id: string }}) {
    let req = await request.json()
    await addStoryRequest(req.fromID, req.fromName, params.id, req.body)
    return Response.json({success: true})
}