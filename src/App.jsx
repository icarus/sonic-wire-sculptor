import React, { useState, useRef, useEffect } from "react";
import WebcamDisplay from "./WebcamDisplay";
import HandposeDetection from "./HandposeDetection";
import * as tf from "@tensorflow/tfjs";
import Timeline from "./Timeline";
import Slide from "./Slide";
import CameraControls from "./CameraControls";
import { SparklesCore } from "./components/ui/sparkles";
import { cn } from "./lib/utils";
import SerialConnection from "./serialConnection";

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
  const [isMuted, setIsMuted] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [port, setPort] = useState(null);
  const [joystickX, setJoystickX] = useState(0);
  const [joystickY, setJoystickY] = useState(0);
  const [buttonState, setButtonState] = useState(1);

  const TOTAL_SLIDES = 9;

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

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key.toLowerCase() === 'x') {
        setIsMuted(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleNext = () => {
    if (currentSlide < TOTAL_SLIDES - 1) {
      setCurrentSlide(currentSlide + 1);
    } else if (currentSlide === TOTAL_SLIDES - 1) {
      // First click on last slide triggers fade out animations
      const slideContainer = document.querySelector('.slide-container');
      if (slideContainer && !slideContainer.classList.contains('ending')) {
        slideContainer.classList.add('ending');
        return;
      }
      setShowSlides(false);
    }
  };

  useEffect(() => {
    if (currentSlide === TOTAL_SLIDES - 1) {
      setShowSlides(false);
    }
  }, [currentSlide]);

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (joystickX > 512) {
        setBpm(prev => Math.min(200, prev + 1));
      } else if (joystickX < 512) {
        setBpm(prev => Math.max(60, prev - 1));
      }
    }, 100); // 100ms debounce

    return () => clearTimeout(timeoutId);
  }, [joystickX]);

  return (
    <div className="flex flex-col max-w-full h-svh bg-neutral-900">
      <div className="flex-grow">
        <Timeline
          fingersState={fingersState}
          steps={steps}
          joystickX={joystickX}
          joystickY={joystickY}
          buttonState={buttonState}
          setBpm={setBpm}
          bpm={bpm}
          autoPlay={true}
          showSlides={showSlides}
          isMuted={isMuted}
        />
      </div>

      <div
        className={cn(
          "fixed bottom-0 right-0 h-32 border-t border-neutral-800",
          "transition-all duration-1000 ease-in-out transform",
          showSlides ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
        )}
      >
        {!showSlides && (
          <div className="hidden w-full h-full relative">
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
        )}
      </div>
      <div className={cn(
        "fixed bottom-4 right-4 z-50 opacity-0",
      )}>
        <SerialConnection
          isConnected={isConnected}
          setIsConnected={setIsConnected}
          port={port}
          setPort={setPort}
          joystickX={joystickX}
          setJoystickX={setJoystickX}
          joystickY={joystickY}
          setJoystickY={setJoystickY}
          buttonState={buttonState}
          setButtonState={setButtonState}
        />
      </div>

      {showSlides && (
        <div
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center",
            "transition-all duration-1000"
          )}
        >
          <div
            className={cn(
              "slide-container",
              "z-50 w-full h-full flex flex-col items-center justify-center",
              "bg-neutral-900/90 backdrop-blur-lg",
              "transition-all duration-1000 ease-in-out transform",
            )}
          >
            <Slide
              slideNumber={currentSlide}
              onNext={handleNext}
              onPrev={handlePrev}
              isFirst={currentSlide === 0}
              setIsMuted={setIsMuted}
              isMuted={isMuted}
              isConnected={isConnected}
              setIsConnected={setIsConnected}
              port={port}
              setPort={setPort}
              joystickX={joystickX}
              setJoystickX={setJoystickX}
              joystickY={joystickY}
              setJoystickY={setJoystickY}
              buttonState={buttonState}
              setButtonState={setButtonState}
            />
          </div>
          <div className="absolute inset-0 select-none pointer-events-none">
            <SparklesCore
              id="tsparticlesfullpage"
              background="transparent"
              minSize={0.6}
              maxSize={1.4}
              particleDensity={100}
              className={cn(
                "w-full h-full z-50 mix-blend-exclusion opacity-0",
                "transition-opacity duration-1000",
              )}
              particleColor="#FFFFFF"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
