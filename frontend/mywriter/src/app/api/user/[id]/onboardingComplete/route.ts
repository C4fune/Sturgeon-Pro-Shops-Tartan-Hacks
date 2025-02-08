import { getUserData } from "@/lib/user_functions";

export async function PUT(request: Request, { params }: {params: { id: string }}) {
    let req = request.json()
    return Response.json(await getUserData(params.id))
}
