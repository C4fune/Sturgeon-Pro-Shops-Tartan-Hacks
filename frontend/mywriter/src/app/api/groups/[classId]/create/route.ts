import { createGroup, getAllGroups } from "@/lib/group_functions";
import { addGroup } from "@/lib/user_functions";

export async function PUT(request: Request, { params }: {params: { classId: string }}) {
    const data = await request.json()
    await createGroup(data.groupName, data.times, data.user, params.classId)
    await addGroup(data.user, data.groupName)
    return Response.json({s : true})
}