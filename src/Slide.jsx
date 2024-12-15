import React, { useRef, useEffect, useMemo, useCallback, useState } from 'react';
import { Button } from './components/ui/button';
import { TextGenerateEffect } from "./components/ui/text-generate-effect";
import { Confetti } from "./components/ui/confetti";
import { AnimatedList } from "./components/ui/animated-list";
import BlurFade from "./components/ui/blur-fade";
import { cn } from './lib/utils';
import SerialConnection from "./serialConnection";
import * as Tone from 'tone';
import * as handpose from '@tensorflow-models/handpose';
import Webcam from 'react-webcam';
import Globe from './components/ui/globe';

const problems = [
  {
    name: "Falta de Motivación",
    description: "Métodos tradicionales poco atractivos",
    time: "Problema 01",
    icon: "🎵",
    color: "#FF4479",
  },
  {
    name: "Acceso Limitado",
    description: "Instrumentos costosos y poco accesibles",
    time: "Problema 02",
    icon: "💰",
    color: "#FFB800",
  },
  {
    name: "Desconexión Digital",
    description: "Brecha entre educación y tecnología",
    time: "Problema 03",
    icon: "🖥️",
    color: "#00C9A7",
  },
  {
    name: "Abandono Temprano",
    description: "Frustración en etapas iniciales",
    time: "Problema 04",
    icon: "⚠️",
    color: "#1E86FF",
  },
  {
    name: "La pandemia",
    description: "Efectos de la pandemia",
    time: "Problema 05",
    icon: "🦠",
    color: "#93E76E",
  },
  {
    name: "Falta de Innovación",
    description: "Pocas herramientas educativas modernas",
    time: "Problema 06",
    icon: "🚀",
    color: "#A74FFF",
  },
  {
    name: "Desigualdad Educativa",
    description: "Acceso limitado en comunidades vulnerables",
    time: "Problema 07",
    icon: "🏫",
    color: "#FF6F59",
  },
  {
    name: "Desinterés Cultural",
    description: "La música no es una prioridad educativa",
    time: "Problema 08",
    icon: "🎭",
    color: "#FFA63B",
  },
  {
    name: "Falta de Creatividad",
    description: "Herramientas que no inspiran innovación",
    time: "Problema 09",
    icon: "💡",
    color: "#57CC99",
  },
  {
    name: "Educación Aislada",
    description: "Poca conexión entre teoría y práctica musical",
    time: "Problema 10",
    icon: "🎼",
    color: "#557CFF",
  },
  {
    name: "Poca Exploración",
    description: "Enfoque limitado en nuevos géneros musicales",
    time: "Problema 11",
    icon: "🌍",
    color: "#FFD447",
  },
  {
    name: "Falta de Comunidad",
    description: "Escasa colaboración en el aprendizaje musical",
    time: "Problema 12",
    icon: "🤝",
    color: "#6D4C41",
  },
];

const Notification = ({ name, description, icon, color, time }) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit cursor-pointer rounded-2xl p-4",
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        "transform-gpu bg-transparent backdrop-blur-md border border-white/10 shadow-[0_-20px_80px_-20px_#ffffff1f_inset]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium text-white">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-white/50">{time}</span>
          </figcaption>
          <p className="text-sm font-normal text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

const images = [
  "/pype1.png",
  "/tae2.gif",
  "/pype2.png",
  "/tae1.gif",
  "/pype3.gif",
];

