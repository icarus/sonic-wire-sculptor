export const soundPresets = {
  "Drums": {
    thumb: { type: "kick", note: "C1" },      // Punchy kick
    index: { type: "hihat", note: "A7" },     // Crisp, higher hihat
    middle: { type: "clap", note: null },     // Sharp clap
    ring: { type: "snare", note: null },      // Tight snare
    pinky: { type: "deep_kick", note: "G0"}   // Even deeper kick for contrast
  },
  "Industrial": {
    thumb: { type: "trap_kick", note: "F1" },     // Aggressive kick
    index: { type: "trap_hihat", note: "D7" },    // Harsh, metallic hihat
    middle: { type: "trap_snare", note: null },    // Distorted snare
    ring: { type: "trap_808", note: "G1" },       // Heavy 808
    pinky: { type: "trap_perc", note: "D5" }      // Metallic percussion
  },
  "Synth": {
    thumb: { type: "pad", note: "C2" },           // Dreamy pad bass
    index: { type: "lead", note: "G4" },          // Ethereal lead
    middle: { type: "pad", note: "E4" },          // Floating pad
    ring: { type: "lead", note: "B4" },           // Airy lead
    pinky: { type: "pad", note: "D5" },           // High dreamy pad
    effects: {
      reverb: { decay: 5.0, wet: 0.6 },           // Long, wet reverb
      delay: { time: "8n", feedback: 0.4 },       // Spacious delay
      chorus: { frequency: 1.5, depth: 0.7 }      // Rich chorus
    }
  },
  "Percussion": {
    thumb: { type: "conga", note: "C3" },         // Deep conga
    index: { type: "hihat", note: "F#6" },        // Crisp shaker
    middle: { type: "cymbal", note: "A5" },       // Bright cymbal
    ring: { type: "clap", note: null },           // Sharp hand clap
    pinky: { type: "cymbal", note: "D6" }         // High bell-like cymbal
  },
  "Retro": {
    thumb: { type: "retro_bass", note: "C2" },    // Fat square bass
    index: { type: "retro_blip", note: "E5" },    // Classic 8-bit blip
    middle: { type: "retro_noise", note: null },   // Filtered noise burst
    ring: { type: "retro_square", note: "G4" },   // Pure square lead
    pinky: { type: "retro_lead", note: "C5" }     // Chippy lead
  }
};

export const presetPatterns = {
  "Basic Beat": {
    pattern: [
      [true, false, false, false, true, false, false, false],
      [false, false, true, false, false, false, true, false],
      [false, false, false, false, true, false, false, false],
      [false, false, true, false, false, false, true, false],
      [true, false, false, true, false, true, false, false]
    ],
    recommendedBPM: 120,
    soundPreset: "Drums"
  },
  "Rave": {
    pattern: [
      [true, false, false, true, false, false, true, false],
      [true, true, true, true, true, true, true, true],
      [false, false, false, false, true, false, false, false],
      [false, false, false, false, true, false, false, false],
      [true, false, false, false, false, false, false, false]
    ],
    recommendedBPM: 140,
    soundPreset: "Industrial"
  },
  "House": {
    pattern: [
      [true, false, false, false, true, false, false, false],
      [false, true, false, true, false, true, false, true],
      [false, false, false, false, true, false, false, false],
      [false, false, true, false, false, false, true, false],
      [true, false, true, false, true, false, true, false]
    ],
    recommendedBPM: 128,
    soundPreset: "Synth"
  },
  "Breakbeat": {
    pattern: [
      [true, false, true, false, true, false, true, false],
      [false, true, false, true, false, true, false, true],
      [true, false, false, true, false, false, true, false],
      [false, true, false, false, true, false, false, true],
      [true, false, false, false, true, false, false, false]
    ],
    recommendedBPM: 140,
    soundPreset: "Industrial"
  }
};
