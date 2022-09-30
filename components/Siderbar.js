import {
  ChatOutlined,
  MoreVertOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { Avatar, Button, IconButton } from "@mui/material";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import {
  collection,
  query,
  where,
  getDoc,
  addDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Chat from "./Chat";
const Siderbar = () => {
  const [user, loading] = useAuthState(auth);
  const userChatref = query(
    collection(db, "chats"),
    where("users", "array-contains", user.email, true)
  );
  const [chatSnapshot] = useCollection(userChatref);

  const chatCollectionsRef = collection(db, "chats");
  const createChat = async () => {
    const input = prompt(
      "Please enter An email address fotr the user you wish to chat with"
    );
    if (!input) return null;
    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      await addDoc(chatCollectionsRef, { users: [user.email, input] });

      //  we need to add the chat to the db 'chats' coloection
    }
  };

  const chatAlreadyExists = (recupientEmail) =>
    !!chatSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recupientEmail)?.length > 0
    );

  return (
    <Container>
      <Header>
        <UserAvater onClick={() => auth.signOut()} />
        <IconContainer>
          <IconButton>
            <ChatOutlined />
          </IconButton>
          <IconButton>
            <MoreVertOutlined />{" "}
          </IconButton>
        </IconContainer>
      </Header>
      <Search>
        <SearchOutlined />
        <SearchInput placeholder="Search in chats" />
      </Search>
      <SidebarButton onClick={createChat}> START A NEW CHAT </SidebarButton>
      <div>
        {chatSnapshot?.docs.map((chat) => (
          <Chat key={chat.id} id={chat.id} users={chat.data().users} />
        ))}
      </div>
    </Container>
  );
};

const Container = styled.div``;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvater = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const IconContainer = styled.div``;

const Search = styled.div`
  padding: 5px;
  border-radius: 2px;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
`;

const SidebarButton = styled(Button)`
  padding: 10px;

  width: 100%;

  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;

export default Siderbar;
