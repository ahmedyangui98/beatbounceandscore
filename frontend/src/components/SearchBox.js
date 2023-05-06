import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import SpeechRecognition,{ useSpeechRecognition } from "react-speech-recognition";

const SearchBox = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const { transcript, browserSupportsSpeechRecognition,resetTranscript } = useSpeechRecognition();
  const cleanTranscript = (transcript) => {
    return transcript.replace(/[^\w\s]/gi, "");
  };
  const handleCopyClick = () => {
    const transcriptText = cleanTranscript(transcript.trim());
  resetTranscript();
  setKeyword(transcriptText);
  };

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/offers");
    }
  };

  const handleCurrentPosition = () => {
    navigate("/jobs");
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder="Search offers..."
        className="mr-sm-2 ml-sm-5"
      />
      <Button
        type="button"
        variant="outline-success"
        className="p-2 position-relative left-0 top-0"
        onClick={handleCopyClick}
      >
        Speak
      </Button>
      <Button
        type="submit"
        variant="outline-success"
        className="p-2 position-relative left-0 top-0"
      >
        Search
      </Button>
      <Button
        type="button"
        variant="outline-success"
        className="p-2 position-relative left-0 top-0"
        onClick={startListening}
      >
        Start Listening
      </Button>
      <Button
        type="button"
        variant="outline-success"
        className="p-2 position-relative left-0 top-0"
        onClick={SpeechRecognition.stopListening}
      >
        Stop Listening
      </Button>

      <Button
        type="button"
        variant="outline-success"
        className="p-2 position-relative left-0 top-0"
        onClick={handleCurrentPosition}
      >
        Current Position
      </Button>
    </Form>
  );
};

export default SearchBox;