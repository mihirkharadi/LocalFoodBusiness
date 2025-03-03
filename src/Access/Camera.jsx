import { useRef, useState } from "react";

const CameraCapture = () => {
  const videoRef = useRef(null);
  const [image, setImage] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);
  let streamRef = null;

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    streamRef = stream;
  };

  const capturePhoto = () => {
    const canvas = document.createElement("canvas");
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    setImage(canvas.toDataURL("image/png"));

    const stream = video.srcObject;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const closeCamera=()=>
  {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setCameraOn(false);

  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <video ref={videoRef} autoPlay className="w-40 h-40  bg-black  rounded-full " />
      <div className="grid grid-cols-2 gap-3 ">

      
      <button onClick={startCamera} className="bg-gray-500 text-white px-1 py-1 rounded">
        Open Camera
      </button>
      <button onClick={closeCamera} className="bg-gray-500 text-white px-1 py-1 rounded">
        Close Camera
      </button>
      <button onClick={capturePhoto} className="bg-gray-500 text-white px-1 py-1 rounded ">
        Capture Photo
      </button>
      
      </div>
      {image && (
        <div>
          <p>Captured Image:</p>
          <img src={image} alt="Captured" className="w-40 h-40 border rounded" />
        </div>
      )}
    </div>
  );
};

export default CameraCapture;
