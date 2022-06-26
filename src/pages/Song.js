import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useLazyQuery, useMutation } from '@apollo/client'
import { useWallet } from '../utils/wallet'
import Button from '../components/Button'
import Upload from '../components/Upload'
import { sleep } from '../utils'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlayCircle, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


library.add(faPlayCircle, faStepForward, faStepBackward)

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

const Controls = styled.div`
    background: ${p=>p.theme.lightBackground};
    margin: auto;
    border-radius: 1em;
    padding: 1em;
    display: flex;
    width: 90vw;
    max-width: 400px;
    box-sizing: border-box;
    justify-content: space-evenly;
    align-items: center;
`

function Song({ ...props }) {
    const { wallet } = useWallet()
    const params = useParams();
 
    const videoRef = useRef('')

    useEffect(() => {
        const playVid = async () => {
            await sleep(4000)
            videoRef?.current.play()
            console.log('playing', videoRef?.current)
        }
        playVid()
    }, [])

    console.log(params)

    return <Container>
        <Video ref={videoRef} src={'https://livepeercdn.com/asset/92fd2hv0htxd5868/video'} autoplay loop/>
        <Controls>
            <Icon icon="fa-step-backward" size="3x" />
            <Icon icon="fa-circle-play" size="5x" onClick={() => {
                videoRef?.current.paused ? videoRef?.current.play() : videoRef?.current.pause()
            }}/>
            <Icon icon="fa-step-forward" size="3x" />
        </Controls>
    </Container>;

}

export default Song