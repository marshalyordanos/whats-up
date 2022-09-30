import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  collection,
  getDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import Login from "../pages/login";
import Loading from "../components/Loading";
import { useEffect } from "react";
function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);
  const usersCollectionsRef = collection(db, "users");
  console.log("auth", user);

  useEffect(() => {
    const fetchData = async () => {
      const res = await addDoc(usersCollectionsRef, {
        email: user.email,
        lastSeen: serverTimestamp(),
        photoURL: user.photoURL,
        abebe: "kdlskcs",
      });
    };
    if (user) {
      fetchData();
    }
  }, [user]);

  if (loading) return <Loading />;
  if (!user) return <Login />;
  return <Component {...pageProps} />;
}

export default MyApp;
