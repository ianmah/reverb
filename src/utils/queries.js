import { gql } from '@apollo/client'

const MediaFields = gql`
  fragment MediaFields on Media {
    url
    mimeType
    }
`

const ProfileFields = gql`
  fragment ProfileFields on Profile {
    id
    name
    bio
    attributes {
      displayType
      traitType
      key
      value
    }
    metadata
    isDefault
    handle
    isFollowing
    isFollowedByMe
    picture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
      }
      ... on MediaSet {
        original {
          ...MediaFields
        }
        small {
          ...MediaFields
        }
        medium {
          ...MediaFields
        }
      }
    }
    coverPicture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
      }
      ... on MediaSet {
        original {
          ...MediaFields
        }
        small {
        ...MediaFields
        }
        medium {
          ...MediaFields
        }
      }
    }
    ownedBy
    dispatcher {
      address
    }
    stats {
      totalFollowers
      totalFollowing
      totalPosts
      totalComments
      totalMirrors
      totalPublications
      totalCollects
    }
    followModule {
      ... on FeeFollowModuleSettings {
        type
        amount {
          asset {
            name
            symbol
            decimals
            address
          }
          value
        }
        recipient
      }
      ... on ProfileFollowModuleSettings {
        type
      }
      ... on RevertFollowModuleSettings {
        type
      }
    }
  }
  ${MediaFields}
`

const MetadataOutputFields = gql`
  fragment MetadataOutputFields on MetadataOutput {
    name
    description
    content
    media {
      original {
        ...MediaFields
      }
      small {
        ...MediaFields
      }
      medium {
        ...MediaFields
      }
    }
    attributes {
      displayType
      traitType
      value
    }
    cover {
      original {
        url
      }
    }
  }
`

const CollectModuleFields = gql`
  fragment CollectModuleFields on CollectModule {
    __typename
    ... on FreeCollectModuleSettings {
      type
      followerOnly
      contractAddress
    }
    ... on FeeCollectModuleSettings {
      type
      amount {
        asset {
          ...Erc20Fields
        }
        value
      }
      recipient
      referralFee
    }
    ... on LimitedFeeCollectModuleSettings {
      type
      collectLimit
      amount {
        asset {
          ...Erc20Fields
        }
        value
      }
      recipient
      referralFee
    }
    ... on LimitedTimedFeeCollectModuleSettings {
      type
      collectLimit
      amount {
        asset {
          ...Erc20Fields
        }
        value
      }
      recipient
      referralFee
      endTimestamp
    }
    ... on RevertCollectModuleSettings {
      type
    }
    ... on TimedFeeCollectModuleSettings {
      type
      amount {
        asset {
          ...Erc20Fields
        }
        value
      }
      recipient
      referralFee
      endTimestamp
    }
  }
`

const PublicationStatsFields = gql`
  fragment PublicationStatsFields on PublicationStats { 
    totalAmountOfMirrors
    totalAmountOfCollects
    totalAmountOfComments
    totalDownvotes
    totalUpvotes
  }
`

const WalletFields = gql`
fragment WalletFields on Wallet {
  address,
  defaultProfile {
   ...ProfileFields
  }
}
`

const PostFields = gql`
  fragment PostFields on Post {
    id
    profile {
      ...ProfileFields
    }
    reaction(request: $reactionRequest)
    collectedBy {
      ...WalletFields
    }
    stats {
      ...PublicationStatsFields
    }
    metadata {
      ...MetadataOutputFields
    }
    createdAt
    hasCollectedByMe
    collectModule {
      ...CollectModuleFields
    }
    referenceModule {
      ... on FollowOnlyReferenceModuleSettings {
        type
      }
    }
    appId
  }
  ${ProfileFields}
  ${WalletFields}
  ${MetadataOutputFields}
  ${CollectModuleFields}
  ${PublicationStatsFields}
`

const CommentFields = gql`
  fragment CommentFields on Comment {
    ...CommentBaseFields
    reaction(request: $reactionRequest)
    hasCollectedByMe
    collectedBy {
      ...WalletFields
    }
    mainPost {
      ... on Post {
        ...PostFields
      }
      ... on Mirror {
        ...MirrorBaseFields
        mirrorOf {
          ... on Post {
            ...PostFields          
          }
          ... on Comment {
            ...CommentMirrorOfFields        
          }
        }
      }
    }
  }
  ${WalletFields}
`

