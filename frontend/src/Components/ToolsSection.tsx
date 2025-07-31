import { FaPenAlt } from "react-icons/fa";
import { FaEraser } from "react-icons/fa";
import { RxCursorArrow } from "react-icons/rx";

const toolButtonClass =
  "p-3 hover:bg-zinc-500 rounded-xl flex items-center justify-center cursor-pointer";

const ToolsSection = () => {
  return (
    <div className="tools-section bg-zinc-800 text-white p-2 rounded-md fixed top-16 w-[70%] left-1/2 transform -translate-x-1/2 flex gap-1 justify-center items-center drop-shadow-xl">
      <div className={toolButtonClass}>
        <FaPenAlt />
      </div>
      <div className={toolButtonClass}>
        <FaEraser />
      </div>
      <div className={toolButtonClass}>
        <RxCursorArrow />
      </div>
    </div>
  );
};

export default ToolsSection;
