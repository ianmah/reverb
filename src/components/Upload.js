import { useState, useRef } from 'react';
import styled from 'styled-components'
import axios from 'axios';
import Button from './Button';
require("dotenv").config();

const FileInput = styled.input`
    opacity: 0;
    width: 0.1px;
    height: 0.1px;
    position: absolute;
`
const InputWrapper = styled.div`
    float: right;
`
const CustomLabel = styled.label`
    border: none;
    border-radius: 6px;
    padding: 0.6em 2em;
    display: inline-block;
    font-family: ${p => p.theme.font};
    font-weight: 500;
    font-size: 0.8em;
    color: ${p => p.theme.textLight};
    background: ${p => p.theme.primary};
    letter-spacing: 0.02em;
    transition: all 100ms;
    :hover {
        background: ${p => p.theme.primaryHover};
        cursor: pointer;
    }
    :focus {
        box-shadow: 0px 2px 2px -1px rgba(0, 0, 0, 0.12), 0px 0px 0px 3px #D25D38;
        outline: none;
    }
`

function Upload() {
    // Uploading Video
    const [videoUploading, setVideoUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState("");
    const [video, setVideo] = useState("")
    const [videoNftMetadata, setVideoNftMetadata] = useState({})
    const fs = require('fs')

    const videoUpload = async () => {
        setVideoUploading(true)
        const formData = new FormData();
        console.log(selectedFile)
        formData.append(
            "fileName",
            selectedFile,
            selectedFile.name
        );

        const uploadResponse = await fetch("https://livepeer.studio/api/asset/request-upload", {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_LP_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: "Example name",
                }),
            }
        );
        console.log("Grabbing upload link")
        const uploadData = await uploadResponse.json();
        console.log("Upload Data", uploadData);

        console.log("Uploading to Livepeer")
        const videoResponse = await fetch(uploadData.url, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_LP_API_KEY}`,
                    "Content-Type": "video/mp4",
                },
                body: selectedFile
        });
        console.log("Video Response", videoResponse)
        const videoData = await videoResponse.json()
        console.log("Video Data", videoData);

        // console.log("The nftmetadataURL ", data["nftMetadataGatewayUrl"])

        // Get metadata from livepeer
        // const responseVidNftMetadata = await fetch(data["nftMetadataGatewayUrl"], { method: "GET" });
        // const vidNftData = await responseVidNftMetadata.json();

        // setVideoNftMetadata(vidNftData)
        // console.log("VideoNFTMetaData :", vidNftData)

        setVideoUploading(false)


        // console.log(data);
        // const ipfs = await fetch(`https://ipfs.io/${data.data.replace(":", "")}`);
        // const nftMetadata = await ipfs.json()
        // console.log(nftMetadata);
        // setVideo(`https://ipfs.io/${nftMetadata.properties.video.replace(":", "")}`)

    }
    
    return (
        <>
            <InputWrapper>
                {selectedFile ? <>
                    {selectedFile.name}  <Button onClick={videoUpload}>Upload</Button>
                </>
                    : <div className="file-input">
                        <FileInput type="file" id="file" className="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
                        <CustomLabel htmlFor="file">Select Video</CustomLabel>
                    </div>}
            </InputWrapper>
        </>
    )
}

export default Upload