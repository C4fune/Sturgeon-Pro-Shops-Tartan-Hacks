import { openaiRequest } from "@/app/api/chat/route";
import { Author, User } from "@/lib/user";
import { getAllWriters, getUserData, updateMatchedAuthor } from "@/lib/user_functions";

export async function GET(request: Request, { params }: {params: { id: string }}) {

    let prompt = "There is a user and some writers. We want to match the user with a writer who suits their needs best. Here is information about the user we want to match with a writer:\n"
    
    let user = await getUserData(params.id) as User
    for (const genre in user.interests.genres) {
        prompt += `\nThe user rated the genre \"${genre}\" a ${(user.interests.genres as any)[genre]} out of 10.`
    }

    prompt += `\n\nThe user rated an excerpt from a thriller that used heart-felt romantic language a ${user.interests.writingOneScore} out of 10.`
    prompt += `\nThe user rated an excerpt from a horror story that used strong, simple language in the style of Albert Camus, especially The Stranger, a ${user.interests.writingTwoScore} out of 10.`
    prompt += `\nThe user rated an excerpt from an adventure novel, using very detailed language in the style of  George R. R. Martin a ${user.interests.writingThreeScore} out of 10.`
    prompt += `\nThe user rated an excerpt from a sci-fi novel that using slightly ominous language in the style of Frank Herbert in the book Dune a ${user.interests.writingFourScore} out of 10.`

    if (user.interests.custom != "") {
        prompt += `\nWhen prompted to say something about themselves or the style of books they prefer, they said: \"${user.interests.custom}\"`
    }

    prompt += `\n\nHere are each of the writers they could be matched with:\n`

    let authorCounter = 1
    const writerQuery = await getAllWriters();
    const writers: any = []
    writerQuery.forEach((doc) => {
        let author = doc.doc as Author

        prompt += `\n\nAuthor ${authorCounter}:`
        writers[authorCounter] = { ...author, id: doc.id }
        authorCounter += 1

        for (const genre in author.genres) {
            prompt += `\nThis author rated the genre \"${genre}\" a ${(author.genres as any)[genre]} out of 10.`
        }
        for (const sample of author.samples) {
            prompt += `\nHere is one sample of the author's work:\n`
            prompt += sample
        }
        if (author.style != "") {
            prompt += `\nWhen prompted to say something about their style, the author said: \"${author.style}\"`
        }
    });

    prompt += `\n\nWith all of the information about the user and the possible authors, who matches the best with the user? Please respond using ONLY a single number representing the best author.`

    const data = await openaiRequest([{ role: "user", content: prompt }])

    const assistantReply = data.choices?.[0]?.message?.content || "OUT OF API CALLS";

    // console.log(prompt)
    console.log(assistantReply)

    const matchedAuthor = writers[parseInt(assistantReply)]

    updateMatchedAuthor(params.id, matchedAuthor.id)
    

    return Response.json(matchedAuthor)
}