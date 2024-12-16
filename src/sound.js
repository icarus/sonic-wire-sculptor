import * as Tone from 'tone';
import { soundPresets } from './presets';

let synths = {};
let effects = {};
let isInitialized = false;
let currentPreset = "Industrial";
let isMuted = false;

// Initialize effects with gentler settings
effects.reverb = new Tone.Reverb({ decay: 4.0, wet: 0.5 }).toDestination();
effects.delay = new Tone.PingPongDelay("8n", 0.3).toDestination();
effects.distortion = new Tone.Distortion(0.1).toDestination();
effects.chorus = new Tone.Chorus(4, 2.5, 0.5).toDestination().start();
effects.filter = new Tone.Filter(2000, "lowpass").toDestination();

const createSynth = (type) => {
  switch (type) {
    // Basic Drums
    case "kick":
      return new Tone.MembraneSynth({
        pitchDecay: 0.05,
        octaves: 4,
        oscillator: { type: "sine" },
        envelope: {
          attack: 0.001,
          decay: 0.1,
          sustain: 0,
          release: 0.1
        },
        volume: -6
      }).chain(effects.filter);

    case "deep_kick":
      return new Tone.MembraneSynth({
        pitchDecay: 0.1,
        octaves: 5,
        oscillator: { type: "sine" },
        envelope: {
          attack: 0.02,
          decay: 0.2,
          sustain: 0,
          release: 0.2
        },
        volume: -4
      }).chain(effects.filter);

    case "hihat":
      return new Tone.MetalSynth({
        frequency: 200,
        envelope: {
          attack: 0.001,
          decay: 0.03,
          release: 0.03
        },
        harmonicity: 3.1,
        modulationIndex: 16,
        resonance: 3000,
        octaves: 1
      }).chain(effects.chorus);

    case "clap":
      return new Tone.NoiseSynth({
        noise: { type: "white" },
        envelope: {
          attack: 0.001,
          decay: 0.2,
          sustain: 0,
          release: 0.1
        },
        volume: -10
      }).chain(effects.reverb);

    case "snare":
      return new Tone.NoiseSynth({
        noise: { type: "pink" },
        envelope: {
          attack: 0.001,
          decay: 0.15,
          sustain: 0,
          release: 0.1
        },
        volume: -8
      }).chain(effects.reverb);

    // Industrial sounds
    case "trap_kick":
      return new Tone.MembraneSynth({
        pitchDecay: 0.1,
        octaves: 6,
        oscillator: { type: "square" },
        envelope: {
          attack: 0.001,
          decay: 0.3,
          sustain: 0.1,
          release: 0.2
        },
        volume: -4
      }).chain(effects.distortion, effects.filter);

    case "trap_hihat":
      return new Tone.MetalSynth({
        frequency: 300,
        envelope: {
          attack: 0.001,
          decay: 0.02,
          release: 0.02
        },
        harmonicity: 5.1,
        modulationIndex: 32,
        resonance: 4000,
        octaves: 1.5
      }).chain(effects.distortion, effects.chorus);

    case "trap_808":
      return new Tone.Synth({
        oscillator: { type: "sine" },
        envelope: {
          attack: 0.01,
          decay: 0.3,
          sustain: 0.7,
          release: 0.8
        },
        volume: -2
      }).chain(effects.distortion, effects.filter);

    // Synth sounds
    case "pad":
      return new Tone.PolySynth(Tone.Synth, {
        oscillator: {
          type: "sine",
          volume: -12
        },
        envelope: {
          attack: 0.2,
          decay: 0.8,
          sustain: 0.6,
          release: 1.2
        }
      }).chain(
        new Tone.Filter({
          frequency: 2000,
          type: "lowpass",
          rolloff: -12
        }),
        new Tone.Reverb({
          decay: 4.0,
          wet: 0.5
        }),
        new Tone.Chorus(4, 2.5, 0.5).start()
      );

    case "lead":
      return new Tone.Synth({
        oscillator: {
          type: "triangle",
          volume: -8
        },
        envelope: {
          attack: 0.05,
          decay: 0.3,
          sustain: 0.4,
          release: 0.4
        }
      }).chain(
        new Tone.Filter({
          frequency: 3000,
          type: "lowpass",
          rolloff: -12
        }),
        effects.chorus,
        new Tone.PingPongDelay("8n", 0.2)
      );

    // Retro sounds
    case "retro_bass":
      return new Tone.Synth({
        oscillator: {
          type: "square",
          volume: -6
        },
        envelope: {
          attack: 0.01,
          decay: 0.2,
          sustain: 0.4,
          release: 0.2
        }
      }).chain(effects.filter);

    case "retro_blip":
      return new Tone.Synth({
        oscillator: {
          type: "square",
          volume: -10
        },
        envelope: {
          attack: 0.001,
          decay: 0.1,
          sustain: 0,
          release: 0.1
        }
      });

    case "retro_noise":
      return new Tone.NoiseSynth({
        noise: { type: "white" },
        envelope: {
          attack: 0.001,
          decay: 0.1,
          sustain: 0,
          release: 0.1
        },
        volume: -15
      });

    case "retro_square":
      return new Tone.Synth({
        oscillator: {
          type: "square",
          volume: -8
        },
        envelope: {
          attack: 0.01,
          decay: 0.1,
          sustain: 0.3,
          release: 0.1
        }
      });

    case "dreamy_pad":
      return new Tone.PolySynth(Tone.Synth, {
        oscillator: {
          type: "sine",
          volume: -8
        },
        envelope: {
          attack: 0.3,
          decay: 1.2,
          sustain: 0.8,
          release: 3.0
        }
      }).chain(effects.reverb, effects.chorus, effects.filter);

    case "dreamy_lead":
      return new Tone.Synth({
        oscillator: {
          type: "triangle",
          volume: -10
        },
        envelope: {
          attack: 0.1,
          decay: 0.5,
          sustain: 0.6,
          release: 2.0
        }
      }).chain(effects.delay, effects.reverb, effects.chorus);

    case "ambient_texture":
      return new Tone.FMSynth({
        harmonicity: 1.5,
        modulationIndex: 3,
        oscillator: {
          type: "sine",
          volume: -12
        },
        envelope: {
          attack: 0.5,
          decay: 1.0,
          sustain: 0.7,
          release: 2.5
        },
        modulation: {
          type: "triangle"
        },
        modulationEnvelope: {
          attack: 0.5,
          decay: 0.5,
          sustain: 0.2,
          release: 2.0
        }
      }).chain(effects.reverb, effects.chorus, effects.filter);

    default:
      return new Tone.Synth({
        oscillator: { type: "sine" },
        envelope: {
          attack: 0.01,
          decay: 0.1,
          sustain: 0.3,
          release: 0.1
        }
      }).toDestination();
  }
};

export const initializeAudio = async () => {
  await Tone.start();
  console.log('Audio is ready');
  createSynthsForPreset(currentPreset);
  Tone.Transport.start();
};

const createSynthsForPreset = (presetName) => {
  // Clean up existing synths
  Object.values(synths).forEach(synth => {
    synth.dispose();
  });
  synths = {};

  const preset = soundPresets[presetName];
  if (!preset) return;

  // Create new synths based on preset
  Object.entries(preset).forEach(([finger, config]) => {
    if (finger !== 'effects') {
      synths[finger] = createSynth(config.type);
    }
  });
};

export const playSound = (finger) => {
  try {
    const preset = soundPresets[currentPreset];
    if (!preset || !preset[finger]) return;

    const synth = synths[finger];
    if (!synth) return;

    const note = preset[finger].note || "C4";
    synth.triggerAttackRelease(note, "8n");
  } catch (error) {
    console.error("Error in playSound:", error);
  }
};

export const setBPM = (bpm) => {
  Tone.Transport.bpm.value = bpm;
};

export const setCurrentPreset = (presetName) => {
  if (soundPresets[presetName]) {
    currentPreset = presetName;
    createSynthsForPreset(presetName);
  }
};

export const getCurrentPreset = () => {
  return currentPreset;
};
