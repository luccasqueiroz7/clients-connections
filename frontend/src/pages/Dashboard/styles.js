import styled from "styled-components";

export const DashboardDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2vh;
  width: 90vw;
  max-width: 800px;
  margin: 0 auto;
  height: 100vh;
  color: white;

  .divider {
    width: 100vw;
  }

  > header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90vw;
    max-width: 800px;
    padding-bottom: 2vh;
  }
  > header > h1 {
    font-family: Arial, Helvetica, sans-serif;
    color: var(--pink);
    font-size: 6vw;
    font-weight: bold;
  }

  > header > button {
    background: #212529;
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

  > header > button:hover {
    background-color: #ff577f;
  }
  > h2 {
    align-self: flex-start;
  }

  @media (min-width: 768px) {
    > header > h1 {
      font-size: 26px;
    }
  }
`;

export const SecondHeader = styled.div`
  display: flex;
  width: 90vw;
  max-width: 800px;
  justify-content: space-between;
  align-items: center;
  padding: 2vh 0;

  div > h2 {
    cursor: pointer;
  }

  div > h2:hover {
    color: var(--pink);
    font-weight: bold;
  }

  > p {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 22px;
    color: #868e96;
  }

  > div {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  > div > button {
    background: #212529;
    border-radius: 4px;
    border: none;
    height: 40px;
    width: 80px;
    font-family: "Inter", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    text-align: center;
    color: #f8f9fa;
    align-self: flex-start;
  }

  > div > button:hover {
    background-color: #ff577f;
  }
`;

export const DivFields = styled.div`
  padding: 0.9vh 0;

  > p {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    color: #f8f9fa;
    width: 90vw;
    max-width: 780px;
    display: flex;
    justify-content: space-between;
  }

  div > p {
    cursor: pointer;
  }

  div > p:hover {
    color: var(--pink);
    font-weight: bold;
  }

  > p > button {
    width: 32px;
    height: 32px;
    background: #212529;
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

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 100%;
    gap: 16px;
    background: #212529;
    border-radius: 4px;
    padding: 18px 22px;
    max-height: 140px;
    margin-top: 2vh;
    overflow: auto;
    overflow-x: hidden;
    > div {
      display: flex;
      width: 100%;
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
  }

  div::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  div::-webkit-scrollbar {
    width: 6px;
    background-color: #f5f5f5;
  }

  div::-webkit-scrollbar-thumb {
    background-color: var(--pink);
  }
`;

export const ContactField = styled.div`
  padding: 0.9vh 0;

  > p {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    color: #f8f9fa;
    width: 90vw;
    max-width: 780px;
    display: flex;
    justify-content: space-between;
  }

  div > p {
    cursor: pointer;
  }

  div > p:hover {
    color: var(--pink);
    font-weight: bold;
  }

  > p > button {
    width: 32px;
    height: 32px;
    background: #212529;
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

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 100%;
    gap: 16px;
    background: #212529;
    border-radius: 4px;
    padding: 18px 22px;
    max-height: 140px;
    margin-top: 2vh;
    overflow: auto;
    overflow-x: hidden;
    > div {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      background: #121214;
      border-radius: 4px;
      padding: 8px 15px 8px 5px;
      > div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 5px;
        width: 30%;
        > div {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
      }
    }
  }

  div::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  div::-webkit-scrollbar {
    width: 6px;
    background-color: #f5f5f5;
  }

  div::-webkit-scrollbar-thumb {
    background-color: var(--pink);
  }

  @media (min-width: 425px) {
    > div > div {
      padding-left: 15px;
    }
  }
  @media (min-width: 768px) {
    > div > div > div {
      width: 20%;
    }
  }
`;
