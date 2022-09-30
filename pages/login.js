import { Button } from "@mui/material";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { async } from "@firebase/util";

const login = () => {
  const signIn = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
    } catch (err) {
      console.log("err----- ", err);
    }
  };
  return (
    <Container>
      {/* <Header>
        <h1>Login</h1>
      </Header> */}
      <LoginContainer>
        <Logo src={"/chat.png"} width={200} height={200} />
        <Button onClick={signIn} variant="outlined">
          Sign in with Google
        </Button>
      </LoginContainer>
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid red;
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;
const Header = styled.div``;
const LoginContainer = styled.div`
  padding: 100px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;
const Logo = styled(Image)`
  margin-bottom: 50px;
`;

export default login;