export default function Slide({ slideNumber, onNext, onPrev, isFirst, setIsMuted, isMuted }) {
  const confettiRef = useRef(null);
  const [webcamRef, setWebcamRef] = useState(null);
  const [model, setModel] = useState(null);
  const [isHandVisible, setIsHandVisible] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'ArrowRight') {
        onNext();
      } else if (event.key === 'ArrowLeft' && !isFirst) {
        onPrev();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onNext, onPrev, isFirst]);

  useEffect(() => {
    const loadModel = async () => {
      const net = await handpose.load();
      setModel(net);
    };
    loadModel();
  }, []);

  const synth = useMemo(() => new Tone.Synth().toDestination(), []);

  const detect = useCallback(async () => {
    if (model && webcamRef) {
      const video = webcamRef.video;
      const predictions = await model.estimateHands(video);
      setIsHandVisible(predictions.length > 0);
    }
  }, [model, webcamRef]);

  const playNote = useCallback((note) => {
    synth.triggerAttackRelease(note, "8n");
  }, [synth]);

  const renderSlideContent = () => {
    switch (slideNumber) {
      case 0:
        return (
          <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center items-center relative">
            <div className="w-2/3 relative flex flex-col gap-8">
              <BlurFade delay={1} className="flex gap-6 justify-center items-center">
                <p className="text-sm tracking-widest font-['VCR_OSD_MONO'] uppercase">Taller de Electrónica</p>
                <div className="h-px flex-1 bg-white/25" />
                <p className="text-sm tracking-widest font-['VCR_OSD_MONO'] uppercase">Entrega Final</p>
              </BlurFade>
              <TextGenerateEffect words="Synthema" className="text-center text-[152px] font-light mb-8 tracking-widest" />
              <BlurFade delay={1.5} className="flex gap-16">
                <div className="flex-1">
                  <p className="text-sm text-white/50 uppercase tracking-widest font-['VCR_OSD_MONO'] mb-2">CREADO POR</p>
                  <p className="text-base leading-relaxed font-sans">TAE SONG Y FELIPE MANDIOLA</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white/50 uppercase tracking-widest font-['VCR_OSD_MONO'] mb-2">CLASE POR</p>
                  <p className="text-base leading-relaxed font-sans">CAROLINA PINO Y ALEJANDRO CIFUENTES</p>
                </div>
              </BlurFade>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center items-center relative">
            <BlurFade className="w-2/3 relative flex flex-col gap-8">
              <div className="flex gap-6 justify-center items-center">
                <p className="text-sm tracking-widest font-['VCR_OSD_MONO'] uppercase">Preparado para el futuro.</p>
                <div className="h-px flex-1 bg-white/25" />
              </div>
              <p className="text-4xl font-light tracking-widest">
                Un instrumento musical híbrido que combina tecnología digital y analógica.
              </p>
            </BlurFade>
          </div>
        );

      case 2:
        return (
          <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center items-center relative">
            <div className="w-2/3 flex flex-col gap-8">
              <div className="flex gap-6 justify-center items-center">
                <p className="text-sm tracking-widest font-['VCR_OSD_MONO'] uppercase">Una realidad cada vez más común.</p>
                <div className="h-px flex-1 bg-white/25" />
              </div>
              <div className="flex flex-col gap-6">
                <TextGenerateEffect words="1 de cada 14 estudiantes abandona el aprendizaje de instrumentos musicales." className="text-4xl font-light tracking-widest" />
                <BlurFade delay={4.5} className="w-full flex-1 font-sans text-white/50 text-base">Especialmente en el primer año de enseñanza media.</BlurFade>
              </div>
              <div className="h-svh top-0 left-0 size-full absolute">
                <AnimatedList initialDelay={5000}>
                  {problems.map((item, idx) => (
                    <Notification key={idx} {...item} />
                  ))}
                </AnimatedList>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center items-center relative">
            <div className="w-2/3 relative flex flex-col gap-8">
              <BlurFade className="flex flex-col gap-8">
                <div className="flex gap-6 justify-center items-center">
                  <p className="text-sm tracking-widest font-['VCR_OSD_MONO'] uppercase">Tecnologías utilizadas</p>
                  <div className="h-px flex-1 bg-white/25" />
                </div>
                <TextGenerateEffect
                  words="Los 4 pilares de Synthema"
                  className="text-3xl font-light tracking-widest mb-12"
                />

                <div className="grid grid-cols-2 gap-8">
                  <BlurFade delay={0.2} className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Tensorflow_logo.svg/449px-Tensorflow_logo.svg.png"
                        alt="TensorFlow.js"
                        className="w-8 h-8"
                      />
                      <h3 className="text-xl font-light">TensorFlow.js</h3>
                    </div>
                    <p className="text-white/60 text-sm">
                      Detección de gestos en tiempo real mediante machine learning para control intuitivo.
                    </p>
                    <div className="mt-2 rounded-lg overflow-hidden border border-white/10 relative">
                      <Webcam
                        ref={setWebcamRef}
                        className="w-full aspect-video object-cover"
                        videoConstraints={{
                          width: 640,
                          height: 480
                        }}
                        onUserMedia={() => {
                          const interval = setInterval(() => {
                            if (webcamRef?.video?.readyState === 4) {
                              detect();
                            }
                          }, 100);
                          return () => clearInterval(interval);
                        }}
                      />
                      <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 rounded-full px-3 py-1">
                        <span className={`size-2 rounded-full ${isHandVisible ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className="text-sm">{isHandVisible ? 'Mano detectada' : 'No hay manos'}</span>
                      </div>
                    </div>
                  </BlurFade>

                  <BlurFade delay={0.4} className="flex flex-col gap-4 h-full">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://avatars.githubusercontent.com/u/11019186?s=280&v=4"
                        alt="Tone.js"
                        className="w-8 h-8"
                      />
                      <h3 className="text-xl font-light">Tone.js</h3>
                    </div>
                    <p className="text-white/60 text-sm">
                      Síntesis y procesamiento de audio en tiempo real en el navegador.
                    </p>
                    <div className="mt-2 p-4 rounded-lg border border-white/10 h-full items-center">
                      <div className="flex h-full items-center gap-2">
                        {['C4', 'D4', 'E4', 'G4'].map((note) => (
                          <button
                            key={note}
                            className="flex-1 h-full bg-white/10 rounded hover:bg-white/20 transition-colors active:bg-white/30"
                            onClick={() => playNote(note)}
                          >
                            <span className="text-sm">{note}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </BlurFade>

                  {/* React Section */}
                  <BlurFade delay={0.6} className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://reactjs.org/favicon.ico"
                        alt="React"
                        className="w-8 h-8"
                      />
                      <h3 className="text-xl font-light">React</h3>
                    </div>
                    <p className="text-white/60 text-sm">
                      Interfaz web disponible en cualquier navegador y dispositivo.
                    </p>
                    <div className="mt-2 rounded-lg border border-white/10 p-4">
                      <div className="flex gap-2 items-center text-sm text-white/60">
                        <span className="size-2 rounded-full bg-green-500" />
                        Interfaz en tiempo real
                      </div>
                    </div>
                  </BlurFade>

                  {/* Arduino Section */}
                  <BlurFade delay={0.8} className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://www.arduino.cc/favicon.ico"
                        alt="Arduino"
                        className="w-8 h-8"
                      />
                      <h3 className="text-xl font-light">Arduino</h3>
                    </div>
                    <p className="text-white/60 text-sm">
                      Control analógico y controles físicos para una experiencia táctil.
                    </p>
                    <div className="mt-2 rounded-lg border border-white/10 p-4">
                      <div className="flex gap-2 items-center text-sm text-white/60">
                        <span className="size-2 rounded-full bg-blue-500 animate-pulse" />
                        Conectado vía Serial
                      </div>
                    </div>
                  </BlurFade>
                </div>
              </BlurFade>
            </div>
          </div>
        );

      case 4:
          return (
            <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center items-center relative">
              <div className="w-2/3 relative flex flex-col gap-8">
                <BlurFade className="flex flex-col gap-8">
                  <div className="flex gap-6 justify-center items-center">
                    <p className="text-sm tracking-widest font-['VCR_OSD_MONO'] uppercase">7 días en resumen</p>
                    <div className="h-px flex-1 bg-white/25" />
                  </div>
                  <p className="text-3xl font-light tracking-widest mb-12">
                    Construyendo una interfaz
                  </p>
                  <div className="columns-2 gap-4 sm:columns-3">
                    {images.map((imageUrl, idx) => (
                      <BlurFade key={imageUrl} delay={0.25 + idx * 0.05} className='overflow-clip rounded-lg'>
                        <img
                          className="mb-4 w-full rounded-lg object-cover hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg shadow-black/20"
                          src={imageUrl}
                          alt={`Inspirational music ${idx + 1}`}
                        />
                      </BlurFade>
                    ))}
                  </div>
                </BlurFade>
              </div>
            </div>
          );

      case 5:
        return (
          <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center items-center relative">
            <div className="w-2/3 relative flex flex-col gap-32">
              <BlurFade className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <div className="flex gap-6 justify-center items-center">
                    <p className="text-sm tracking-widest font-['VCR_OSD_MONO'] uppercase">Público primario</p>
                    <div className="h-px flex-1 bg-white/25" />
                  </div>
                  <p className="text-3xl font-light tracking-widest">
                    Jóvenes entre 12 y 25 años
                  </p>
                </div>
                <div className="flex gap-4 w-full">
                  <div className="w-1/2 rounded-lg overflow-clip">
                    <img
                      src="https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Público primario"
                      className="scale-100 hover:scale-105 shadow-3xl shadow-black/50 grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <div className="object-cover w-1/2 rounded-lg overflow-clip">
                    <img
                      src="https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG11c2ljJTIwc3R1ZGVudHxlbnwwfDB8MHx8fDI%3D"
                      alt="Público primario"
                      className="scale-100 hover:scale-105 shadow-3xl shadow-black/50 grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </div>
              </BlurFade>
              <BlurFade delay={0.5} className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <div className="flex gap-6 justify-center items-center">
                    <p className="text-sm tracking-widest font-['VCR_OSD_MONO'] uppercase">Público secundario</p>
                    <div className="h-px flex-1 bg-white/25" />
                  </div>
                  <p className="text-3xl font-light tracking-widest">
                    Adultos de 26 a 40 años
                  </p>
                </div>
                <div className="flex gap-4 w-full">
                  <div className="object-cover w-1/2 rounded-lg overflow-clip">
                    <img
                      src="https://images.unsplash.com/photo-1562693313-2ef8cef483a7?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Público secundario"
                      className="scale-100 hover:scale-105 shadow-3xl shadow-black/50 grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <div className="object-cover w-1/2 rounded-lg overflow-clip">
                    <img
                      src="https://ars.electronica.art/aeblog/files/2023/01/52345025559_bb5a60a4c7_k-1-1000x500.jpg"
                      alt="Público primario"
                      className="size-full object-cover scale-100 hover:scale-105 shadow-3xl shadow-black/50 grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="w-full max-w-6xl mx-auto h-full flex justify-center items-center relative">
            <div className="relative flex items-center justify-center w-full h-full">
              <Globe className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] z-0" />
              <div className="relative z-10 flex gap-4 items-center justify-center w-full">
                <div className="backdrop-blur-sm bg-neutral-900/50 p-8 rounded-2xl border border-white/10">
                  <p className="text-base uppercase tracking-widest font-['VCR_OSD_MONO'] mb-8">Alcance</p>
                  <ul className="text-lg leading-loose list-none space-y-4">
                    {[
                      "Colegios y escuelas públicas",
                      "Conservatorios de música",
                      "Academias de arte",
                      "Centros culturales",
                      "Espacios comunitarios"
                    ].map((item, i) => (
                      <BlurFade key={i} delay={i * 0.25} className="flex items-center gap-2">
                        <span className="text-lg text-white/50">{(i + 1).toString().padStart(2, '0')} –</span>
                        {item}
                      </BlurFade>
                    ))}
                  </ul>
                </div>
                <div className="backdrop-blur-sm bg-neutral-900/50 p-8 rounded-2xl border border-white/10">
                  <p className="text-base uppercase tracking-widest font-['VCR_OSD_MONO'] mb-8">Impacto Social</p>
                  <ul className="text-lg leading-loose list-none space-y-4">
                    {[
                      "Democratización de la música",
                      "Acceso a comunidades vulnerables",
                      "Desarrollo de creatividad",
                      "Integración tecnológica",
                      "Formación artística inclusiva"
                    ].map((item, i) => (
                      <BlurFade key={i} delay={i * 0.25} className="flex items-center gap-2">
                        <span className="text-lg text-white/50">{(i + 1).toString().padStart(2, '0')} –</span>
                        {item}
                      </BlurFade>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="w-full max-w-6xl mx-auto h-full flex flex-col items-center justify-center relative">
            <div className="max-w-64 text-center items-center flex flex-col relative z-10 mb-16">
              <p className="text-xs tracking-widest font-['VCR_OSD_MONO'] uppercase mb-8">SYNTHEMA DEMO</p>
              <BlurFade className="text-center text-6xl font-light mb-16 h-12">
                Empecemos!
              </BlurFade>
              <SerialConnection />
            </div>
            <Confetti
              ref={confettiRef}
              className="absolute left-0 top-0 z-0 size-full"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative w-screen h-full z-50 flex flex-col items-center justify-center p-16 text-white">
      {renderSlideContent()}
      <div className="hidden fixed top-4 right-4 items-center gap-2 text-white/50">
        <button
          onClick={() => setIsMuted(prev => !prev)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
        >
          {isMuted ? "🔇" : "🔊"}
          <span className="text-xs tracking-widest font-['VCR_OSD_MONO']">
            Press X to {isMuted ? "unmute" : "mute"}
          </span>
        </button>
      </div>
      <div className="hidden mt-auto gap-16 w-full justify-between relative z-50 pointer-events-auto">
        <Button
          onClick={onPrev}
          disabled={isFirst}
          variant="outline"
          className="text-xs tracking-widest font-['VCR_OSD_MONO'] uppercase disabled:opacity-50 hover:opacity-80 transition-opacity"
        >
          Anterior
        </Button>
        <Button
          onClick={onNext}
          variant="outline"
          className="text-xs tracking-widest font-['VCR_OSD_MONO'] uppercase hover:opacity-80 transition-opacity"
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
