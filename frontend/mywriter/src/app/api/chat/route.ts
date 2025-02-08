import OpenAI from 'openai';
import { IpMetadata } from '@story-protocol/core-sdk'
import { SPGNFTContractAddress, client } from '../../../story-utils/utils'
import { uploadJSONToIPFS } from '../../../story-utils/uploadToIpfs'
import { createHash } from 'crypto'

const OpenAIclient = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'], // Ensure this is correctly set
});

/* Original ideas for stories
 * Pipeline: start with the user idea
 * send it to the author
 * the author's registered Outline IPA will have reference to the original user
 * Then the generated text will be a commercial derivative
 * Flavor #2: Commercial Use 
 * Retain control over reuse of your work, while allowing anyone to appropriately use the work in exchange for the economic terms you set. This is similar to Shutterstock with creator-set rules.
 * What others can do?
✅ Purchase the right to use your creation (defaultMintingFee is set)
❌ Claim credit for the original work (commercialAttribution == true)
✅ Commercialize the original and derivative works (commercialUse == true)
✅ Distribute their remix anywhere
 */

async function mintAndRegisterOutline() {

}

<<<<<<< Updated upstream
async function registerDerivativeCommercialOutlineExpanded() {
=======
export async function openaiRequest(messages: any) {
  try {
    // Call OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages,
      }),
    });
>>>>>>> Stashed changes

}

async function mintAndRegisterIdea(responseData : Response) {
    // ????? Is the user a string?
    const chatResponseData = await responseData.json()
    // 1. Set up your IP Metadata
    //
    // Docs: https://docs.story.foundation/docs/ipa-metadata-standard
    const ipMetadata: IpMetadata = client.ipAsset.generateIpMetadata({
        title: chatResponseData.id,
        description: 'User-provided plot, characters, or world-building details',
        attributes: [
            {
                key: 'Content-Type',
                value: 'Idea',
            },
        ],
    })

    // 2. Set up your NFT Metadata
    //
    // Docs: https://eips.ethereum.org/EIPS/eip-721
    const nftMetadata = {
        name: 'NFT representing ownership of IP Asset',
        description: 'This NFT represents ownership of an IP Asset',
        text: chatResponseData.choices[0].content,
    }

     // 3. Upload your IP and NFT Metadata to IPFS
    const ipIpfsHash = await uploadJSONToIPFS(ipMetadata)
    const ipHash = createHash('sha256').update(JSON.stringify(ipMetadata)).digest('hex')
    const nftIpfsHash = await uploadJSONToIPFS(nftMetadata)
    const nftHash = createHash('sha256').update(JSON.stringify(nftMetadata)).digest('hex')

    // 4. Register the NFT as an IP Asset
    //
    // Docs: https://docs.story.foundation/docs/attach-terms-to-an-ip-asset#mint-nft-register-as-ip-asset-and-attach-terms
    const response = await client.ipAsset.mintAndRegisterIp({
        spgNftContract: SPGNFTContractAddress,
        allowDuplicates: true,
        ipMetadata: {
            ipMetadataURI: `https://ipfs.io/ipfs/${ipIpfsHash}`,
            ipMetadataHash: `0x${ipHash}`,
            nftMetadataURI: `https://ipfs.io/ipfs/${nftIpfsHash}`,
            nftMetadataHash: `0x${nftHash}`,
        },
        txOptions: { waitForTransaction: true },
    })
    console.log(`Root IPA created at transaction hash ${response.txHash}, IPA ID: ${response.ipId}`)
    console.log(`View on the explorer: https://explorer.story.foundation/ipa/${response.ipId}`)

}

export async function POST(req : Request) {
    try {
        // Parse the incoming request body
        const body = await req.json();
        const { messages } = body; // Assuming 'messages' is an array in the body

        mintAndRegisterOutline()

        // Log to verify the incoming messages
        console.log("Received messages:", messages);

        // Make sure 'messages' is provided, otherwise return an error
        if (!messages || !Array.isArray(messages)) {
            console.error("Invalid messages format:", messages);
            return new Response('Messages not provided or invalid', { status: 400 });
        }

        // Request completion from OpenAI API
        const chatCompletion = await OpenAIclient.chat.completions.create({
            model: 'gpt-3.5-turbo', // Make sure the model version is correct
            messages: messages, // Use the messages passed in the request body
        });

        // Log the response from OpenAI API
        console.log("OpenAI response:", chatCompletion);

        registerDerivativeCommercialOutlineExpanded()

        // Return the response from OpenAI API
        return new Response(JSON.stringify(chatCompletion), { status: 200 });
    } catch (error) {
        // Log the error message to help diagnose the issue
        console.error("Error occurred:", error.message);
        console.error(error.stack); // Log the full stack trace for debugging

        // Return error message with 500 status code
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}