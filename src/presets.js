export const soundPresets = {
  "Drums": {
    thumb: { type: "kick", note: "C1" },
    index: { type: "hihat", note: "A6" },
    middle: { type: "clap", note: null },
    ring: { type: "snare", note: null },
    pinky: { type: "deep_kick", note: "C0"}
  },
  "Industrial": {
    thumb: { type: "trap_kick", note: "C1" },
    index: { type: "trap_hihat", note: "A6" },
    middle: { type: "trap_snare", note: null },
    ring: { type: "trap_808", note: "F1" },
    pinky: { type: "trap_perc", note: "D5" }
  },
  "Synth": {
    thumb: { type: "bass", note: "C2" },
    index: { type: "lead", note: "E4" },
    middle: { type: "pad", note: "G4" },
    ring: { type: "pluck", note: "B4" },
    pinky: { type: "arp", note: "C5" }
  },
  "Percussion": {
    thumb: { type: "conga", note: "C3" },
    index: { type: "shaker", note: "D6" },
    middle: { type: "cowbell", note: "G5" },
    ring: { type: "tambourine", note: null },
    pinky: { type: "woodblock", note: "A5" }
  },
  "Retro": {
    thumb: { type: "retro_bass", note: "C2" },
    index: { type: "retro_blip", note: "E5" },
    middle: { type: "retro_noise", note: null },
    ring: { type: "retro_square", note: "G4" },
    pinky: { type: "retro_lead", note: "C5" }
  }
};

export const presetPatterns = {
  "Basic Beat": {
    pattern: [
      [true, false, false, false, true, false, false, false], // Kick
      [false, false, true, false, false, false, true, false], // Hi-hat
      [false, false, false, false, true, false, false, false], // Clap
      [false, false, true, false, false, false, true, false], // Snare
      [true, false, false, true, false, true, false, false]  // Deep Kick
    ],
    recommendedBPM: 120
  },
  "Industrial": {
    pattern: [
      [true, false, false, true, false, false, true, false],   // Kick
      [true, true, true, true, true, true, true, true],        // Hi-hat
      [false, false, false, false, true, false, false, false], // Clap
      [false, false, false, false, true, false, false, false], // Snare
      [true, false, false, false, false, false, false, false]  // Deep Kick
    ],
    recommendedBPM: 140
  },
  "House": {
    pattern: [
      [true, false, false, false, true, false, false, false], // Kick
      [false, true, false, true, false, true, false, true],   // Hi-hat
      [false, false, false, false, true, false, false, false], // Clap
      [false, false, true, false, false, false, true, false], // Snare
      [true, false, true, false, true, false, true, false]    // Deep Kick
    ],
    recommendedBPM: 128
  },
  "Breakbeat": {
    pattern: [
      [true, false, true, false, true, false, true, false],   // Kick
      [false, true, false, true, false, true, false, true],   // Hi-hat
      [true, false, false, true, false, false, true, false],  // Clap
      [false, true, false, false, true, false, false, true],  // Snare
      [true, false, false, false, true, false, false, false]  // Deep Kick
    ],
    recommendedBPM: 150
  }
};
