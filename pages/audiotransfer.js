import React, { useEffect, useState } from 'react'
import { useAudioRecorder } from 'react-audio-voice-recorder';


export default function Audiotransfer() {
  const [ blob, setBlob ] = useState(null);
  const {
    startRecording,
    stopRecording,
    recordingBlob,
  } = useAudioRecorder({ audioBitsPerSecond: 128000, mimeType: 'audio/wav' });

  const askVoice = () => {
    console.log("hello");
    const formData = new FormData();
    formData.append("file", blob);
    try {
      const endpoint = 'http://localhost:5000/ask-voice';
      const response = fetch(endpoint, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const responseData = response.json();
      console.log(responseData);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  useEffect(() => {
    if (!recordingBlob) return;

    // convert blob to wav file and set as file in formData 
    const reader = new FileReader();
    reader.readAsArrayBuffer(recordingBlob);
    reader.onloadend = function () {
      const wavBlob = new Blob([ reader.result ], { type: 'audio/wav' });
      setBlob(wavBlob);
    }
    // console.log(formData);

  }, [ recordingBlob ])




  return (
    <div>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <button onClick={askVoice}>Get bangala</button>
      {/* {formData.file && (
        <div>
          <audio controls>
            <source src={URL.createObjectURL(formData.file)} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )} */}
    </div>
  );
}
