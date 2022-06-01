import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { useSelector } from 'react-redux';
import styled from "styled-components";
import { host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Welcome from "../components/Welcome";
import { selectUser } from "../state/chatapp";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const user = useSelector(selectUser);
  console.log(user);
  useEffect( () => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      socket.current = io(host);
      socket.current.emit("add-user", user.name, user.department);
    }
  }, [user]);

  return (
    <>
      <Container>
        <div className="container">
            <Welcome />
            <ChatContainer socket={socket} />
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #grey;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-rows: 8% 92%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-rows: 10% 90%;
    }
  }
`;
