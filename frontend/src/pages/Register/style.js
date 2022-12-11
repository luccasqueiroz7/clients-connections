import styled from "styled-components";

export const RegisterDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1vh;
  width: 100vw;
  height: 100vh;

  > header {
    width: 90vw;
    max-width: 369px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 50px auto 20px;
    color: var(--pink);
    font-size: large;
    font-weight: bold;
  }

  header > button {
    background: var(--grey-6);
    border-radius: 4px;
    border: none;
    height: 40px;
    width: 60px;
    font-family: "Inter", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    text-align: center;
    color: #f8f9fa;
  }

  header > button:hover {
    background-color: var(--pink);
  }

  label > p > span {
    font-size: 9px;
    color: rgba(255, 0, 0, 0.685);
  }

  form {
    font-family: "Inter", sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90vw;
    max-width: 369px;
    max-height: 80vh;
    overflow: auto;
    margin: 0 auto;
    background: var(--grey-6);
    box-shadow: 0px 3.20867px 32.0867px -8.02168px rgba(0, 0, 0, 0.25);
    border-radius: 3.20867px;
    gap: 15px;
    padding: 42px 0;
  }

  form > h2 {
    color: var(--white);
  }

  form > p > span {
    font-style: normal;
    font-weight: 600;
    font-size: 9.62602px;
    line-height: 14px;
    color: #868e96;
  }

  form > p > span:hover {
    color: #ff577f;
    cursor: pointer;
  }

  form > label {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  label > p {
    font-style: normal;
    font-weight: 400;
    font-size: 13.772px;
    color: #f8f9fa;
  }

  label > p > span {
    font-size: 9px;
    color: rgba(255, 0, 0, 0.685);
  }

  form > label > input {
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

  form > label > input:hover {
    border: 0.9772px solid #f8f9fa;
  }

  form > button,
  .divAddField > .addField {
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
    flex: none;
  }

  .redirectRegistration {
    background: #868e96;
    border: 1.2182px solid #868e96;
    border-radius: 4px;
  }

  .redirectRegistration:hover {
    background-color: #ff577f;
    border: none;
  }

  form::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  form::-webkit-scrollbar {
    width: 6px;
    background-color: #f5f5f5;
  }

  form::-webkit-scrollbar-thumb {
    background-color: var(--pink);
  }

  .divAddField {
    width: 84vw;
    max-width: 329px;
  }
  .divAddField > .addField {
    width: 50%;
    background-color: var(--grey-5);
    border: none;
  }
  .divAddField > .addField:hover {
    background-color: var(--pink);
    border: none;
  }
`;
