import { useState, useRef, useEffect } from 'react';
import useInterval from '@use-it/interval';
import styled from 'styled-components'
import Button from './Button';
import { sleep } from '../utils'
require("dotenv").config();

const FileInput = styled.input`
    opacity: 0;
    width: 0.1px;
    height: 0.1px;
    position: absolute;
`
const InputWrapper = styled.div`

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
const fs = require('fs')

const Video = styled.video`
    width: 75vw;
    max-width: 370px;
    height: 100vw;
    max-height: 600px;
`

function Upload({ setVideoUrl }) {
    // Uploading Video
    const [videoUploading, setVideoUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState("");
    const [video, setVideo] = useState("")
    const [showPlayer, setShowPlayer] = useState(false)
    const [playbackId, setPlaybackId] = useState("")
    const [taskId, setTaskId] = useState("")
    const [finishedUpload, setFinishedUpload] = useState(false)

    const videoUpload = async () => {
        setVideoUploading(true)
        console.log(selectedFile)

        const linkResponse = await fetch("https://livepeer.studio/api/asset/request-upload", {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_LP_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: selectedFile.name,
            }),
        });
        console.log("Grabbing upload link")
        const linkData = await linkResponse.json();
        console.log("Link Data", linkData);
        setTaskId(linkData.task.id)
        setPlaybackId(linkData.asset.playbackId)
        setVideoUrl(linkData.asset.playbackId)

        console.log("Uploading to Livepeer")
        const uploadResponse = await fetch(linkData.url, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_LP_API_KEY}`,
                "Content-Type": "video/mp4",
            },
            body: selectedFile
        });

        // const uploadData = await uploadResponse.json()
        // console.log("Upload Response", uploadData)
        console.log("Upload Response", uploadResponse)
        console.log("Uploaded to Livepeer")

        setShowPlayer(true)
        setVideoUploading(false)
        setSelectedFile("")
    }

    useInterval(async () => {
        if (taskId) {
            const taskResponse = await fetch(`https://livepeer.studio/api/task/${taskId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_LP_API_KEY}`,
                },
            })
            const taskData = await taskResponse.json()
    
            if (taskData.status.phase == "completed") {
                setFinishedUpload(true)
                return
            }
        }

    }, finishedUpload ? null : 1000)
    
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
            <br/>
            {showPlayer && playbackId && finishedUpload && 
                <Video src={`https://livepeercdn.com/asset/${playbackId}/video`} controls autoplay loop/>
            }
            
        </>
    )
}

export default Upload