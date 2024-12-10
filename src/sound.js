import * as Tone from 'tone';

let synths = {};

export const playCalmSound = (finger) => {
  try {
    let oscillatorType, modulationIndex, attackTime, decayTime, frequency;

    // Define different settings based on the finger
    switch (finger) {
      case "thumb":
        oscillatorType = "sine"; // Smooth tone for thumb
        modulationIndex = 2;
        attackTime = 1.5;
        decayTime = 1.0;
        frequency = 150; // Lower frequency for thumb
        break;
      case "index":
        oscillatorType = "sawtooth"; // Harsh tone for index
        modulationIndex = 6;
        attackTime = 0.6;
        decayTime = 0.4;
        frequency = 250; // Higher frequency for index
        break;
      case "middle":
        oscillatorType = "square"; // Choppy tone for middle
        modulationIndex = 5;
        attackTime = 0.8;
        decayTime = 0.5;
        frequency = 400; // Mid-range frequency for middle
        break;
      case "ring":
        oscillatorType = "triangle"; // Smooth, mellow tone for ring
        modulationIndex = 3;
        attackTime = 2.0;
        decayTime = 1.5;
        frequency = 600; // Higher frequency for ring
        break;
      case "pinky":
        oscillatorType = "pwm"; // Pulse width modulation for pinky
        modulationIndex = 8;
        attackTime = 1.0;
        decayTime = 1.2;
        frequency = 800; // High frequency for pinky
        break;
      default:
        oscillatorType = "sine";
        modulationIndex = 2;
        attackTime = 1.5;
        decayTime = 1.0;
        frequency = 150; // Default frequency
        break;
    }

    // Create the synth if it doesn't already exist for the finger
    if (!synths[finger]) {
      synths[finger] = new Tone.PolySynth(Tone.Synth, {
        oscillator: {
          type: oscillatorType,
          modulationType: "sine",
          modulationIndex: modulationIndex,
          harmonicity: 0.5,
        },
        envelope: {
          attack: attackTime,
          decay: decayTime,
          sustain: 0.8,
          release: 2.0,
        },
      }).toDestination();
    }

    // Trigger the sound with the determined frequency
    synths[finger].triggerAttackRelease(frequency, "4n");
  } catch (error) {
    console.error("Error in playCalmSound:", error);
  }
};
