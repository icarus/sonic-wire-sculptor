import * as Tone from 'tone';
import { soundPresets } from './presets';

let synths = {};
let effects = {};
let isInitialized = false;
let currentPreset = "Drums";

// Initialize effects with minimal decay
effects.reverb = new Tone.Reverb({ decay: 0.5, wet: 0.2 }).toDestination();
effects.delay = new Tone.PingPongDelay("16n", 0.2).toDestination();
effects.distortion = new Tone.Distortion(0.3).toDestination();
effects.chorus = new Tone.Chorus(4, 2.5, 0.3).toDestination().start();
effects.filter = new Tone.Filter(2000, "lowpass").toDestination();

const createSynth = (type) => {
  switch (type) {
    case "kick":
      return new Tone.MembraneSynth({
        pitchDecay: 0.05,
        octaves: 5,
        oscillator: { type: "sine" },
        envelope: { attack: 0.001, decay: 0.2, sustain: 0, release: 0.1 }
      }).chain(effects.filter);

    case "deep_kick":
      return new Tone.MembraneSynth({
        pitchDecay: 0.05,
        octaves: 7,
        oscillator: { type: "sine" },
        envelope: {
          attack: 0.02,
          decay: 0.8,
          sustain: 0,
          release: 1.5,
        },
        volume: 6
      }).chain(effects.filter);

    case "hihat":
      return new Tone.MetalSynth({
        frequency: 200,
        envelope: { attack: 0.001, decay: 0.05, release: 0.05 },
        harmonicity: 5.1,
        modulationIndex: 32,
        resonance: 4000,
        octaves: 1.5
      }).chain(effects.chorus, effects.reverb);

    case "clap":
      return new Tone.NoiseSynth({
        noise: { type: 'white' },
        envelope: { attack: 0.005, decay: 0.1, sustain: 0, release: 0.1 }
      }).chain(effects.reverb);

    case "snare":
      return new Tone.NoiseSynth({
        noise: { type: 'pink' },
        envelope: { attack: 0.001, decay: 0.15, sustain: 0, release: 0.1 }
      }).chain(effects.filter, effects.reverb);

    case "cymbal":
      return new Tone.MetalSynth({
        frequency: 800,
        envelope: { attack: 0.001, decay: 0.3, release: 0.3 }
      }).chain(effects.chorus, effects.reverb);

    case "bass":
      return new Tone.Synth({
        oscillator: { type: "triangle" },
        envelope: { attack: 0.05, decay: 0.2, sustain: 0.2, release: 0.4 }
      }).chain(effects.filter);

    case "lead":
      return new Tone.Synth({
        oscillator: { type: "square" },
        envelope: { attack: 0.01, decay: 0.1, sustain: 0.3, release: 0.1 }
      }).chain(effects.chorus, effects.delay);

    case "pad":
      return new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "sine" },
        envelope: { attack: 0.1, decay: 0.3, sustain: 0.4, release: 0.4 }
      }).chain(effects.chorus, effects.reverb);

    case "retro_bass":
      return new Tone.Synth({
        oscillator: {
          type: "square",
          width: 0.5
        },
        envelope: {
          attack: 0.01,
          decay: 0.2,
          sustain: 0.4,
          release: 0.1
        }
      }).chain(effects.filter);

    case "retro_blip":
      return new Tone.Synth({
        oscillator: {
          type: "square",
          width: 0.2
        },
        envelope: {
          attack: 0.001,
          decay: 0.1,
          sustain: 0,
          release: 0.05
        }
      }).chain(effects.filter);

    case "retro_noise":
      return new Tone.NoiseSynth({
        noise: {
          type: 'white',
          playbackRate: 0.2
        },
        envelope: {
          attack: 0.005,
          decay: 0.1,
          sustain: 0,
          release: 0.1
        }
      }).chain(new Tone.Filter({
        frequency: 1000,
        type: "bandpass",
        Q: 1.5
      })).chain(effects.distortion);

    case "retro_square":
      return new Tone.Synth({
        oscillator: {
          type: "square",
          width: 0.6
        },
        envelope: {
          attack: 0.01,
          decay: 0.1,
          sustain: 0.3,
          release: 0.1
        }
      }).chain(effects.chorus);

    case "retro_lead":
      return new Tone.Synth({
        oscillator: {
          type: "pulse",
          width: 0.3
        },
        envelope: {
          attack: 0.05,
          decay: 0.2,
          sustain: 0.2,
          release: 0.2
        }
      }).chain(effects.delay, effects.distortion);

    case "trap_kick":
      return new Tone.MembraneSynth({
        pitchDecay: 0.1,
        octaves: 6,
        oscillator: { type: "sine" },
        envelope: {
          attack: 0.01,
          decay: 0.4,
          sustain: 0.01,
          release: 0.4
        },
        volume: 6
      }).chain(effects.filter, effects.distortion);

    case "trap_hihat":
      return new Tone.MetalSynth({
        frequency: 200,
        envelope: {
          attack: 0.001,
          decay: 0.02,
          release: 0.02
        },
        harmonicity: 5.1,
        modulationIndex: 40,
        resonance: 5000,
        octaves: 3
      }).chain(effects.chorus, effects.distortion);

    case "trap_snare":
      return new Tone.NoiseSynth({
        noise: {
          type: 'white',
          playbackRate: 3,
        },
        envelope: {
          attack: 0.001,
          decay: 0.2,
          sustain: 0,
          release: 0.2
        }
      }).chain(new Tone.Filter({
        frequency: 2000,
        type: "highpass",
        rolloff: -12
      })).chain(effects.distortion, effects.reverb);

    case "trap_808":
      return new Tone.Synth({
        oscillator: {
          type: "sine"
        },
        envelope: {
          attack: 0.02,
          decay: 0.8,
          sustain: 0.4,
          release: 1.4
        },
        volume: 4
      }).chain(effects.filter, new Tone.Distortion({
        distortion: 0.4,
        wet: 0.3
      }));

    case "trap_perc":
      return new Tone.MetalSynth({
        frequency: 440,
        envelope: {
          attack: 0.001,
          decay: 0.1,
          release: 0.1
        },
        harmonicity: 3,
        modulationIndex: 20,
        resonance: 3000,
        octaves: 1.5
      }).chain(effects.reverb, effects.delay);

    default:
      return new Tone.Synth().chain(effects.chorus);
  }
};

