import { useRef, useState } from "react";

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const handelPLay = () => {
    const nextIspLaying = !isPlaying;
    setIsPlaying(nextIspLaying);
    if (nextIspLaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };
  return (
    <>
      <div className="bg-gray-100">
        <div className="flex flex-col items-center justify-center h-screen space-y-3">
          <button
            onClick={handelPLay}
            className="border border-gray-300 font-bold px-4 py-1 bg-gray-100 rounded"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <video width="250" ref={videoRef}>
            <source
              src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </>
  );
}
