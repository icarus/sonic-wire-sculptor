export const soundPresets = {
  "Drums": {
    thumb: { type: "kick", note: "D1" },        // Punchier kick
    index: { type: "hihat", note: "F#7" },      // Bright hihat
    middle: { type: "rim", note: "C5" },        // Metallic rim
    ring: { type: "snare", note: "D2" },        // Deep snare
    pinky: { type: "trap_808", note: "F0"},     // Sub bass
    effects: {
      reverb: { decay: 0.5, wet: 0.2 },
      distortion: { amount: 0.2 },
      compression: { threshold: -20, ratio: 4 }
    }
  },
  "Rave": {
    thumb: { type: "acid", note: "C1" },        // Acid bass
    index: { type: "lead", note: "A5" },        // High lead
    middle: { type: "stab", note: "F4" },       // Rave stab
    ring: { type: "noise", note: null },        // White noise
    pinky: { type: "kick", note: "G1"},         // Hard kick
    effects: {
      reverb: { decay: 2.0, wet: 0.4 },
      delay: { time: "16n", feedback: 0.3 },
      distortion: { amount: 0.4 }
    }
  },
  "Industrial": {
    thumb: { type: "metal", note: "C2" },       // Metal hit
    index: { type: "noise", note: null },       // Distorted noise
    middle: { type: "crash", note: "A6" },      // Harsh crash
    ring: { type: "distorted", note: "E2" },    // Distorted bass
    pinky: { type: "glitch", note: null },      // Glitch sound
    effects: {
      distortion: { amount: 0.8 },
      bitcrusher: { bits: 4 },
      filter: { frequency: 2000, Q: 10 }
    }
  },
  "Synth": {
    thumb: { type: "pad", note: "C2" },         // Bass pad
    index: { type: "lead", note: "G4" },        // Lead synth
    middle: { type: "pad", note: "E4" },        // Mid pad
    ring: { type: "lead", note: "B4" },         // High lead
    pinky: { type: "pad", note: "D5" },         // High pad
    effects: {
      reverb: { decay: 5.0, wet: 0.6 },
      delay: { time: "8n", feedback: 0.4 },
      chorus: { frequency: 1.5, depth: 0.7 }
    }
  }
};

export const presetPatterns = {
  "Basic": {
    pattern: [
      [true, false, false, false, true, false, false, false],  // Kick
      [true, true, true, true, true, true, true, true],        // Hihat
      [false, false, true, false, false, false, true, false],  // Rim
      [false, false, true, false, false, false, true, false],  // Snare
      [true, false, false, false, false, false, false, false]  // 808
    ],
    recommendedBPM: 90,
    soundPreset: "Drums"
  },
  "Rave": {
    pattern: [
      [true, false, true, false, true, false, true, false],    // Acid bass
      [false, true, false, true, false, true, false, true],    // High lead
      [true, false, false, true, true, false, false, true],    // Rave stab
      [false, false, true, false, false, false, true, false],  // Noise
      [true, false, false, true, true, false, false, true]     // Hard kick
    ],
    recommendedBPM: 140,
    soundPreset: "Rave"
  },
  "Industrial": {
    pattern: [
      [true, false, true, false, true, false, true, false],    // Metal hit
      [true, true, false, true, true, true, false, true],      // Noise
      [false, false, true, false, false, false, true, false],  // Crash
      [true, false, false, true, true, false, false, true],    // Distorted
      [false, true, true, false, false, true, true, false]     // Glitch
    ],
    recommendedBPM: 130,
    soundPreset: "Industrial"
  },
  "Breakbeat": {
    pattern: [
      [true, false, false, true, true, false, false, true],    // Kick
      [false, true, true, false, false, true, true, false],    // Hihat
      [true, false, true, false, true, false, true, false],    // Rim
      [false, true, false, true, false, true, false, true],    // Snare
      [true, false, false, false, true, false, false, false]   // 808
    ],
    recommendedBPM: 160,
    soundPreset: "Drums"
  },
  "Synth": {
    pattern: [
      [true, false, false, true, false, false, true, false],   // Bass pad
      [false, true, false, true, false, true, false, true],    // Lead 1
      [false, false, true, false, false, false, true, false],  // Pad 1
      [true, false, false, false, true, false, false, false],  // Lead 2
      [false, true, false, true, false, true, false, true]     // Pad 2
    ],
    recommendedBPM: 120,
    soundPreset: "Synth"
  }
};
