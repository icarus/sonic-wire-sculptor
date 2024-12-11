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
          frequency = 50; // Lower frequency for thumb
          break;
        case "index":
          oscillatorType = "sawtooth"; // Harsh tone for index
          modulationIndex = 6;
          attackTime = 0.6;
          decayTime = 0.4;
          frequency = 200; // Increased frequency for index (higher than thumb)
          break;
        case "middle":
          oscillatorType = "square"; // Choppy tone for middle
          modulationIndex = 5;
          attackTime = 0.8;
          decayTime = 0.5;
          frequency = 550; // Higher frequency for middle
          break;
        case "ring":
          oscillatorType = "triangle"; // Smooth, mellow tone for ring
          modulationIndex = 3;
          attackTime = 2.0;
          decayTime = 1.5;
          frequency = 750; // Even higher frequency for ring
          break;
        case "pinky":
          oscillatorType = "pwm"; // Pulse width modulation for pinky
          modulationIndex = 8;
          attackTime = 1.0;
          decayTime = 1.2;
          frequency = 950; // High frequency for pinky
          break;
        default:
          oscillatorType = "sine";
          modulationIndex = 2;
          attackTime = 1.5;
          decayTime = 1.0;
          frequency = 50; // Default frequency for undefined finger
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

      synths[finger].triggerAttackRelease(frequency, "4n");
    } catch (error) {
      console.error("Error in playCalmSound:", error);
    }
  };


// import { Howl } from 'howler';

// let sounds = {
//   thumb: new Howl({
//     src: ['https://www.soundjay.com/buttons/beep-01a.wav'], // Online sound URL for thumb
//     volume: 0.5,
//   }),
//   index: new Howl({
//     src: ['https://soundcamp.org/sounds/381/hat/B/00s-subtle-hip-hop-hat-sound-b-key-67-mB7.wav'], // Online sound URL for index
//     volume: 0.5,
//   }),
//   middle: new Howl({
//     src: ['https://soundcamp.org/sounds/380/clap_1_natural_echo_hallway_qAx.wav'], // Online sound URL for middle
//     volume: 0.5,
//   }),
//   ring: new Howl({
//     src: ['https://soundcamp.org/sounds/381/98.1_new_york_boom_bap_drum_loop_F_pyX.wav'], // Online sound URL for ring
//     volume: 0.5,
//   }),
//   pinky: new Howl({
//     src: ['https://soundcamp.org/sounds/383/delayed_chill_summer_guitar_-_Am_pmJ.wav'], // Online sound URL for pinky
//     volume: 0.5,
//   }),
// };

// export const playCalmSound = (finger) => {
//   try {
//     if (sounds[finger]) {
//       sounds[finger].play();
//     } else {
//       console.error("Sound for this finger is not available.");
//     }
//   } catch (error) {
//     console.error("Error in playCalmSound:", error);
//   }
// };
