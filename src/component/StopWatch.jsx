import { useRef, useState } from "react";

export default function StopWatch() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const intervalRef = useRef(null);
  const handelStart = () => {
    setStartTime(Date.now());
    setNow(Date.now());
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 100);
  };
  const handelPause = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };
  let secondsPassed = 0;
  if (startTime !== null && now !== null) {
    secondsPassed = (now - startTime) / 1000;
  }
  
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-3">
      <div className="font-bold text-xl w-fit">
        stop watch: {secondsPassed}s
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={handelStart}
          className="border border-gray-300 font-bold px-4 py-1 bg-gray-100 rounded"
        >
          start
        </button>
        <button
          onClick={handelPause}
          className="border border-gray-300 font-bold px-4 py-1 bg-gray-100 rounded"
        >
          Stop
        </button>
      </div>
    </div>
  );
}
