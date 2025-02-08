/*
Given a Response object from a ChatGPT Post request,
Make the expanded output a commercial derivative
*/
import { IpMetadata, MintAndRegisterIpAssetWithPilTermsResponse } from '@story-protocol/core-sdk'
import { Address, toHex, zeroAddress } from 'viem'
import { RoyaltyPolicyLAP, SPGNFTContractAddress, createCommercialRemixTerms, client, defaultLicensingConfig } from './utils'
import { WIP_TOKEN_ADDRESS } from '@story-protocol/core-sdk'
import { createHash } from 'crypto'
import { uploadJSONToIPFS } from './uploadToIpfs'

// BEFORE YOU RUN THIS FUNCTION: Make sure to read the README which contains
// instructions for running this "Register Derivative Commercial SPG" example.

export async function registerDerivativeCommercialExpandedOutline (parentIp : MintAndRegisterIpAssetWithPilTermsResponse, chatResponseData : Response) {
    const prose = await chatResponseData.json()
    // 2. Mint and Register IP asset and make it a derivative of the parent IP Asset
    //
    // Docs: https://docs.story.foundation/docs/register-a-derivative#/mint-nft-register-ip-and-link-to-existing-parent-ip
    const ipMetadata: IpMetadata = client.ipAsset.generateIpMetadata({
        title: `Derivative of ${parentIp.ipId}`,
        description: 'Expanded from author outline',
        attributes: [
            {
                key: 'Content-Type',
                value: 'Prose',
            },
        ],
    })
    const nftMetadata = {
        name: `Story written from ${parentIp.ipId}`,
        description: 'This NFT represents a derivative from the original author outline',
        text: prose.choices[0].message.content,
    }
    const ipIpfsHash = await uploadJSONToIPFS(ipMetadata)
    const ipHash = createHash('sha256').update(JSON.stringify(ipMetadata)).digest('hex')
    const nftIpfsHash = await uploadJSONToIPFS(nftMetadata)
    const nftHash = createHash('sha256').update(JSON.stringify(nftMetadata)).digest('hex')

    const childIp = await client.ipAsset.
    mintAndRegisterIpAndMakeDerivative({
        spgNftContract: SPGNFTContractAddress,
        allowDuplicates: true,
        derivData: {
            parentIpIds: [parentIp.ipId as Address],
            licenseTermsIds: parentIp.licenseTermsIds as bigint[],
            maxMintingFee: 0,
            maxRts: 100_000_000,
            maxRevenueShare: 100,
        },
        // NOTE: The below metadata is not configured properly. It is just to make things simple.
        // See `simpleMintAndRegister.ts` for a proper example.
        ipMetadata: {
            ipMetadataURI: `https://ipfs.io/ipfs/${ipIpfsHash}`,
            ipMetadataHash: `0x${ipHash}`,
            nftMetadataURI: `https://ipfs.io/ipfs/${nftIpfsHash}`,
            nftMetadataHash: `0x${nftHash}`,
        },
        txOptions: { waitForTransaction: true },
    })
    console.log(`Derivative IPA created and linked at transaction hash ${childIp.txHash}, IPA ID: ${childIp.ipId}}`)

    // 3. Pay Royalty
    //
    // Docs: https://docs.story.foundation/docs/pay-ipa
    const payRoyalty = await client.royalty.payRoyaltyOnBehalf({
        receiverIpId: childIp.ipId as Address,
        payerIpId: zeroAddress,
        token: WIP_TOKEN_ADDRESS,
        amount: 2,
        txOptions: { waitForTransaction: true },
    })
    console.log(`Paid royalty at transaction hash ${payRoyalty.txHash}`)

    // 4. Child Claim Revenue
    //
    // Docs: https://docs.story.foundation/docs/claim-revenue
    const childClaimRevenue = await client.royalty.claimAllRevenue({
        ancestorIpId: childIp.ipId as Address,
        claimer: childIp.ipId as Address,
        childIpIds: [],
        royaltyPolicies: [],
        currencyTokens: [WIP_TOKEN_ADDRESS],
    })
    console.log('Child claimed revenue:')
    console.dir(childClaimRevenue.claimedTokens)

    // 5. Parent Claim Revenue
    //
    // Docs: https://docs.story.foundation/docs/claim-revenue
    const parentClaimRevenue = await client.royalty.claimAllRevenue({
        ancestorIpId: parentIp.ipId as Address,
        claimer: parentIp.ipId as Address,
        childIpIds: [childIp.ipId as Address],
        royaltyPolicies: [RoyaltyPolicyLAP],
        currencyTokens: [WIP_TOKEN_ADDRESS],
    })
    console.log('Parent claimed revenue:')
    console.dir(parentClaimRevenue.claimedTokens)
}