import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { GoogleSpreadsheet } from "google-spreadsheet";
import creds from "../data/.key.js";

function Participant() {
  const [isNameRegistered, setIsNameRegistered] = useState(false);
  const [inputs, setInputs] = useState({
    userName: "",
  });
  const [isQRGenerated, setIsQRGenerated] = useState(false);
  const [qrUrl, setQrUrl] = useState("");

  const { userName } = inputs;

  useEffect(() => {
    const userName = getUserNameFromLocalStorage();
    if (userName && userName.length !== 0) {
      setIsNameRegistered(() => true);
    }
  }, []);

  async function registerUserNameToSheet() {
    const userName = getUserNameFromLocalStorage();
    const doc = new GoogleSpreadsheet(
      "1RtyZo6XUet4WWiH6kneedOonu1pmjPe_sNisnHgZOaQ"
    );
    console.log(creds);
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();

    const date = new Date();
    const sheetName = `${date.getFullYear()}-${date.getMonth() + 1}-${
      date.getDay() + 1
    }`;
    let sheet = null;

    if (doc.sheetsByTitle[sheetName] === undefined) {
      sheet = await doc.addSheet({
        title: sheetName,
        headerValues: ["name", "date"],
      });
    } else {
      sheet = doc.sheetsByTitle[sheetName];
    }

    const result = await sheet.addRow({ name: userName, date: new Date() });
    console.log(result);
  }

  const registerUserName = () => {
    window.localStorage.setItem("userName", userName);
    setIsNameRegistered(() => true);
  };
  const getUserNameFromLocalStorage = () => {
    return window.localStorage.getItem("userName");
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
    const userName = getUserNameFromLocalStorage();
    setQrUrl(() => `https://bla-bla.com/${userName}`);
    setIsQRGenerated(() => true);
  };

  return (
    <div>
      {!isNameRegistered && (
        <>
          <input
            placeholder="name"
            onChange={onChange}
            value={userName}
            name="userName"
          />
          <button type="submit" onClick={registerUserName}>
            {" "}
            registerUserName
          </button>
        </>
      )}
      {isNameRegistered && (
        <button type="submit" onClick={generateQrHandler}>
          generate qr
        </button>
      )}
      {isQRGenerated && <QRCode value={qrUrl} />}
      <button onClick={registerUserNameToSheet}>sheet gogo</button>
    </div>
  );
}

export default Participant;
