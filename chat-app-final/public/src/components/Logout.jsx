import React from "react";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { logout } from "../state/chatapp";

export default function Logout() {
  const dispatch = useDispatch();

  const handleClick = () => {
   dispatch(logout());
  };
  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #cc6600;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
