import React, { useRef } from 'react';
import { Button } from './components/ui/button';
import { TextGenerateEffect } from "./components/ui/text-generate-effect";
import { Confetti } from "./components/ui/confetti";
import { AnimatedList } from "./components/ui/animated-list";
import BlurFade from "./components/ui/blur-fade";
import { cn } from './lib/utils';

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

export default function Slide({ slideNumber, onNext, onPrev, isFirst }) {
  const confettiRef = useRef(null);

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
                <AnimatedList initialDelay={7000}>
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
            <div className="w-2/3 relative flex flex-col gap-32">
              <BlurFade className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <div className="flex gap-6 justify-center items-center">
                    <p className="text-sm tracking-widest font-['VCR_OSD_MONO'] uppercase">Público primario</p>
                    <div className="h-px flex-1 bg-white/25" />
                  </div>
                  <TextGenerateEffect words="Jóvenes entre 12 y 25 años." className="text-3xl font-light tracking-widest" />
                </div>
                <div className="flex gap-4 w-full">
                  <div className="w-1/2 rounded-lg overflow-clip">
                    <img
                      src="https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Público primario"
                      className="scale-100 hover:scale-105 shadow-3xl shadow-black/50 grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <div className="w-1/2 rounded-lg overflow-clip">
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
                  <TextGenerateEffect words="Adultos de 26 a 40 años" className="text-3xl font-light tracking-widest" />
                </div>
                <div className="flex gap-4 w-full">
                  <div className="w-1/2 rounded-lg overflow-clip">
                    <img
                      src="https://images.unsplash.com/photo-1562693313-2ef8cef483a7?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Público secundario"
                      className="scale-100 hover:scale-105 shadow-3xl shadow-black/50 grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <div className="w-1/2 rounded-lg overflow-clip">
                    <img
                      src="https://artshousemagazine.co.uk/wp-content/uploads/2023/05/1020.jpg"
                      alt="Público primario"
                      className="scale-100 hover:scale-105 shadow-3xl shadow-black/50 grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="w-full max-w-6xl mx-auto h-full flex justify-center items-center relative">
            <div className="flex gap-16 max-w-4xl mx-auto relative z-10">
              <div>
                <p className="text-sm uppercase tracking-widest font-['VCR_OSD_MONO'] mb-4">Alcance</p>
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
              <div>
                <p className="text-xs uppercase tracking-widest font-['VCR_OSD_MONO'] mb-4">Impacto Social</p>
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
        );

      case 5:
        return (
          <div className="w-full max-w-6xl mx-auto h-full flex flex-col items-center justify-center relative">
            <div className="text-center relative z-10 mb-16">
              <p className="text-xs tracking-widest font-['VCR_OSD_MONO'] uppercase mb-8">Open Source</p>
              <TextGenerateEffect words="¡Comencemos!" className="text-6xl font-light mb-16" />
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
      <div className="mt-auto flex gap-16 w-full justify-between relative z-50 pointer-events-auto">
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
