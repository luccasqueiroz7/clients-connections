import styled from "styled-components";

export const ModalDiv = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  padding-top: 20px;

  > h2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #343b41;
    border-radius: 4px 4px 0px 0px;
    width: 90vw;
    max-width: 369px;
    margin: 0 auto;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 24px;
    color: #f8f9fa;
    padding: 12px 0;
  }

  > h2 > p {
    padding-left: 3vw;
  }

  > h2 > button {
    background: #343b41;
    border: none;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 26px;
    color: #868e96;
    padding-right: 3vw;
  }

  > form {
    font-family: "Inter", sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90vw;
    max-width: 369px;
    margin: 0 auto;
    background: #212529;
    box-shadow: 0px 3.20867px 32.0867px -8.02168px rgb(0 0 0 / 25%);
    border-radius: 3.20867px;
    gap: 15px;
    padding: 42px 0;

    > button {
      background: #ff577f;
      border: 1.2182px solid #ff577f;
      border-radius: 4.06066px;
      font-size: 12.8347px;
      font-weight: 400;
      line-height: 21px;
      color: #ffffff;
      height: 40px;
      width: 84vw;
      max-width: 329px;
    }
  }

  > form > label {
    display: flex;
    flex-direction: column;
    gap: 10px;

    > p {
      font-style: normal;
      font-weight: 400;
      font-size: 13.772px;
      color: #f8f9fa;

      > span {
        font-size: 9px;
        color: rgba(255, 0, 0, 0.685);
      }
    }

    > input {
      background: #343b41;
      border: 0.973988px solid #343b41;
      border-radius: 3.20867px;
      font-size: 16px;
      color: #f8f9fa;
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 40px;
      width: 84vw;
      padding-left: 10px;
      max-width: 329px;
    }
  }
`;

export const ModalList = styled.div`
  font-family: "Inter", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90vw;
  max-width: 369px;
  margin: 0 auto;
  background: #212529;
  box-shadow: 0px 3.20867px 32.0867px -8.02168px rgb(0 0 0 / 25%);
  border-radius: 3.20867px;
  gap: 15px;
  padding: 20px 0;
  overflow: auto;
  max-height: 80vh;

  > p {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    color: #f8f9fa;
    display: flex;
    width: 90%;
    justify-content: space-between;
    align-items: center;
    border-radius: 4px;
    padding: 8px 15px;
  }

  > p > button {
    width: 32px;
    height: 32px;
    background: #121214;
    border: none;
    border-radius: 4px;
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    color: #f8f9fa;
  }

  > p > button:hover {
    background: #ff577f;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  ::-webkit-scrollbar {
    width: 6px;
    background-color: #f5f5f5;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--pink);
  }

  > div {
    display: flex;
    width: 90%;
    justify-content: space-between;
    align-items: center;
    background: #121214;
    border-radius: 4px;
    padding: 8px 15px;

    > div {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
  }

  > div > p {
    font-style: normal;
    font-weight: 400;
    font-size: 13.772px;
    color: #f8f9fa;
  }
`;
