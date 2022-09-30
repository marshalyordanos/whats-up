import Image from "next/image";
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
const Loading = () => {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>
        <Image
          src={"/chat.png"}
          style={{ marginBottom: 10 }}
          width="200"
          alt=""
          height={200}
        />
        <div>
          <ClipLoader color="#36d7b7" size={100} />
        </div>
      </div>
    </center>
  );
};

export default Loading;
