import "../assets/css/chat.css";
import React, { useEffect, useState } from "react";
import chatbotData from "../chat.json";
import { Button } from "reactstrap";



function Chat() {
 
  const [isActive, setIsActive] = useState(false);
  const [maxHeight, setMaxHeight] = useState("0px");


  const toggleCollapsible = () => {
    setIsActive(!isActive);
    setMaxHeight(maxHeight === "0px" ? "500px" : "0px");
  };

  const getBotResponse = (userText) => {
    let botResponse = "I'm sorry, I didn't understand that.";

    chatbotData.greetings.forEach((greeting) => {
      console.log(
        "farewell.message.toLowerCase() : ",
        greeting.message.toLowerCase()
      );
      if (userText.toLowerCase().includes(greeting.message.toLowerCase())) {
        console.log("in condition !");
        botResponse = greeting.response;
      }
    });

    chatbotData.farewells.forEach((farewell) => {
      if (userText.toLowerCase().includes(farewell.message.toLowerCase())) {
        botResponse = farewell.response;
      }
    });

    for (let i = 0; i < chatbotData.responses.length; i++) {
      let response = chatbotData.responses[i];

      // Loop through the questions associated with the current response
      for (let j = 0; j < response.questions.length; j++) {
        let question = response.questions[j];

        // If the user's input matches the current question, return the response
        if (userText.toLowerCase().includes(question.toLowerCase())) {
          botResponse = response.message;
        }
      }
    }

    // If no response was found, return a default message
    return botResponse;
  };

  /*const getBotResponse = (userText) => {
    switch (userText.toLowerCase()) {
      case 'hello':
        return 'Hi there!';
      case 'how are you':
        return 'I\'m doing great, thanks for asking.';
      case 'what\'s your name':
        return 'My name is ChatBot.';
      default:
        return 'I\'m sorry, I didn\'t understand your question.';
    }
  }*/

  const getTime = () => {
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();

    if (hours < 10) {
      hours = "0" + hours;
    }

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    let time = hours + ":" + minutes;
    return time;
  };

  const firstBotMessage = () => {
    let firstMessage = "How's it going?";
    document.getElementById("botStarterMessage").innerHTML =
      '<p class="botText"><span>' + firstMessage + "</span></p>";

    let time = getTime();

    document.getElementById("chat-timestamp").innerHTML = time;
    document.getElementById("userInput").scrollIntoView(false);
  };

  useEffect(() => {
    firstBotMessage();
  }, []);

  const getHardResponse = (userText) => {
    let botResponse = getBotResponse(userText);
    let botHtml = '<p class="botText"><span>' + botResponse + "</span></p>";
    document.getElementById("chatbox").innerHTML += botHtml;

    document.getElementById("chat-bar-bottom").scrollIntoView(true);
  };

  const getResponse = () => {
    let userText = document.getElementById("textInput").value;

    if (userText === "") {
      userText = "I love Code Palace!";
    }

    let userHtml = '<p class="userText"><span>' + userText + "</span></p>";

    document.getElementById("textInput").value = "";
    document.getElementById("chatbox").innerHTML += userHtml;
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    setTimeout(() => {
      getHardResponse(userText.trim().replace("?", ""));
    }, 1000);
  };

  const buttonSendText = (sampleText) => {
    let userHtml = '<p class="userText"><span>' + sampleText + "</span></p>";

    document.getElementById("textInput").value = "";
    document.getElementById("chatbox").innerHTML += userHtml;
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    //Uncomment this if you want the bot to respond to this buttonSendText event
    // setTimeout(() => {
    //     getHardResponse(sampleText);
    // }, 1000)
  };





  return (
    <div>
     
      <main>
        <div className='chat-bar-collapsible' style={{ zIndex: 9999 }}>
          <button
            id='chat-button'
            type='button'
            className='collapsible'
            onClick={toggleCollapsible}
          >
            Chat with us!
            <i
              id='chat-icon'
              style={{ color: "#fff" }}
              className='fa fa-fw fa-comments-o'
            ></i>
          </button>

          <div className='content' style={{ maxHeight: maxHeight }}>
            <div className='full-chat-block'>
              <div className='outer-container'>
                <div className='chat-container'>
                  <div id='chatbox'>
                    <h5 id='chat-timestamp'></h5>
                    <p id='botStarterMessage' className='botText'>
                      <span>Loading...</span>
                    </p>
                  </div>
                  <div className='chat-bar-input-block'>
                    <div id='userInput'>
                      <input
                        id='textInput'
                        className='input-box'
                        type='text'
                        name='msg'
                        placeholder="Tap 'Enter' to send a message"
                      />
                      <p></p>
                    </div>
                    <div className='chat-bar-icons'>
                      <i
                        id='chat-icon'
                        style={{ color: "crimson" }}
                        className='fa fa-heart'
                        onClick={() => buttonSendText("Heart clicked!")}
                      ></i>
                      <Button
                        id='chat-icon'
                        style={{ color: "#333" }}
                        className='bi bi-send'
                        onClick={() => getResponse()}
                      ></Button>
                    </div>
                  </div>
                  <div id='chat-bar-bottom'>
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      
       
      </main>

    </div>
  );
}

export default Chat;