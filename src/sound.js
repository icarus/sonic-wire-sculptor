import * as Tone from 'tone';

// Function to create a calm, evolving sound inspired by Sonic Wire Sculptor
export const playCalmSound = (frequency) => {
  // Use a polyphonic synthesizer for evolving tones
  const synth = new Tone.PolySynth(Tone.Synth, {
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

  // Create subtle reverb to enhance the spatial aspect of the sound
  const reverb = new Tone.Reverb({
    decay: 5,     // Long decay for a distant, spacious sound
    preDelay: 0.1, // Slight pre-delay for a more natural feel
  }).toDestination();

  synth.connect(reverb); // Apply reverb to the sound

  // Trigger the sound with the given frequency, holding the note for 4 seconds
  synth.triggerAttackRelease(frequency, "4n");
};
