import { Papicons } from '@getpapillon/papicons';
import { useState } from 'react';
export default function Hero() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoId = 'ob53CHx9kTs';
  const videoTitle = 'Papicons presentation';

  return (
    <div className="flex flex-col md:flex-row items-center gap-10 my-6">
      <div className="max-w-3xl flex items-start gap-5 justify-center flex-col">
        <h1 className="text-5xl tracking-tight font-bold text-left">
          Open, simple, human icons for everyone.
        </h1>
        <p className="text-xl font-medium text-left text-neutral-700">
          Papicons is a free and open source icon library designed for everyone,
          focused on simplicity and accessibility.
        </p>
        <a
          href="https://github.com/PapillonApp/Papicons/blob/react-native/LICENSE"
          className="text-md -mt-1 leading-relaxed text-left text-neutral-400 hover:underline"
        >
          Papicons is an open-source project under the MIT license.
        </a>

        <div className="flex items-center gap-3 -mt-4">
          <a
            href="https://github.com/PapillonApp/Papicons/blob/react-native/README.md"
            className="mt-4 h-12 inline-flex items-center gap-3 rounded-full text-lg bg-blue-700 hover:bg-blue-800 transition-colors text-white font-medium px-5 py-3"
          >
            <Papicons name="code" size={24} />
            Getting started
          </a>

          <a
            href="https://docs.papillon.bzh/papicons/components/papicons"
            className="mt-4 h-12 inline-flex items-center gap-3 rounded-full text-lg bg-blue-700/10 hover:bg-blue-800/20 transition-colors text-blue-700 font-medium px-5 py-3"
          >
            <Papicons name="newspaper" size={24} />
            Docs
          </a>
        </div>
      </div>

      <div className="aspect-video rounded-xl w-full max-w-120 shadow-lg -mt-2 hidden lg:block overflow-hidden bg-black">
        {isVideoLoaded ? (
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0`}
            title={videoTitle}
            frameBorder="0"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsVideoLoaded(true)}
            aria-label={`Play ${videoTitle}`}
            className="relative block h-full w-full"
          >
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt={videoTitle}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="rounded-full bg-black/65 px-5 py-3 text-lg font-medium text-white hover:bg-black/80 hover:scale-110 active:scale-100 cursor-pointer transition-all flex items-center gap-3">
                Play video
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
