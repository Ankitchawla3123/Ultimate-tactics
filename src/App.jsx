import "./App.css";
import Board from "./components/board/Board";
import { Footer, Header } from "./components";

function App() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <div>
        <Header />
      </div>
      <div>
        <Board />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
