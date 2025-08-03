import { useEffect, useRef, useState } from "react";
import { FaPenAlt } from "react-icons/fa";
import { FaEraser } from "react-icons/fa";
import { RxCursorArrow } from "react-icons/rx";
import { BiRectangle } from "react-icons/bi";
import { FiTriangle } from "react-icons/fi";
import { FaRegCircle } from "react-icons/fa";
import { FaUndo } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";

const toolButtonClass =
  "p-3 hover:bg-zinc-500 rounded-xl flex items-center justify-center cursor-pointer";

const Board = () => {
  const canvasRef = useRef<null | HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [pen, setPen] = useState(false);
  const [erager,setErager] = useState(false)
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null);
  const [tempCol,setTempcol] = useState<null|string>(null)

  const ctxRef = useRef<null | CanvasRenderingContext2D>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.lineCap = "round";

      ctx.lineWidth = 8;
      // ctx.lineJoin = "round";

      ctxRef.current = ctx;
    }
  }, [canvasRef]);
  useEffect(() => {
    if (ctxRef.current) {
      ctxRef.current.strokeStyle = color;
    }
  }, [color]);

  return (
    <div className="board bg-amber-100x h-full p-2">
      {/* tool section */}
      <div className="tools-section bg-zinc-800 text-white p-2 rounded-md fixed top-16 w-[70%] left-1/2 transform -translate-x-1/2 flex gap-1 justify-center items-center drop-shadow-xl">
        <div
          className={`${toolButtonClass} ${pen ? "bg-gray-500" : ""} `}
          onClick={() => {
            setPen(!pen)
            if(tempCol){
              setColor(tempCol);
              setTempcol(null)
            }
            setErager(false)
          }}
        >
          <FaPenAlt />
        </div>
        <div
          className={`${toolButtonClass} ${erager ? "bg-gray-500" : ""} `}
          onClick={(e) => {
            // ctxRef.current?.clearRect(
            //   0,
            //   0,
            //   canvasRef.current!.width,
            //   canvasRef.current!.height
            // );
            // setDrawing(false);
            setErager(true)
            setTempcol(color)
            setColor('white')
            setPen(false)
          }}
        >
          <FaEraser />
        </div>
        <div className={toolButtonClass}>
          <RxCursorArrow />
        </div>
        <div className={toolButtonClass}>
          <BiRectangle />
        </div>
        <div className={toolButtonClass}>
          <FiTriangle />
        </div>
        <div className={toolButtonClass}>
          <FaRegCircle />
        </div>
        <div className={toolButtonClass}>
          <FaUndo />
        </div>
        <div className={toolButtonClass}>
          <FaRedo />
        </div>
      </div>
      {/* color section */}
      <div className="bg-zinc-800 p-3 rounded-xl fixed w-64x m-2 top-40 grid grid-cols-5 gap-3">
        <div className="bg-red-600 w-8 aspect-square rounded" onClick={()=>setColor('red')}></div>
        <div className="bg-cyan-600 w-8 aspect-square rounded" onClick={()=>setColor('cyan')}></div>
        <div className="bg-green-600 w-8 aspect-square rounded" onClick={()=>setColor('green')}></div>
        <div className="bg-yellow-600 w-8 aspect-square rounded" onClick={()=>setColor('yellow')}></div>
        <div className="bg-orange-600 w-8 aspect-square rounded" onClick={()=>setColor('orange')}></div>
        <div className="bg-red-600 w-8 aspect-square rounded"></div>
        <div className="bg-red-600 w-8 aspect-square rounded"></div>
        <div className="bg-red-600 w-8 aspect-square rounded"></div>
        <div className="bg-red-600 w-8 aspect-square rounded"></div>
         <div className="bg-red-600 w-8 aspect-square rounded"></div>
      </div>
      {/* Board content goes here */}
      <canvas
        ref={canvasRef}
        height={window.innerHeight}
        width={window.innerWidth}
        className="w-full h-full border-2 border-gray-600 bg-amber-100x rounded bg-red-100x"
        onMouseMove={(e) => {
          if ((pen && drawing) || (erager && drawing)) {
            const rect = canvasRef.current!.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            if (lastPos) {
              
              ctxRef.current?.beginPath();
              ctxRef.current?.moveTo(lastPos.x, lastPos.y);
              ctxRef.current?.lineTo(x, y);
              ctxRef.current?.stroke();
            }
            setLastPos({ x, y });
          }
        }}
        onMouseDown={(e) => {
          setDrawing(true);
          const rect = canvasRef.current!.getBoundingClientRect();
          setLastPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        }}
        onMouseUp={() => {
          setDrawing(false);
          setLastPos(null);
        }}
        onMouseOut={() => {
          setDrawing(false);
          setLastPos(null);
        }}
      ></canvas>
    </div>
  );
};

export default Board;
