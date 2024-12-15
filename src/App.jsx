import React, { useState, useRef, useEffect } from "react";
import WebcamDisplay from "./WebcamDisplay";
import HandposeDetection from "./HandposeDetection";
import * as tf from "@tensorflow/tfjs";
import Timeline from "./Timeline";
import Slide from "./Slide";
import CameraControls from "./CameraControls";
import { SparklesCore } from "./components/ui/sparkles";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [showSlides, setShowSlides] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [devices, setDevices] = useState([]);
  const [cameraIndex, setCameraIndex] = useState(0);
  const [fingersState, setFingersState] = useState({
    thumb: false,
    index: false,
    middle: false,
    ring: false,
    pinky: false,
  });
  const [bpm, setBpm] = useState(120);
  const [steps,] = useState(8);

  const TOTAL_SLIDES = 6;

  useEffect(() => {
    const getDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        setDevices(videoDevices);
      } catch (error) {
        console.error("Error getting camera devices:", error);
      }
    };

    if (!showSlides) {
      getDevices();
    }
  }, [showSlides]);

  const handleNext = () => {
    if (currentSlide < TOTAL_SLIDES - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setShowSlides(false);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="flex flex-col max-w-full h-svh bg-neutral-900">
      <div className="flex-grow">
        <Timeline
          fingersState={fingersState}
          steps={steps}
          setBpm={setBpm}
          bpm={bpm}
          autoPlay={true}
          showSlides={showSlides} 
        />
      </div>

      {!showSlides && (
        <div className="absolute bottom-0 right-0 h-32 border-t border-neutral-800">
          <div className="flex w-full h-full relative">
            <WebcamDisplay
              webcamRef={webcamRef}
              canvasRef={canvasRef}
              videoConstraints={{
                deviceId: devices[cameraIndex]?.deviceId
              }}
            />
            <HandposeDetection
              webcamRef={webcamRef}
              canvasRef={canvasRef}
              setFingersState={setFingersState}
            />
            <CameraControls
              devices={devices}
              cameraIndex={cameraIndex}
              setCameraIndex={setCameraIndex}
            />
          </div>
        </div>
      )}

      {showSlides && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="z-50 w-full h-full flex flex-col items-center justify-center bg-neutral-900/90 backdrop-blur-lg transition-all duration-500">
            <Slide
              slideNumber={currentSlide}
              onNext={handleNext}
              onPrev={handlePrev}
              isFirst={currentSlide === 0}
            />
          </div>
          <div className="absolute inset-0 select-none pointer-events-none">
            <SparklesCore
              id="tsparticlesfullpage"
              background="transparent"
              minSize={0.6}
              maxSize={1.4}
              particleDensity={100}
              className="w-full h-full z-50 opacity-25 mix-blend-exclusion"
              particleColor="#FFFFFF"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
