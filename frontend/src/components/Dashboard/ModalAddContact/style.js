import styled from "styled-components";

export const DivAddField = styled.div`
  display: flex;
  width: 90vw;
  max-width: 369px;
  max-height: 100px;
  overflow: auto;
  > button {
    background: var(--grey-5);
    border: none;
    border-radius: 4.06066px;
    font-size: 12.8347px;
    font-weight: 400;
    line-height: 21px;
    color: #ffffff;
    height: 40px;
    margin-left: 3.5%;
    padding: 2px 5px;
  }

  > button:hover {
    background-color: var(--pink);
    border: none;
  }

  @media (min-width: 425px) {
    > button {
      margin-left: 5.2%;
    }
  }
`;

export const Fields = styled.div`
  max-height: 150px;
  overflow: auto;

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
  > label {
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
