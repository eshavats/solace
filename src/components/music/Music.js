import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";

import audioFile from "./audio.mp3";
import audioFile2 from "./audio2.mp3";
import "./Music.css";
import history from "../history";

const audio = new Audio();
const socket = io.connect("https://solace-hack-kj.herokuapp.com", {
  transports: ["websocket"],
});

const songs = {
  Paradise: { name: "Paradise", path: audioFile },
  Adventure: { name: "Adventure", path: audioFile2 },
};

const Message = (props) => {
  console.log(props.msg);
  console.log(props.time);
  var d = new Date(props.time);
  return (
    <div class="message">
      <p>
        <span class="message__name">Anonymous</span>
        <span class="message__meta">{d.toLocaleDateString()}</span>
      </p>
      <p>{props.msg}</p>
    </div>
  );
};

const Music = (props) => {
  if (!props.user) {
    history.push("/login");
  }
  const [role, setRole] = useState("");
  const [playing, setPlaying] = useState("");
  const [chats, setChats] = useState([]);
  const [chat, setChat] = useState("");

  useEffect(() => {
    function receiveMessageAudio(m) {
      console.log(m);

      audio.src = m.path;
      audio.play();
      setPlaying(m.name);
    }

    function receiveChat(m) {
      setChats((oldArray) => [...oldArray, { mgs: m.msg, time: m.time }]);
    }

    function stopAudio() {
      setPlaying("");
    }

    socket.on("play", receiveMessageAudio);
    socket.on("stop", stopAudio);
    socket.on("music_message", receiveChat);

    return () => {
      socket.off("play", receiveMessageAudio);
      socket.off("stop", stopAudio);
      socket.off("music_message", receiveChat);
    };
  }, [role]);

  useEffect(() => {
    function handleAudioStop() {
      socket.emit("stop");
    }
    audio.addEventListener("pause", handleAudioStop);

    return () => {
      audio.removeEventListener("pause", handleAudioStop);
    };
  }, []);

  const handlePlaySound = (event) => {
    const { name } = event.target;
    socket.emit("play", songs[name]);
  };

  const handleSendChat = () => {
    socket.emit("music_message", { msg: chat, time: new Date() });
  };

  const handleChange = (event) => {
    const { value } = event.target;

    setChat(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    handleSendChat();
    setChat("");
  };
  console.log(chats);

  return (
    <>
      <div className="music">
        <div class="jumbotron jumbotron-fluid mb-0 p-5 pb-0">
          <h1 class="display-4">Welcome to Solace Music!</h1>
          <p class="lead">
            This is now your happy place! Leave all the stress and worries
            behind and enjoy this journey.. Take a deep breath and close your
            eyes.. Everything will be alright when we play some Coldplay tunes
            for you!
          </p>
          <hr class="my-4" />
          <p>
            We give you the option to listen songs and play them as well..
            Choose whatever you feel like!
          </p>
          <p class="lead mt-5">
            <h5>Choose Role</h5>
            <div className="mt-3">
              <button
                class="btn btn-primary btn-lg mr-4"
                onClick={() => setRole("client")}
                
              >
                Listen Songs
              </button>
              <button
                class="btn btn-primary btn-lg"
                onClick={() => setRole("server")}
                
              >
                Play Songs
              </button>
            </div>
          </p>
          <p class="lead mt-4">
            <h5>Choose Sound</h5>
            <div className="mt-3">
              <button
                class="btn btn-primary btn-lg mr-4"
                onClick={handlePlaySound}
                
                name="Paradise"
              >
                Paradise
              </button>
              <button
                class="btn btn-primary btn-lg mr-4"
                onClick={handlePlaySound}
                
                name="Adventure"
              >
                Adventure
              </button>
            </div>
          </p>
          <div>
            <h3 style={{ fontWeight: "bold", color: "black" }}>
              Playing: {playing ? playing : "Nothing Playing"}
            </h3>
          </div>
        </div>
      </div>
      <div>
        <div class="chat">
          <div id="sidebar" class="chat__sidebar"></div>
          <div class="chat__main">
            <div id="messages" class="chat__messages">
              {chats.map((chat) => (
                <Message time={chat.time} msg={chat.mgs} />
              ))}
            </div>

            <div class="compose">
              <form id="message-form" onSubmit={handleSubmit}>
                <input
                  id="input-msg"
                  placeholder="Message..."
                  required
                  autocomplete="off"
                  name="chat"
                  value={chat}
                  onChange={handleChange}
                />
                <button id="send-msg" type="submit">
                  <i class="fas fa-paper-plane"></i> Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return { user: state.users };
};

export default connect(mapStateToProps)(Music);
