export const soundPresets = {
  "Drums": {
    thumb: { type: "kick", note: "C1" },
    index: { type: "hihat", note: "A6" },
    middle: { type: "clap", note: null },
    ring: { type: "snare", note: null },
    pinky: { type: "deep_kick", note: "C0"}
  },
  "Industrial": {
    thumb: { type: "trap_kick", note: "C1" },     // Heavy kick
    index: { type: "trap_hihat", note: "A6" },    // Harsh hihat
    middle: { type: "trap_snare", note: null },   // Distorted snare
    ring: { type: "trap_808", note: "F1" },       // Heavy 808
    pinky: { type: "trap_perc", note: "D5" }      // Metallic percussion
  },
  "Synth": {
    thumb: { type: "bass", note: "C2" },
    index: { type: "lead", note: "E4" },
    middle: { type: "pad", note: "G4" },
    ring: { type: "pluck", note: "B4" },
    pinky: { type: "arp", note: "C5" }
  },
  "Retro": {
    thumb: { type: "retro_bass", note: "C2" },
    index: { type: "retro_blip", note: "E5" },
    middle: { type: "retro_noise", note: null },
    ring: { type: "retro_square", note: "G4" },
    pinky: { type: "retro_lead", note: "C5" }
  },
  "Rave": {
    thumb: { type: "rave_kick", note: "C1" },
    index: { type: "rave_hihat", note: "A6" },
    middle: { type: "rave_snare", note: null },
    ring: { type: "rave_808", note: "F1" },
    pinky: { type: "rave_perc", note: "D5" }
  }
};

export const presetPatterns = {
  "Basic": {
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
  "Industrial": {
    pattern: [
      [true, false, true, false, true, false, true, false],    // Kick pattern
      [true, true, true, true, true, true, true, true],        // Constant hihat
      [false, false, true, false, false, false, true, false],  // Snare accents
      [true, false, false, true, true, false, false, true],    // 808 bass
      [false, true, false, false, false, true, false, false]   // Perc accents
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
  "Retro": {
    pattern: [
      [true, false, true, false, true, false, true, false],
      [false, true, false, true, false, true, false, true],
      [true, false, false, true, false, false, true, false],
      [false, true, false, false, true, false, false, true],
      [true, false, false, false, true, false, false, false]
    ],
    recommendedBPM: 110,
    soundPreset: "Retro"
  }
};
