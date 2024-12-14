export const presetPatterns = {
  "Basic Beat": {
    pattern: [
      [true, false, false, false, true, false, false, false], // Kick
      [false, false, true, false, false, false, true, false], // Hi-hat
      [false, false, false, false, true, false, false, false], // Clap
      [false, false, true, false, false, false, true, false], // Snare
      [true, false, false, true, false, true, false, false]  // Percussion
    ],
    recommendedBPM: 120
  },
  "Hip Hop": {
    pattern: [
      [true, false, false, true, false, false, true, false], // Kick
      [true, true, true, true, true, true, true, true],      // Hi-hat
      [false, false, false, false, true, false, false, false], // Clap
      [false, false, true, false, false, false, true, false], // Snare
      [false, true, false, true, false, true, false, true]   // Percussion
    ],
    recommendedBPM: 95
  },
  "House": {
    pattern: [
      [true, false, false, false, true, false, false, false], // Kick
      [false, false, true, false, false, false, true, false], // Hi-hat
      [false, false, false, false, true, false, false, false], // Clap
      [false, false, true, false, false, false, true, false], // Snare
      [true, true, true, true, true, true, true, true]       // Percussion
    ],
    recommendedBPM: 128
  }
};
