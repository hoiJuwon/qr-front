import React, { useState } from "react";
import QRCode from "react-qr-code";

function App() {
  const [inputs, setInputs] = useState({
    userName: "",
  });

  const { name } = inputs;

  const registerUserName = (userName) => {
    window.localStorage.setItem("userName", userName);
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const generateQrHandler = () => {
    // TODO : generateQr with userName
  };

  return (
    <div>
      <input placeholder="name" onChange={onChange} value={name} />
      <button type="submit" onClick={generateQrHandler}>
        generate qr
      </button>
      <QRCode value="https://www.naver.com" />
    </div>
  );
}

export default App;
