import "./App.css";
import Board from "./components/board/Board";
import { Footer, Header } from "./components";
 
function App() {
  return (
    <div
      className="flex flex-col items-center justify-between min-h-screen"
      onTouchEnd={(e) => {
        e.preventDefault();
        e.stopPropagation();
        var changedTouch = e.changedTouches[0];
        var elem = document.elementFromPoint(
          changedTouch.clientX,
          changedTouch.clientY
        );
        console.log(elem.nodeName);
        // have to add this in board component 
        // console.log(elem)
      }}
    >
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
