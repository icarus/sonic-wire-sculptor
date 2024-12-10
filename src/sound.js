import * as Tone from 'tone';

// Initialize synth and reverb outside of the function to avoid recreating them on each call
let synth;
let reverb;

export const playCalmSound = (frequency) => {
  console.log("playCalmSound called with frequency:", frequency);  // Log the frequency received

  try {
    // Initialize synth and reverb only once
    if (!synth) {
      // Create the polyphonic synthesizer
      synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: {
          type: "amsine", // Use amplitude-modulated sine wave for a smooth, evolving tone
          modulationType: "sine", // Sine modulation for gentle vibrato
          modulationIndex: 2, // Low modulation for subtle movement
          harmonicity: 0.5, // Slight harmonic texture for added depth
        },
        envelope: {
          attack: 1.5,  // Slow attack for a soft onset
          decay: 1.0,   // Moderate decay to shape the sound gently
          sustain: 0.8, // Soft sustain to maintain a calm tone
          release: 2.0, // Long release for a smooth fade out
        },
      }).toDestination();
      console.log("Synth created:", synth);  // Log the created synth
    }

    if (!reverb) {
      // Create subtle reverb to enhance the spatial aspect of the sound
      reverb = new Tone.Reverb({
        decay: 5,     // Long decay for a distant, spacious sound
        preDelay: 0.1, // Slight pre-delay for a more natural feel
      }).toDestination();
      console.log("Reverb created:", reverb);  // Log the created reverb
      synth.connect(reverb); // Apply reverb to the sound
    }

    console.log("Triggering sound with frequency:", frequency);  // Log when the sound is triggered
    // Trigger the sound with the given frequency, holding the note for 4 seconds
    synth.triggerAttackRelease(frequency, "4n");

  } catch (error) {
    console.error("Error in playCalmSound:", error);  // Log any errors
  }
};
