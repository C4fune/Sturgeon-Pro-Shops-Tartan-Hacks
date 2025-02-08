import { getAllGroups } from "@/lib/group_functions";

export async function GET(request: Request, { params }: {params: { classId: string }}) {
    const groups = (await getAllGroups())
    console.log(groups)
    console.log(decodeURI(params.classId).replace("%3A", ":"))
    return Response.json(groups.filter(group => { return group.topicClass == decodeURI(params.classId).replace("%3A", ":") }))
}