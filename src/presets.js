export const soundPresets = {
  "Drums": {
    thumb: { type: "kick", note: "C1" },
    index: { type: "hihat", note: "A6" },
    middle: { type: "clap", note: null },
    ring: { type: "snare", note: null },
    pinky: { type: "deep_kick", note: "C0"}      // Deep bass kick for extra low-end
  },
  "Industrial": {
    thumb: { type: "trap_kick", note: "C1" },     // Heavy kick
    index: { type: "trap_hihat", note: "A6" },    // Harsh hihat
    middle: { type: "trap_snare", note: null },   // Distorted snare
    ring: { type: "trap_808", note: "E4" },       // Heavy 808
    pinky: { type: "trap_perc", note: "D5" }      // Metallic percussion
  },
  "Synth": {
    thumb: { type: "dream_bass", note: "C2" },        // Soft bass
    index: { type: "ethereal_lead", note: "A2" },      // Dreamy lead
    middle: { type: "soft_pad", note: "G4" },          // Ambient pad
    ring: { type: "glitch_pluck", note: "B4" },        // Shimmering pluck
    pinky: { type: "ambient_arp", note: "C5" }         // Drifting arp
  },
  "Retro": {
    thumb: { type: "retro_bass", note: "C2" },
    index: { type: "retro_blip", note: "E5" },
    middle: { type: "retro_noise", note: null },
    ring: { type: "retro_square", note: "G4" },
    pinky: { type: "retro_lead", note: "C5" }
  },
  "Rave": {
    thumb: { type: "hard_techno_kick", note: "C1" },  // Aggressive kick
    index: { type: "acid_hihat", note: "A6" },        // Sharper hihat
    middle: { type: "distorted_snare", note: null },   // Harder snare
    ring: { type: "techno_808", note: "F1" },         // Deep bass
    pinky: { type: "hard_percussion", note: "D5" }    // Metallic percussion
  }
};

export const presetPatterns = {
  "Basic": {
    pattern: [
      [true, false, false, false, true, false, false, false],  // Kick on 1 and 5
      [false, true, false, true, false, true, false, true],    // Snare on 2, 4, 6, 8
      [false, false, false, true, false, false, false, false], // Clap on 4
      [false, false, true, false, false, false, true, false],  // Hi-hat variations
      [true, false, false, true, false, true, false, true]     // Adding kick variations
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
