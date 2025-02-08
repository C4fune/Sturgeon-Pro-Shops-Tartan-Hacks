/* Original ideas for stories
 * Flavor #2: Commercial Use 
 * Retain control over reuse of your work, while allowing anyone to appropriately use the work in exchange for the economic terms you set. This is similar to Shutterstock with creator-set rules.
 * What others can do?
✅ Purchase the right to use your creation (defaultMintingFee is set)
❌ Claim credit for the original work (commercialAttribution == true)
✅ Commercialize the original and derivative works (commercialUse == true)
✅ Distribute their remix anywhere
 */
import { IpMetadata } from '@story-protocol/core-sdk'
import { SPGNFTContractAddress, client } from '../utils/utils'
import { uploadJSONToIPFS } from '../utils/uploadToIpfs'
import { createHash } from 'crypto'

export async function mintAndRegisterIdea(IdeaUser : string, IdeaTitle : string, IdeaText : string) {
    // ????? Is the user a string?

    // 1. Set up your IP Metadata
    //
    // Docs: https://docs.story.foundation/docs/ipa-metadata-standard
    const ipMetadata: IpMetadata = client.ipAsset.generateIpMetadata({
        title: IdeaTitle,
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
        name: 'NFT representing ownership of IP Asset: Story Idea',
        description: 'This NFT represents ownership of an IP Asset',
        text: IdeaText,
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