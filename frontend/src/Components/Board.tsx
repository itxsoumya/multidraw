import ToolsSection from "./ToolsSection";

const Board = () => {
  return (
    <div className="board bg-amber-100x h-full p-2">
      <ToolsSection />
      {/* Board content goes here */}
      <canvas
        height={window.innerHeight - 50}
        width={window.innerWidth}
        className="w-full h-full border-2 border-gray-600 bg-amber-100x rounded "
      ></canvas>
    </div>
  );
};

export default Board;
