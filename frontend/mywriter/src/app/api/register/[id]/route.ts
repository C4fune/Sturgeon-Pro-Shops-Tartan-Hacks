import { GenreRatings } from "@/lib/user";
import { getUserData, register } from "@/lib/user_functions";

export async function PUT(request: Request, { params }: {params: { id: string }}) {
    const req = await request.json()

    if (await getUserData(params.id) == undefined) {
        register(params.id, req.username)
    }

    return Response.json({success: true})
}