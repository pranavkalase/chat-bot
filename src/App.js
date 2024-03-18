import { BrowserRouter, Route, Routes } from "react-router-dom"
import ChatBot from "./pages/ChatBot";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<ChatBot />}></Route>
        </Routes>
      </BrowserRouter>

      <h1>Welcome to my Chat Bot......</h1>

    </div>
  );
}

export default App;