const MirrorBaseFields = gql`
  fragment MirrorBaseFields on Mirror {
    id
    profile {
      ...ProfileFields
    }
    reaction(request: $reactionRequest)
    stats {
      ...PublicationStatsFields
    }
    metadata {
      ...MetadataOutputFields
    }
    createdAt
    collectModule {
      ...CollectModuleFields
    }
    referenceModule {
      ... on FollowOnlyReferenceModuleSettings {
        type
      }
    }
    appId
  }
`

const MirrorFields = gql`
  fragment MirrorFields on Mirror {
    ...MirrorBaseFields
    mirrorOf {
      ... on Post {
        ...PostFields          
    }
    ... on Comment {
        ...CommentFields          
    }
    }
  }
`

const Erc20Fields = gql`
  fragment Erc20Fields on Erc20 {
    name
    symbol
    decimals
    address
  }
`

const CommentBaseFields = gql`
  fragment CommentBaseFields on Comment {
    id
    profile {
      ...ProfileFields
    }
    reaction(request: $reactionRequest)
    stats {
      ...PublicationStatsFields
    }
    metadata {
      ...MetadataOutputFields
    }
    createdAt
    collectModule {
      ...CollectModuleFields
    }
    referenceModule {
      ... on FollowOnlyReferenceModuleSettings {
        type
      }
    }
    appId
}
`

const CommentMirrorOfFields = gql`
  fragment CommentMirrorOfFields on Comment {
    ...CommentBaseFields
    mainPost {
      ... on Post {
        ...PostFields
      }
      ... on Mirror {
        ...MirrorBaseFields
      }
    }
  }
`

export const EXPLORE_PUBLICATIONS = gql`
query(
  $request: ExplorePublicationRequest!
  $reactionRequest: ReactionFieldResolverRequest
  ) {
  explorePublications(request: $request) {
    items {
      __typename 
      ... on Post {
        ...PostFields
      }
      ... on Comment {
        ...CommentFields
      }
      ... on Mirror {
        ...MirrorFields
      }
    }
    pageInfo {
      prev
      next
      totalCount
    }
  }
}
${MediaFields}
${ProfileFields}
${PublicationStatsFields}
${MetadataOutputFields}
${Erc20Fields}
${CollectModuleFields}
${PostFields}
${MirrorBaseFields}
${MirrorFields}
${CommentBaseFields}
${CommentFields}
${CommentMirrorOfFields}
`;

export const SEARCH = gql`
  query($request: SearchQueryRequest!) {
    search(request: $request) {
      ... on PublicationSearchResult {
      __typename 
      items {
        __typename 
        ... on Comment {
          ...CommentFields
        }
        ... on Post {
          ...PostFields
        }
      }
      pageInfo {
        prev
        totalCount
        next
      }
    }
    ... on ProfileSearchResult {
      __typename 
      items {
        ... on Profile {
          ...ProfileFields
        }
      }
      pageInfo {
        prev
        totalCount
        next
      }
    }
    }
  }
  ${MediaFields}
  ${MirrorBaseFields}
  ${ProfileFields}
  ${PublicationStatsFields}
  ${MetadataOutputFields}
  ${Erc20Fields}
  ${CollectModuleFields}
  ${PostFields}
  ${CommentFields}
  ${CommentMirrorOfFields}
`;

export const GET_TIMELINE = gql`
query(
  $request: TimelineRequest!
  $reactionRequest: ReactionFieldResolverRequest
  ) {
  timeline(request: $request) {
    items {
      __typename 
      ... on Post {
        ...PostFields
      }
      ... on Comment {
        ...CommentFields
      }
      ... on Mirror {
        ...MirrorFields
      }
    }
    pageInfo {
      prev
      next
      totalCount
    }
  }
}
${MediaFields}
${ProfileFields}
${PublicationStatsFields}
${MetadataOutputFields}
${Erc20Fields}
${CollectModuleFields}
${PostFields}
${MirrorBaseFields}
${MirrorFields}
${CommentBaseFields}
${CommentFields}
${CommentMirrorOfFields}
`;

export const GET_PROFILES = gql`
  query($request: ProfileQueryRequest!) {
    profiles(request: $request) {
      items {
        ... on Profile {
          ...ProfileFields
        }
      }
      pageInfo {
        prev
        next
        totalCount
      }
    }
  }
  ${ProfileFields}
`;

