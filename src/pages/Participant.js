import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
// import { GoogleSpreadsheet } from "google-spreadsheet";
// import creds from "../data/.key.js";

import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

/* here goes util function, too lazy to export and make it module.... */
const setUserNameToLocalStorage = (userName) => {
  window.localStorage.setItem("userName", userName);
};

const setIdToLocalStorage = () => {
  const id = uuidv4();
  window.localStorage.setItem("id", id);
};

const getUserNameFromLocalStorage = () => {
  return window.localStorage.getItem("userName");
};

const getIdFromLocalStorage = () => {
  return window.localStorage.getItem("id");
};

const Container = styled.div`
  margin: 0 auto;
  width: 85%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const InfoWrapper = styled.div`
  margin-top: 100px;
  margin-bottom: 30px;
  width: 85%;
  h1 {
    font-size: 28px;
    font-weight: bold;
    color: white;
    text-align: left;
  }
  h2 {
    font-size: 18px;
    font-weight: 400;
    opacity: 0.7;
    color: white;
    text-align: left;
  }
  p {
    font-size: 12px;
    opacity: 0.7;
    color: white;
    text-align: left;
  }
`;

const NameWrapper = styled.div`
  margin-top: 100px;
  width: 85%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  input {
    outline: none;
    color: white;
    border: 1px solid white;
    border-radius: 3px;
    background: transparent;
    width: 95%;
    padding-left: 10px;
    height: 47px;
    font-size: 18px;
    margin-bottom: 40px;
  }
  ::placeholder {
    opacity: 0.7;
    padding-left: 10px;
    font-size: 18px;
  }

  button {
    border: none;
    border-radius: 3px;
    color: white;
    background-color: #00244e;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 23px;
    width: 100%;
    height: 63px;
  }
`;

const QRContainer = styled.div`
  border-radius: 10px;
  background-color: #00244e;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 300px;
  height: 300px;
  padding: 10px;
  margin-bottom: 30px;
`;

const RegisterBtn = styled.button`
  color: white;
  font-size: 18px;
  font-weight: 600;
  width: 180px;
  height: 45px;
  border-radius: 35px;
  background-color: #00244e;
  border: none;
`;

function Participant() {
  const [isNameRegistered, setIsNameRegistered] = useState(false);
  const [inputs, setInputs] = useState({
    userName: "",
  });
  const [isQRGenerated, setIsQRGenerated] = useState(false);
  const [qrData, setQrData] = useState("");

  const { userName } = inputs;

  useEffect(() => {
    const userName = getUserNameFromLocalStorage();
    const id = getIdFromLocalStorage();
    if (!id || id.length === 0) {
      setIdToLocalStorage();
    }
    if (userName && userName.length !== 0 && id && id.length !== 0) {
      setIsNameRegistered(() => true);
      generateQrHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*
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
  */

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
    const id = getIdFromLocalStorage();
    const data = {
      id: id,
      userName: userName,
    };
    setQrData(() => JSON.stringify(data));
    setIsQRGenerated(() => true);
  };

  const registerUserName = () => {
    setUserNameToLocalStorage(userName);
    setIsNameRegistered(() => true);
    generateQrHandler();
  };

  return (
    <Container>
      <InfoWrapper>
        <h1>디사이퍼 QR 체크인</h1>
        <h2>1. 이름등록</h2>
        <h2>2. 현장에서 운영진에게 QR 체크인</h2>
        <p>* 브라우저 캐시 삭제 시 이름을 재등록 해야합니다.</p>
      </InfoWrapper>
      {!isNameRegistered && (
        <NameWrapper>
          <input
            placeholder="이름을 입력하세요"
            onChange={onChange}
            value={userName}
            name="userName"
          />
          <button type="submit" onClick={registerUserName}>
            등록하기
          </button>
        </NameWrapper>
      )}
      {isQRGenerated && (
        <>
          <QRContainer>
            <QRCode value={qrData} fgColor="#FFFFFF" bgColor="transparent" />
          </QRContainer>
          <RegisterBtn type="submit">이름 재등록하기</RegisterBtn>
        </>
      )}
    </Container>
  );
}

export default Participant;
