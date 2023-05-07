import React, { useState, useEffect } from 'react';


const SoundComparison = () => {
  const [buffer1, setBuffer1] = useState(null);
  const [buffer2, setBuffer2] = useState(null);
  const [similarity, setSimilarity] = useState(null);

  const loadAudio = async (audioFile) => {
    const response = await fetch(audioFile);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await new AudioContext().decodeAudioData(arrayBuffer);
    return audioBuffer;
  };

  const compareAudio = () => {
    if (buffer1 && buffer2) {
      const rms1 = calculateRMS(buffer1.getChannelData(0));
      const rms2 = calculateRMS(buffer2.getChannelData(0));
      const similarity = Math.abs(rms1 - rms2) < 0.0001 ? 1 : 0;
      setSimilarity(similarity);
    }
  };

  const calculateRMS = (data) => {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i] * data[i];
    }
    const mean = sum / data.length;
    const rms = Math.sqrt(mean);
    return rms;
  };

  const handleInputFileChange = async (event, setBuffer) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const audioBuffer = await loadAudio(url);
    setBuffer(audioBuffer);
    downloadSound(file);
  };

  const downloadSound = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    await fetch('/upload', {
      method: 'POST',
      body: formData,
    });
  };

  useEffect(() => {
    compareAudio();
  }, [buffer1, buffer2]);

  return (
    <div className="sound-comparison-container">
      <h2 className="sound-comparison-title">Sound Comparison</h2>
      <div className="sound-comparison-input-container">
        <label htmlFor="file1" className="sound-comparison-label">
          Select Sound 1:
        </label>
        <input type="file" id="file1" className='btn btn-light my-3' accept="audio/*" onChange={(event) => handleInputFileChange(event, setBuffer1)} />
      </div>
      <div className="sound-comparison-input-container">
        <label htmlFor="file2" className="sound-comparison-label">
          Select Sound 2:
        </label>
        <input type="file" id="file2" className='btn btn-light my-3' accept="audio/*" onChange={(event) => handleInputFileChange(event, setBuffer2)} />
      </div>
      <div className="sound-comparison-similarity-container">
        <p className="sound-comparison-similarity-label">Similarity:{similarity}</p>
        <div className="sound-comparison-similarity-indicator" style={{ backgroundColor: similarity === 1 ? '#4CAF50' : '#F44336' }}></div>
      </div>
    </div>
  );
};

export default SoundComparison;


