import Board from "./Components/Board";

const App = () => {
  return (
    <div className="h-screen">
      <nav className="bg-zinc-800 p-2 text-white text-center text-2xl font-semiboldx">
        MultiDraw.
      </nav>
      <Board />
    </div>
  );
};

export default App;
