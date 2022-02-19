import React from "react";

import { Html5Qrcode } from "html5-qrcode";

function Page() {
  const scanHandler = async () => {
    const constraints = {
      video: true,
    };
    navigator.permissions
      .query({ name: "camera" })
      .then((permissionObj) => {
        console.log(permissionObj.state);
      })
      .catch((error) => {
        console.log("Got error :", error);
      });

    try {
      let stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log(stream);
      /* use the stream */
      const html5QrCode = new Html5Qrcode("reader");
      const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        /* handle success */
        console.log(decodedText, decodedResult);
        alert("출석!");
      };
      const config = { fps: 900, qrbox: { width: 250, height: 250 } };

      html5QrCode.start(
        { facingMode: "environment" },
        config,
        qrCodeSuccessCallback
      );
    } catch (err) {
      /* handle the error */
    }
  };
  return (
    <>
      <div>admin page</div>
      <button onClick={scanHandler}>scan</button>
      <div id="reader" width="600px"></div>
    </>
  );
}

export default Page;
