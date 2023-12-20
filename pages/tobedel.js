import { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';

const PitchAdjuster = () => {
  const [audioStream, setAudioStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const startAudioProcessing = (stream) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(stream);
    
    // Create a pitch shifter
    const pitchShift = new Tone.PitchShift(12).toDestination(); // Adjust the pitch shift value as needed

    // Connect the microphone input to the pitch shifter
    source.connect(pitchShift);

    // Connect the pitch shifter to the audio context's destination (speakers)
    pitchShift.connect(audioContext.destination);

    // Start audio processing
    Tone.start();
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudioStream(stream);
      startAudioProcessing(stream);
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const handleStopRecording = () => {
    if (audioStream) {
      const tracks = audioStream.getTracks();
      tracks.forEach(track => track.stop());
      setAudioStream(null);
      setIsRecording(false);
    }
  };

  const handleDownload = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(audioStream);
    const pitchShift = new Tone.PitchShift(12).toDestination(); // Adjust the pitch shift value as needed

    source.connect(pitchShift);
    pitchShift.connect(audioContext.destination);

    const mediaRecorder = new MediaRecorder(audioContext.createMediaStreamDestination().stream);
    mediaRecorder.ondataavailable = (e) => {
      const audioBlob = new Blob([e.data], { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style = 'display: none';
      a.href = audioUrl;
      a.download = 'pitched_audio.wav';
      a.click();
      window.URL.revokeObjectURL(audioUrl);
      document.body.removeChild(a);
    };

    mediaRecorder.start();
    setTimeout(() => {
      mediaRecorder.stop();
      handleStopRecording();
    }, 5000); // Adjust the duration as needed
  };

  useEffect(() => {
    return () => {
      // Stop recording and release resources when the component is unmounted
      handleStopRecording();
    };
  }, []);

  return (
    <div>
      <h1>Audio Pitch Adjuster</h1>
      {isRecording ? (
        <button onClick={handleStopRecording}>Stop Recording</button>
      ) : (
        <button onClick={handleStartRecording}>Start Recording</button>
      )}
      {audioStream && !isRecording && (
        <button onClick={handleDownload}>Download Pitched Audio</button>
      )}
    </div>
  );
};

export default PitchAdjuster;