export const CREATE_POST_TYPED_DATA = gql`
  mutation($request: CreatePublicPostRequest!) { 
    createPostTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          PostWithSig {
            name
            type
          }
        }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        deadline
        profileId
        contentURI
        collectModule
        collectModuleInitData
        referenceModule
        referenceModuleInitData
      }
    }
  }
}
`;

export const BROADCAST = gql`
  mutation Broadcast($request: BroadcastRequest!) {
    broadcast(request: $request) {
      ... on RelayerResult {
        txHash
      }
      ... on RelayError {
    reason }
    }
  }
`

export const GET_PUBLICATION = gql`
  query(
    $request: PublicationQueryRequest!
    $reactionRequest: ReactionFieldResolverRequest
  ) {
    publication(request: $request) {
        __typename 
        ... on Post {
          ...PostFields
        }
        ... on Comment {
          ...CommentFields
        }
        ... on Mirror {
          ...MirrorFields
      }
    }
  }
  ${MediaFields}
  ${ProfileFields}
  ${PublicationStatsFields}
  ${MetadataOutputFields}
  ${Erc20Fields}
  ${CollectModuleFields}
  ${PostFields}
  ${MirrorBaseFields}
  ${MirrorFields}
  ${CommentBaseFields}
  ${CommentFields}
  ${CommentMirrorOfFields}
`;

export const GET_PUBLICATIONS = gql`
  query(
    $request: PublicationsQueryRequest!
    $reactionRequest: ReactionFieldResolverRequest
  ) {
    publications(request: $request) {
      items {
        __typename 
        ... on Post {
          ...PostFields
        }
        ... on Comment {
          ...CommentFields
        }
        ... on Mirror {
          ...MirrorFields
        }
      }
      pageInfo {
        prev
        next
        totalCount
      }
    }
  }
  ${MediaFields}
  ${ProfileFields}
  ${PublicationStatsFields}
  ${MetadataOutputFields}
  ${Erc20Fields}
  ${CollectModuleFields}
  ${PostFields}
  ${MirrorBaseFields}
  ${MirrorFields}
  ${CommentBaseFields}
  ${CommentFields}
  ${CommentMirrorOfFields}
`;


export const GET_FOLLOWING = gql`
  query($request: FollowingRequest!) {
    following(request: $request) { 
          items {
            profile {
              id
              name
              bio
              attributes {
                displayType
                traitType
                key
                value
              }
              metadata
              isDefault
              isFollowedByMe
              isFollowing
              handle
              picture {
                ... on NftImage {
                  contractAddress
                  tokenId
                  uri
                  verified
                }
                ... on MediaSet {
                  original {
                    url
                    width
                    height
                    mimeType
                  }
                  medium {
                    url
                    width
                    height
                    mimeType
                  }
                  small {
                    url
                    width
                    height
                    mimeType
                  }
                }
              }
              coverPicture {
                ... on NftImage {
                  contractAddress
                  tokenId
                  uri
                  verified
                }
                ... on MediaSet {
                  original {
                    url
                    width
                    height
                    mimeType
                  }
                  small {
                    width
                    url
                    height
                    mimeType
                  }
                  medium {
                    url
                    width
                    height
                    mimeType
                  }
                }
              }
              ownedBy
              dispatcher {
                address
                canUseRelay
              }
              stats {
                totalFollowers
                totalFollowing
                totalPosts
                totalComments
                totalMirrors
                totalPublications
                totalCollects
              }
              followModule {
                ... on FeeFollowModuleSettings {
                  type
                  amount {
                    asset {
                      name
                      symbol
                      decimals
                      address
                    }
                    value
                  }
                  recipient
                }
                ... on ProfileFollowModuleSettings {
                  type
                }
                ... on RevertFollowModuleSettings {
                  type
                }
            }
          }
          totalAmountOfTimesFollowing
        }
      pageInfo {
          prev
          next
          totalCount
      }
    }
  }
`;

export const CREATE_PROFILE = gql`
  mutation($request: CreateProfileRequest!) { 
    createProfile(request: $request) {
      ... on RelayerResult {
        txHash
      }
      ... on RelayError {
        reason
      }
			__typename
    }
 }
`;

