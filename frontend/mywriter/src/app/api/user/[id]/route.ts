import { getUserData } from "@/lib/user_functions";

export async function GET(request: Request, { params }: {params: { id: string }}) {
    return Response.json(await getUserData(params.id))
}
