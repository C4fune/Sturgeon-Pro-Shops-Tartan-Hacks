import { getBook, getUserData } from "@/lib/user_functions";

export async function GET(request: Request, { params }: {params: { id: string, bookId: string }}) {
    return Response.json(await getBook(params.id, params.bookId))
}
