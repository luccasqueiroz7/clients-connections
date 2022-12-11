import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes } from "./routes";
import { GlobalStyle, Main } from "./styles/global";

function App() {
  return (
    <Main>
      <GlobalStyle />
      <Routes />
      <ToastContainer position="top-right" />
    </Main>
  );
}

export default App;
