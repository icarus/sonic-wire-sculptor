import React, { useRef } from 'react';
import { Button } from './components/ui/button';
import { BackgroundBeams } from "./components/ui/background-beams";
import { BentoGrid, BentoGridItem } from "./components/ui/bento-grid";
import { TextGenerateEffect } from "./components/ui/text-generate-effect";
import { AnimatedTooltip } from "./components/ui/animated-tooltip";
import { Confetti } from "./components/ui/confetti";

export default function Slide({ slideNumber, onNext, onPrev, isFirst }) {
  const confettiRef = useRef(null);

  const renderSlideContent = () => {
    switch (slideNumber) {
      case 0:
        return (
          <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center items-center relative">
            <div className="w-2/3 relative flex flex-col gap-8">
              <div className="flex gap-6 justify-center items-center">
                <p className="text-sm tracking-widest font-['VCR_OSD_MONO'] uppercase">Taller de Electrónica</p>
                <div className="h-px flex-1 bg-white/25" />
                <p className="text-sm tracking-widest font-['VCR_OSD_MONO'] uppercase">Entrega Final</p>
              </div>
              <TextGenerateEffect words="Synthema" className="text-center text-[152px] font-light mb-8 tracking-widest" />
              <div className="flex gap-16">
                <div className="flex-1">
                  <p className="text-sm text-white/50 uppercase tracking-widest font-['VCR_OSD_MONO'] mb-2">CREADO POR</p>
                  <p className="text-base leading-relaxed font-sans">TAE SONG Y FELIPE MANDIOLA</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white/50 uppercase tracking-widest font-['VCR_OSD_MONO'] mb-2">CLASE POR</p>
                  <p className="text-base leading-relaxed font-sans">CAROLINA PINO Y ALEJANDRO CIFUENTES</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center items-center relative">
            <div className="w-2/3 relative flex flex-col gap-8">
              <div className="flex gap-6 justify-center items-center">
                <p className="text-sm tracking-widest font-['VCR_OSD_MONO'] uppercase">Una realidad cada vez más común.</p>
                <div className="h-px flex-1 bg-white/25" />
              </div>
              <div className="flex flex-col gap-4">
                <TextGenerateEffect words="1 de cada 14 estudiantes abandona el aprendizaje de instrumentos musicales." className="text-4xl font-light tracking-widest" />
                <p className="w-full flex-1 font-sans text-white/50 text-sm">Especialmente en el primer año de enseñanza media.</p>
              </div>
              <div className="flex gap-16">
                <div className="flex-1">
                  <p className="text-sm text-white/50 uppercase tracking-widest font-['VCR_OSD_MONO'] mb-2">CREADO POR</p>
                  <p className="text-base leading-relaxed font-sans">TAE SONG Y FELIPE MANDIOLA</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white/50 uppercase tracking-widest font-['VCR_OSD_MONO'] mb-2">CLASE POR</p>
                  <p className="text-base leading-relaxed font-sans">CAROLINA PINO Y ALEJANDRO CIFUENTES</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="w-full max-w-6xl mx-auto h-full flex justify-center items-center relative">
            <div className="flex gap-16 relative z-10">
              <div>
                <p className="text-xs tracking-widest font-['VCR_OSD_MONO'] uppercase mb-16">¿Cómo funciona?</p>
                <p className="text-xs uppercase tracking-widest font-['VCR_OSD_MONO'] mb-2">Detección</p>
                <p className="text-sm leading-relaxed">TensorFlow.js para tracking preciso de manos</p>
              </div>
              <div className="pt-24">
                <p className="text-xs uppercase tracking-widest font-['VCR_OSD_MONO'] mb-2">Sonido</p>
                <p className="text-sm leading-relaxed">Tone.js para síntesis y secuenciación de audio</p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="w-full max-w-6xl mx-auto h-full flex justify-center items-center relative">
            <div className="flex gap-16">
              <div className="relative z-10">
                <p className="text-xs tracking-widest font-['VCR_OSD_MONO'] uppercase">¿Para Quién?</p>
              </div>
              <div className="relative z-10">
                <div className="flex gap-16 mb-16">
                  <div className="p-8 rounded-xl bg-white/5 backdrop-blur-sm">
                    <p className="text-4xl font-light mb-4">12—25</p>
                    <p className="text-xs uppercase tracking-widest font-['VCR_OSD_MONO'] mb-2">Público Principal</p>
                    <p className="text-sm leading-relaxed">Jóvenes y músicos emergentes</p>
                  </div>
                  <div className="p-8 rounded-xl bg-white/5 backdrop-blur-sm">
                    <p className="text-4xl font-light mb-4">26—40</p>
                    <p className="text-xs uppercase tracking-widest font-['VCR_OSD_MONO'] mb-2">Público Secundario</p>
                    <p className="text-sm leading-relaxed">Educadores y artistas experimentales</p>
                  </div>
                </div>
                <div className="border-t border-white/20 pt-8">
                  <p className="text-xs uppercase tracking-widest font-['VCR_OSD_MONO'] mb-8">Usuarios Objetivo</p>
                  <AnimatedTooltip
                    items={[
                      {
                        name: "Estudiantes",
                        designation: "12-18 años",
                        image: "https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?w=400&h=400&q=80"
                      },
                      {
                        name: "Músicos",
                        designation: "18-25 años",
                        image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=400&q=80"
                      },
                      {
                        name: "Educadores",
                        designation: "25-40 años",
                        image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&h=400&q=80"
                      }
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="w-full max-w-6xl mx-auto h-full flex justify-center items-center relative">
            <div className="flex gap-16 max-w-4xl mx-auto relative z-10">
              <div>
                <p className="text-xs uppercase tracking-widest font-['VCR_OSD_MONO'] mb-4">Alcance</p>
                <ul className="text-sm leading-loose list-none space-y-4">
                  {[
                    "Colegios y escuelas públicas",
                    "Conservatorios de música",
                    "Academias de arte",
                    "Centros culturales",
                    "Espacios comunitarios"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-xs text-white/50">{(i + 1).toString().padStart(2, '0')}.</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-['VCR_OSD_MONO'] mb-4">Impacto Social</p>
                <ul className="text-sm leading-loose list-none space-y-4">
                  {[
                    "Democratización de la música",
                    "Acceso a comunidades vulnerables",
                    "Desarrollo de creatividad",
                    "Integración tecnológica",
                    "Formación artística inclusiva"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-xs text-white/50">{(i + 1).toString().padStart(2, '0')}.</span>
                      {item}
                    </li>
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
