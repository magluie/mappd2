import React, { Fragment, useState, useEffect } from 'react';
import '../index.css';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-EN'

function Advicebox (){
    const [isListening, setIsListening] = useState(false)
    const [note,setNote] = useState(null)
    const [savedNotes, setSavedNotes] = useState([])

    useEffect(() => {
        handleListen()
    }, [isListening])

    const handleListen = () => {
        if(isListening) {
            mic.start()
            mic.onend = () => {
                console.log('continue...')
                mic.start()
            }
        } else{
            mic.stop()
            mic.onend = () =>{
                console.log('stop')
            }
        }
        mic.onstart = ()=>{
            console.log('Recording...')
        }
        mic.onresult = event => {
            const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')
            console.log(transcript)
            setNote(transcript)
            mic.onerror = event =>{
                console.log(event.error)
            }
        }
    }

    const handleSaveNote = () => {
        setSavedNotes([...savedNotes, note])
        setNote('')
    }

    return (
        <Fragment>
        <h1>Advice/Stories shares here</h1>
        <div className='advicecontainer'>
            <div className = 'rectangle'>
                <h2>Current Note</h2>
                {isListening ? <span className='status'>Status: Recording</span> :<span className='status'>Status: Off</span>}
                <div className='buttonfornotes'>
                <button onClick = {handleSaveNote} disabled={!note}>Save Note</button>
                <button onClick = {() => setIsListening(prevState => !prevState)}>Start/Stop</button>
                </div>
                <p>{note}</p>
            </div>
        <div className='box2'>
          <h2>Notes</h2>
          {savedNotes.map(n => (
              <p key={n}>{n}</p>
          ))}
        </div>
      </div>
      </Fragment>
    );
}

export default Advicebox;