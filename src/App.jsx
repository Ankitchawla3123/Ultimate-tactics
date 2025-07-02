import "./App.css";
import Board from "./components/board/Board";
import { Footer } from "./components";
import { HeroHeader } from "./components/header";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Fixed navbar on top */}
      <HeroHeader />

      {/* Main content with top padding to offset the fixed navbar */}
      <div className="flex flex-col items-center justify-between flex-1 pt-20">
        <Board />
        <Footer />
      </div>
    </div>
  );
}

export default App;
