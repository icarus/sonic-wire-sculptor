import * as Tone from 'tone';

let synths = {};

export const playSound = (finger) => {
  try {
    let note;

    // Define different notes based on the finger
    switch (finger) {
      case "thumb":
        note = "C4"; // Middle C for thumb
        break;
      case "index":
        note = "D4"; // D4 for index
        break;
      case "middle":
        note = "E4"; // E4 for middle
        break;
      case "ring":
        note = "F4"; // F4 for ring
        break;
      case "pinky":
        note = "G4"; // G4 for pinky
        break;
      default:
        note = "C4"; // Default to middle C
        break;
    }

    // Create the synth if it doesn't already exist for the finger
    if (!synths[finger]) {
      synths[finger] = new Tone.PolySynth(Tone.Synth, {
        oscillator: {
          type: "sine", // Simple sine wave for piano-like sound
        },
        envelope: {
          attack: 0.1, // Short attack to simulate piano attack
          decay: 0.3, // Short decay
          sustain: 0.8, // Sustain level
          release: 0.5, // Quick release
        },
      }).toDestination();
    }

    // Trigger the note based on the finger
    synths[finger].triggerAttackRelease(note, "4n");
    console.log(`Playing sound for: ${finger}`);
  } catch (error) {
    console.error("Error in playSound:", error);
  }
};
