import { GenreRatings } from "@/lib/user";
import { getUserData, register } from "@/lib/user_functions";

export async function PUT(request: Request, { params }: {params: { id: string }}) {
    // TODO: fix genreRatings
    let genreRatings: GenreRatings = {
        scifi: 10,
        fantasy: 1,
        dystopia: 1,
        mystery: 1,
        horror: 1,
        action: 1,
        adventure: 1,
        teen: 1,
        romance: 1,
        historical: 1,
        thriller: 1,
        children: 10,
    }

    const req = await request.json()

    if (await getUserData(params.id) == undefined) {
        register(params.id, req.username, genreRatings)
    }

    return Response.json({success: true})
}