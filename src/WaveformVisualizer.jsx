import React, { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

const WaveformVisualizer = ({ audioData }) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  useEffect(() => {
    if (!waveformRef.current) return;

    // Initialize WaveSurfer
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "violet",
      progressColor: "purple",
      cursorColor: "transparent",
      barWidth: 2,
    });

    if (audioData) {
      wavesurfer.current.loadBlob(audioData);
    }

    return () => {
      wavesurfer.current.destroy();
    };
  }, [audioData]);

  return <div id="waveform" ref={waveformRef} />;
};

export default WaveformVisualizer;
