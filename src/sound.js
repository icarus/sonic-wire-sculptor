import * as Tone from 'tone';
import { soundPresets } from './presets';

let synths = {};
let effects = {};
let isInitialized = false;
let currentPreset = "Industrial";

// Enhanced dreamy effects for non-drum/retro sounds
effects.reverb = new Tone.Reverb({ decay: 4.5, wet: 0.6 }).toDestination();
effects.delay = new Tone.PingPongDelay("8n", 0.6).toDestination();
effects.distortion = new Tone.Distortion(0.2).toDestination();
effects.chorus = new Tone.Chorus(2.5, 3.5, 0.7).toDestination().start();
effects.filter = new Tone.Filter(2000, "lowpass").toDestination();
effects.autoFilter = new Tone.AutoFilter("4n").toDestination().start();
effects.phaser = new Tone.Phaser({
  frequency: 0.5,
  octaves: 5,
  baseFrequency: 1000,
  wet: 0.3
}).toDestination();

// Industrial-specific effects
effects.industrialReverb = new Tone.Reverb({ decay: 1.5, wet: 0.3 }).toDestination();
effects.industrialDistortion = new Tone.Distortion(0.8).toDestination();
effects.industrialFilter = new Tone.Filter(100, "lowpass").toDestination();
effects.industrialCompressor = new Tone.Compressor({
  threshold: -30,
  ratio: 12,
  attack: 0.003,
  release: 0.25
}).toDestination();

const createSynth = (type) => {
  switch (type) {
    // Dry drum sounds
    case "kick":
      return new Tone.MembraneSynth({
        pitchDecay: 0.05,
        octaves: 5,
        oscillator: { type: "sine" },
        envelope: { attack: 0.001, decay: 0.2, sustain: 0, release: 0.1 }
      }).toDestination();

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
      }).toDestination();

    case "hihat":
      return new Tone.MetalSynth({
        frequency: 200,
        envelope: { attack: 0.001, decay: 0.05, release: 0.05 },
        harmonicity: 5.1,
        modulationIndex: 32,
        resonance: 4000,
        octaves: 1.5
      }).toDestination();

    case "clap":
      return new Tone.NoiseSynth({
        noise: { type: 'white' },
        envelope: { attack: 0.005, decay: 0.1, sustain: 0, release: 0.1 }
      }).toDestination();

    case "snare":
      return new Tone.NoiseSynth({
        noise: { type: 'pink' },
        envelope: { attack: 0.001, decay: 0.15, sustain: 0, release: 0.1 }
      }).toDestination();

    // Dry retro sounds
    case "retro_bass":
      return new Tone.Synth({
        oscillator: { type: "square", width: 0.5 },
        envelope: {
          attack: 0.01,
          decay: 0.2,
          sustain: 0.4,
          release: 0.1
        }
      }).toDestination();

    case "retro_blip":
      return new Tone.Synth({
        oscillator: { type: "square", width: 0.2 },
        envelope: {
          attack: 0.001,
          decay: 0.1,
          sustain: 0,
          release: 0.05
        }
      }).toDestination();

    case "retro_noise":
      return new Tone.NoiseSynth({
        noise: { type: 'white', playbackRate: 0.2 },
        envelope: {
          attack: 0.005,
          decay: 0.1,
          sustain: 0,
          release: 0.1
        }
      }).toDestination();

    // Industrial sounds with drum-like effects
    case "trap_kick":
      return new Tone.MembraneSynth({
        pitchDecay: 0.05,
        octaves: 6,
        oscillator: { type: "sine" },
        envelope: {
          attack: 0.001,
          decay: 0.4,
          sustain: 0.01,
          release: 0.4
        },
        volume: 6
      }).chain(effects.industrialFilter, effects.industrialCompressor);

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
      }).chain(effects.industrialDistortion, effects.industrialReverb);

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
      }).chain(effects.industrialDistortion, effects.industrialReverb);

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
      }).chain(effects.industrialFilter, effects.industrialCompressor);

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
      }).chain(effects.industrialReverb, effects.industrialDistortion);

    // Dreamy synth sounds
    case "pad":
      return new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "sine" },
        envelope: { attack: 0.8, decay: 1.5, sustain: 0.8, release: 3.0 }
      }).chain(effects.chorus, effects.reverb, effects.phaser);

    case "lead":
      return new Tone.Synth({
        oscillator: { type: "sine" },
        envelope: { attack: 0.3, decay: 0.5, sustain: 0.4, release: 1.5 }
      }).chain(effects.chorus, effects.delay, effects.reverb);

    case "bass":
      return new Tone.Synth({
        oscillator: { type: "triangle" },
        envelope: { attack: 0.3, decay: 0.8, sustain: 0.4, release: 1.2 }
      }).chain(effects.filter, effects.reverb);

    default:
      return new Tone.Synth({
        oscillator: { type: "sine" },
        envelope: { attack: 0.2, decay: 0.5, sustain: 0.3, release: 1.0 }
      }).toDestination();
  }
};

// Rest of the code remains the same...
export const initializeAudio = async () => {
  if (isInitialized) return;

  await Tone.start();
  console.log('Audio is ready');

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

  Object.values(synths).forEach(synth => synth.dispose());
  synths = {};

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
