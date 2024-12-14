import * as Tone from 'tone';

// Frequency table for piano notes (simplified example)
const noteFreq = {
  "thumb": 261.625565300598634, // C4
  "index": 293.66476791740756,  // D4
  "middle": 329.627556912869929, // E4
  "ring": 349.228231433003884,  // F4
  "pinky": 392.000,             // G4
};

let synths = {};

export const playSound = (finger) => {
  try {
    let frequency = noteFreq[finger] || 261.625565300598634; // Default to C4 if no valid finger is provided

    // Create the synth if it doesn't already exist for the finger
    if (!synths[finger]) {
      synths[finger] = new Tone.Synth({
        oscillator: {
          type: "sine",  // Smooth tone
        },
        envelope: {
          attack: 0.5,
          decay: 0.2,
          sustain: 0.7,
          release: 1.0,
        },
      }).toDestination();
    }

    // Trigger the note corresponding to the finger
    synths[finger].triggerAttackRelease(frequency, "4n");

  } catch (error) {
    console.error("Error in playSound:", error);
  }
};
