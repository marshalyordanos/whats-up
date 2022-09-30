import { MarkChatReadSharp } from "@mui/icons-material";
import { display } from "@mui/system";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import Head from "next/head";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import ChatScreen from "../../components/ChatScreen";
import Siderbar from "../../components/Siderbar";
import { auth, db } from "../../firebase";
import getRecipientEmail from "../../utils/getRecipiantEmail";

const Chat = ({ chat, messages }) => {
  const [user] = useAuthState(auth);
  console.log("from server", chat, messages);
  return (
    <Container>
      <Head>
        <title>Chat With {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <Siderbar />
      <ChatContainer>
        <ChatScreen />
      </ChatContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;
const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export default Chat;

export async function getServerSideProps(context) {
  const ref = doc(db, "chats", context.query.cid);
  console.log("*************");

  const cRef = await query(
    collection(ref, "messages"),
    orderBy("timestamp", "asc")
  );
  console.log("serer", cRef);
  console.log("serer", ref);

  const messageref = await getDocs(cRef);
  const messages = messageref.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toData().getTime(),
    }));
  const chatRes = await getDoc(ref);
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };
  console.log("***********************************");
  console.log(chat, messages);

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}
