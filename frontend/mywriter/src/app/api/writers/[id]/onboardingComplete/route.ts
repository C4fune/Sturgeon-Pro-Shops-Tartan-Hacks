import { addWriterOnboardingData } from "@/lib/user_functions";

export async function PUT(request: Request, { params }: {params: { id: string }}) {
    let req = await request.json()
    await addWriterOnboardingData(params.id, req)
    return Response.json({success: true})
}