export const MODULE_APPROVAL_DATA = gql`
  query($request: GenerateModuleCurrencyApprovalDataRequest!) {
    generateModuleCurrencyApprovalData(request: $request) {
      to
      from
      data
    }
  }
`

export const CREATE_FOLLOW_TYPED_DATA = gql`
  mutation($request: FollowRequest!) { 
    createFollowTypedData(request: $request) {
      id
      expiresAt
      typedData {
        domain {
          name
          chainId
          version
          verifyingContract
        }
        types {
          FollowWithSig {
            name
            type
          }
        }
        value {
          nonce
          deadline
          profileIds
          datas
        }
      }
    }
 }
`;

export const CREATE_UNFOLLOW_TYPED_DATA = gql`
  mutation($request: UnfollowRequest!) { 
    createUnfollowTypedData(request: $request) {
      id
      expiresAt
      typedData {
        domain {
          name
          chainId
          version
          verifyingContract
        }
        types {
          BurnWithSig {
            name
            type
          }
        }
        value {
          nonce
          deadline
          tokenId
        }
      }
    }
 }
`;

export const CREATE_MIRROR_TYPED_DATA = gql`
mutation($request: CreateMirrorRequest!) { 
  createMirrorTypedData(request: $request) {
    id
    expiresAt
    typedData {
      types {
        MirrorWithSig {
          name
          type
        }
      }
    domain {
      name
      chainId
      version
      verifyingContract
    }
    value {
      nonce
      deadline
      profileId
      profileIdPointed
      pubIdPointed
      referenceModuleData
      referenceModule
      referenceModuleInitData
    }
   }
 }
}
`;

export const CREATE_COLLECT_TYPED_DATA = gql`
  mutation($request: CreateCollectRequest!) { 
    createCollectTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          CollectWithSig {
            name
            type
          }
        }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        deadline
        profileId
        pubId
        data
      }
     }
   }
 }
`;

export const CREATE_COMMENT_TYPED_DATA = gql`
mutation($request: CreatePublicCommentRequest!) { 
  createCommentTypedData(request: $request) {
    id
    expiresAt
    typedData {
      types {
        CommentWithSig {
          name
          type
        }
      }
    domain {
      name
      chainId
      version
      verifyingContract
    }
    value {
      nonce
      deadline
      profileId
      profileIdPointed
      pubIdPointed
      contentURI
      collectModule
      collectModuleInitData
      referenceModule
      referenceModuleInitData
      referenceModuleData
    }
   }
 }
}
`;

export const GET_CHALLENGE = gql`
  query($request: ChallengeRequest!) {
    challenge(request: $request) { text }
  }
`;

export const AUTHENTICATION = gql`
  mutation($request: SignedAuthChallenge!) { 
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
 }
`;

export const HAS_TX_BEEN_INDEXED = gql`
  query($request: HasTxHashBeenIndexedRequest!) {
    hasTxHashBeenIndexed(request: $request) { 
	    ... on TransactionIndexedResult {
            indexed
            txReceipt {
                to
                from
                contractAddress
                transactionIndex
                root
                gasUsed
                logsBloom
                blockHash
                transactionHash
                blockNumber
                confirmations
                cumulativeGasUsed
                effectiveGasPrice
                byzantium
                type
                status
                logs {
                    blockNumber
                    blockHash
                    transactionIndex
                    removed
                    address
                    data
                    topics
                    transactionHash
                    logIndex
                }
            }
            metadataStatus {
              status
              reason
            }
        }
        ... on TransactionError {
            reason
            txReceipt {
                to
                from
                contractAddress
                transactionIndex
                root
                gasUsed
                logsBloom
                blockHash
                transactionHash
                blockNumber
                confirmations
                cumulativeGasUsed
                effectiveGasPrice
                byzantium
                type
                status
                logs {
                    blockNumber
                    blockHash
                    transactionIndex
                    removed
                    address
                    data
                    topics
                    transactionHash
                    logIndex
             }
            }
        },
        __typename
    }
  }
`;

export const ADD_REACTION_MUTATION = gql`
  mutation AddReaction($request: ReactionRequest!) {
    addReaction(request: $request)
  }
`

export const REMOVE_REACTION_MUTATION = gql`
  mutation RemoveReaction($request: ReactionRequest!) {
    removeReaction(request: $request)
  }
`