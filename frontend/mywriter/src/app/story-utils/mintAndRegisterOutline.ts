import { IpMetadata, LicenseTerms } from "@story-protocol/core-sdk";
import { SPGNFTContractAddress, client, createCommercialRemixTerms, defaultLicensingConfig } from "./utils";
import { uploadJSONToIPFS } from "./uploadToIpfs";
import { createHash } from "crypto";

/* 
Given a Request object that contains a writer's outline,
Writer's outline should also include the original reader idea.
Make the outline a Minted and Registered NFT.
*/
export async function mintAndRegisterOutline(responseData: Response) {
  const chatResponseData = await responseData.json();
  // 1. Set up your IP Metadata
  //
  // Docs: https://docs.story.foundation/docs/ipa-metadata-standard
  const ipMetadata: IpMetadata = client.ipAsset.generateIpMetadata({
    title: chatResponseData.id,
    description: "User-provided plot, characters, or world-building details, outlined by an author",
    attributes: [
      {
        key: "Content-Type",
        value: "Idea Outline",
      },
    ],
  });

  // 2. Set up your NFT Metadata
  //
  // Docs: https://eips.ethereum.org/EIPS/eip-721
  const nftMetadata = {
    name: "Storyline NFT",
    description: "This NFT represents ownership of a storyboard outline",
    text: chatResponseData.choices[0].message.content,
  };

  // 3. Upload your IP and NFT Metadata to IPFS
  const ipIpfsHash = await uploadJSONToIPFS(ipMetadata);
  const ipHash = createHash("sha256")
    .update(JSON.stringify(ipMetadata))
    .digest("hex");
  const nftIpfsHash = await uploadJSONToIPFS(nftMetadata);
  const nftHash = createHash("sha256")
    .update(JSON.stringify(nftMetadata))
    .digest("hex");

  // 4. Register the NFT as an IP Asset
  //
  // Docs: https://docs.story.foundation/docs/attach-terms-to-an-ip-asset#mint-nft-register-as-ip-asset-and-attach-terms
  const response = await client.ipAsset.mintAndRegisterIpAssetWithPilTerms({
    spgNftContract: SPGNFTContractAddress,
    licenseTermsData: [createCommercialRemixTerms(
        {commercialRevShare: 50, defaultMintingFee: 0}),
        , defaultLicensingConfig], // IP already has non-commercial social remixing terms. You can add more here.
    // set to true to mint ip with same nft metadata
    allowDuplicates: true,
    ipMetadata: {
      ipMetadataURI: `https://ipfs.io/ipfs/${ipIpfsHash}`,
      ipMetadataHash: `0x${ipHash}`,
      nftMetadataURI: `https://ipfs.io/ipfs/${nftIpfsHash}`,
      nftMetadataHash: `0x${nftHash}`,
    },
    txOptions: { waitForTransaction: true },
  });
  console.log(
    `Root IPA created at transaction hash ${response.txHash}, IPA ID: ${response.ipId}`
  );
  console.log(
    `View on the explorer: https://explorer.story.foundation/ipa/${response.ipId}`
  );
  console.log(typeof response);
  return response;
}
