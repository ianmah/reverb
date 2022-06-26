import { useEffect, useState } from 'react'
import styled from 'styled-components'
import ReactAudioPlayer from 'react-audio-player';

const Card = styled.div`
    background: #fff;
    box-shadow: 0px 4px 12px rgba(236, 176, 178, 0.8);
    border-radius: 18px;
    box-sizing: border-box;
    padding: ${p => p.padding || '1em'};
    width: 100%;
    @media (max-width: 768px) {
        padding: 0.75em;
        overflow-wrap: break-word;
        word-wrap: break-word;
        word-break: break-word;
        hyphens: auto;
    }
    
`

const StyledCard = styled(Card)`
    width: 100%;
    display: inline-block;
    margin-bottom: 1em;
`

const TextArea = styled.textarea`
    border: none;
    border-radius: 6px;
    font-family: ${p => p.theme.font};
    overflow: auto;
    outline: none;
    padding: 0.3em;
    margin-bottom: 0.4em;
  
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  
    resize: none; /*remove the resize handle on the bottom right*/
    box-sizing: border-box;
    resize: none;
    font-size: 1em;
    height: ${p => p.height || 3}em;
    width: 100%;
    padding-bottom: 1em;
    color: #000;
    transition: all 100ms ease-in-out;
    &:focus {
        background: ${p => p.theme.darken2};
    }
`

const Label = styled.label`
    display: block;
`

const Actions = styled.div`
    display: flex;
    align-items: center;
`

const FileInput = styled.input`
`

function NewSong({ ...props }) {
    // const { wallet } = useWallet()

    var a;

    const [buttonName, setButtonName] = useState("Play");

    const [audio, setAudio] = useState();
    const [image, setImage] = useState();
  
    useEffect(() => {
      if (a) {
        a.pause();
        a = null;
        setButtonName("Play");
      }
      if (audio) {
        a = new Audio(audio);
        a.onended = () => {
          setButtonName("Play");
        };
      }
    }, [audio]);
  
    const handleClick = () => {
      if (buttonName === "Play") {
        a.play();
        setButtonName("Pause");
      } else {
        a.pause();
        setButtonName("Play");
      }
    };
  
    const addSong = (e) => {
      if (e.target.files[0]) {
        setAudio(URL.createObjectURL(e.target.files[0]));
      }
    };

    const addImage = (e) => {
        if (e.target.files[0]) {
          setImage(URL.createObjectURL(e.target.files[0]));
        }
      };

    return <>
    <StyledCard>
      <button onClick={handleClick}>{buttonName}</button>
      <ReactAudioPlayer
        src={audio}
        autoplay={false}
        controls={false}
        />
      <FileInput type="file" onChange={addSong} />
      <FileInput type="file" onChange={addImage} />
      <img alt="not fount" width={"250px"} src={image} />
    </StyledCard>
</>
}

export default NewSong