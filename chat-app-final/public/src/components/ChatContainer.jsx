import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute, getAllMessages } from "../utils/APIRoutes";
import { selectUser, selectMessages, setMessages } from "../state/chatapp";
import { useSelector, useDispatch } from 'react-redux';

export default function ChatContainer({ socket }) {
  const scrollRef = useRef();
  const user = useSelector(selectUser);
  const messages = useSelector(selectMessages);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchLatestMessages();
  }, []);

  const fetchLatestMessages = () => {
    axios.get(getAllMessages, { params: {
      department: user?.department,
    }}).then((messages) => {
      dispatch(setMessages(messages.data));
    })
  }

  const handleSendMsg = async (msg) => {
  
    socket.current.emit("send-msg", {
      from: user.name,
      msg,
      department: user.department,
    });
    await axios.post(sendMessageRoute, {
      from: user.name,
      message: msg,
      department: user.department
    }).then(() => {
      fetchLatestMessages()
    });
    // dispatch(addMessages({ fromSelf: true, message: msg }));
  };
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg, from) => {
        dispatch(setMessages([...messages, { fromSelf: false, message: msg, from }]));
        fetchLatestMessages();
      });
    }
  }, [socket.current]);


  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  console.log('messages', messages)

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.user === user.name ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  { message.user !== user.name && <div className="userTitle">{message.user}</div> }
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 79% 5%;
  gap: 0.1rem;
  overflow: hidden;
  
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        .userTitle{
          margin-bottom: 1rem;
          font-size: .8rem;    
          font-weight: bold;
        }
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #3c3c3c;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: white;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: white;
      }
    }
  }
`;
