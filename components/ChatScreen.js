import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Avatar, Button, IconButton } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import styled from "styled-components";
import { auth } from "../firebase";
import MoreVertIcon from "@mui/icons-material/MoreVert";
const ChatScreen = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  return (
    <Container>
      <Header>
        <Avatar />
        <HeaderInformation>
          <h1>rec Email</h1>
          <p>Last seen ...</p>
        </HeaderInformation>
        <HeaderIcon>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcon>
      </Header>
    </Container>
  );
};

const Container = styled.div``;
const Header = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  background-color: white;
  padding: 11px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;
const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;
  > h3 {
    margin-bottom: 3px;
  }
  > p {
    font-size: 14px;
    color: gray;
  }
`;
const HeaderIcon = styled.div``;

export default ChatScreen;
