// pages/index.js
import { useState, useRef } from 'react';

const RecordAudio = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const mediaRecorder = useRef(null);

  const handleStartRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorder.current = new MediaRecorder(stream);

        mediaRecorder.current.ondataavailable = (e) => {
          if (e.data.size > 0) {
            setRecordedChunks((prev) => [...prev, e.data]);
          }
        };

        mediaRecorder.current.onstop = () => {
          const audioBlob = new Blob(recordedChunks, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          console.log(audioUrl); // You can use this URL as needed
        };

        mediaRecorder.current.start();
        setIsRecording(true);
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error);
      });
  };

  const handleStopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div>
      <h1>Voice Recorder App</h1>
      <button onClick={isRecording ? handleStopRecording : handleStartRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <audio controls>
            <source src={`data:audio/mp3;base64,`} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
    </div>
  );
};

export default RecordAudio;
