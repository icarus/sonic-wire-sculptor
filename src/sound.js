import * as Tone from 'tone';

let synths = {};
let effects = {};

// Initialize effects with minimal decay
effects.reverb = new Tone.Reverb({ decay: 0.5, wet: 0.2 }).toDestination();
effects.delay = new Tone.PingPongDelay("16n", 0.2).toDestination();
effects.distortion = new Tone.Distortion(0.3).toDestination();
effects.chorus = new Tone.Chorus(4, 2.5, 0.3).toDestination().start();
effects.filter = new Tone.Filter(2000, "lowpass").toDestination();

export const initializeAudio = async () => {
  // Start audio context
  await Tone.start();
  console.log('Audio is ready');

  // Kick - Tight 808-style kick
  synths.thumb = new Tone.MembraneSynth({
    pitchDecay: 0.05,
    octaves: 5,
    oscillator: { type: "sine" },
    envelope: {
      attack: 0.001,
      decay: 0.2,
      sustain: 0,
      release: 0.1
    }
  }).chain(effects.filter);

  // Hi-hat - Sharp, precise sound
  synths.index = new Tone.MetalSynth({
    frequency: 200,
    envelope: {
      attack: 0.001,
      decay: 0.05,
      release: 0.05
    },
    harmonicity: 5.1,
    modulationIndex: 32,
    resonance: 4000,
    octaves: 1.5
  }).chain(effects.chorus, effects.reverb);

  // Clap - Quick, sharp clap
  synths.middle = new Tone.NoiseSynth({
    noise: { type: 'white' },
    envelope: {
      attack: 0.005,
      decay: 0.1,
      sustain: 0,
      release: 0.1
    }
  }).chain(effects.reverb);

  // Snare - Tight snare with body
  synths.ring = new Tone.NoiseSynth({
    noise: { type: 'pink' },
    envelope: {
      attack: 0.001,
      decay: 0.15,
      sustain: 0,
      release: 0.1
    }
  }).chain(effects.filter, effects.reverb);

  // Synth - Quick stab with more character
  synths.pinky = new Tone.Synth({
    oscillator: {
      type: "triangle8"
    },
    envelope: {
      attack: 0.01,
      decay: 0.1,
      sustain: 0.1,
      release: 0.1
    }
  }).chain(effects.chorus, effects.delay);

  // Start transport
  Tone.Transport.start();
};

export const playSound = (finger) => {
  try {
    const notes = {
      thumb: "C1",
      index: "A6",
      middle: null,
      ring: null,
      pinky: "F4"
    };

    const synth = synths[finger];
    if (!synth) return;

    // Different handling for each type of sound
    if (finger === "middle" || finger === "ring") {
      synth.triggerAttackRelease("16n");
    } else {
      synth.triggerAttackRelease(notes[finger], "16n");
    }
  } catch (error) {
    console.error("Error in playSound:", error);
  }
};

export const setBPM = (bpm) => {
  Tone.Transport.bpm.value = bpm;
};
