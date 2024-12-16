export const soundPresets = {
  "Drums": {
    thumb: { type: "kick", note: "C1" },
    index: { type: "hihat", note: "A6" },
    middle: { type: "clap", note: null },
    ring: { type: "snare", note: null },
    pinky: { type: "deep_kick", note: "C0"}
  },
  "Industrial": {
    thumb: { type: "trap_kick", note: "G1" },
    index: { type: "trap_hihat", note: "D6" },
    middle: { type: "pad", note: "G4" },
    ring: { type: "pluck", note: "B3" },
    pinky: { type: "bass", note: "G2" }
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
    recommendedBPM: 150,
    soundPreset: "Industrial"
  }
};
