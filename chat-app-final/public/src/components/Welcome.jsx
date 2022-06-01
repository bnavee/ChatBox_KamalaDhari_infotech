import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { selectUser } from "../state/chatapp";
import { useSelector, useDispatch } from 'react-redux';

export default function Welcome() {
  const user = useSelector(selectUser);

  return (
    <Container>
      <h1>
        {user?.name}! Welcome to {user?.department} department
      </h1>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
