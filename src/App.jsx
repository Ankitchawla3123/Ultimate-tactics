import "./App.css";
import Board from "./components/board/Board";
import { Footer } from "./components";
import { HeroHeader } from "./components/header";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeroHeader />

      <div className="flex flex-col items-center justify-between flex-1 pt-20">
        <Board />
      </div>
    </div>
  );
}

export default App;
