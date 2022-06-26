import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useLazyQuery, useMutation } from '@apollo/client'
import { useWallet } from '../utils/wallet'
import Button from '../components/Button'
import Upload from '../components/Upload'
import { sleep } from '../utils'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlayCircle, faPauseCircle, faStepBackward, faStepForward, faHeart, faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


library.add(faPlayCircle, faPauseCircle, faStepForward, faHeart, faStepBackward, faFolderPlus)

const Container = styled.div`
    max-width: 420px;
    margin: auto;
    margin-bottom: 6em;
`

const Label = styled.label`
    display: block;
`

const Video = styled.video`
    margin-top: -3em;
    width: 412px;
    max-width: 500px;
    height: 170vw;
    max-height: 700px;
    box-sizing: border-box;
`

const Icon = styled(FontAwesomeIcon)`
    transition: all 100ms;
    &:hover {
        color: ${p=>p.theme.primary};
        cursor: pointer;
        transform: scale(1.1);
    }
`

const Info = styled.div`
    background: linear-gradient(0deg, rgba(2,0,36,0.8) 0%, rgba(47,26,59,0.8) 64%, rgba(0,0,0,0) 100%);
    margin: auto;
    border-radius: 1em;
    padding: 3em;
    width: 90vw;
    max-width: 410px;
    box-sizing: border-box;
    justify-content: space-evenly;
    align-items: center;
    padding-top: 5em;
    position: absolute;
    margin-top: -12em;
    z-index: 30000;
    height: 14em;
    h2 {
        margin: 0;
    }
    p {
        margin: 0;
        margin-bottom: 1em;
    }
`
const Controls = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`

function Song({ ...props }) {
    const { wallet } = useWallet()
    const params = useParams()
    const [paused, setPaused] = useState(false)
 
    const videoRef = useRef('')

    useEffect(() => {
        const playVid = async () => {
            await sleep(1000)
            videoRef?.current.play()
            console.log('playing', videoRef?.current)
        }
        playVid()
    }, [])

    console.log(params)

    return <Container>
        <Video ref={videoRef} src={'https://livepeercdn.com/asset/92fd2hv0htxd5868/video'} autoplay loop/>
        <Info>
            <h2>City of Gods</h2>
            <p>Alicia Keys, Fivio Foreign, and Ye</p>
            <Controls>
                <Icon icon="fa-heart" size="lg" />
                <Icon icon="fa-step-backward" size="2x" />
                {paused && <Icon icon="fa-circle-play" size="3x" onClick={() => {
                    videoRef?.current.paused ? videoRef?.current.play() : videoRef?.current.pause()
                    setPaused(!paused)
                }}/>}
                {!paused && <Icon icon="fa-circle-pause" size="3x" onClick={() => {
                    videoRef?.current.paused ? videoRef?.current.play() : videoRef?.current.pause()
                    setPaused(!paused)
                }}/>}
                <Icon icon="fa-step-forward" size="2x" />
                <Icon icon="fa-folder-plus" size="lg" />
            </Controls>
        </Info>
    </Container>;

}

export default Song