export const initializeAudio = async () => {
  if (isInitialized) return;

  await Tone.start();
  console.log('Audio is ready');

  // Initialize synths based on current preset
  const preset = soundPresets[currentPreset];
  Object.entries(preset).forEach(([finger, config]) => {
    synths[finger] = createSynth(config.type);
  });

  Tone.Transport.start();
  isInitialized = true;
};

export const setCurrentPreset = (presetName) => {
  if (!soundPresets[presetName]) return;
  currentPreset = presetName;

  // Dispose old synths
  Object.values(synths).forEach(synth => synth.dispose());
  synths = {};

  // Create new synths
  const preset = soundPresets[presetName];
  Object.entries(preset).forEach(([finger, config]) => {
    synths[finger] = createSynth(config.type);
  });
};

export const playSound = (finger) => {
  if (!isInitialized) {
    console.warn('Audio not initialized yet');
    return;
  }

  try {
    const preset = soundPresets[currentPreset];
    const config = preset[finger];
    const synth = synths[finger];

    if (!synth || !config) {
      console.warn(`No synth found for finger: ${finger}`);
      return;
    }

    if (config.note) {
      synth.triggerAttackRelease(config.note, "16n");
    } else {
      synth.triggerAttackRelease("16n");
    }
  } catch (error) {
    console.error("Error in playSound:", error);
  }
};

export const setBPM = (bpm) => {
  Tone.Transport.bpm.value = bpm;
};
