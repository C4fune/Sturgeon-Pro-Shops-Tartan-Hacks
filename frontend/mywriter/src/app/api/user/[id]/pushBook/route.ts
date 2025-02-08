import { addOnboardingData, pushBookToUser } from "@/lib/user_functions";

export async function PUT(request: Request, { params }: {params: { id: string }}) {
    let req = await request.json()
    await pushBookToUser(params.id, req)
    return Response.json({success: true})
}