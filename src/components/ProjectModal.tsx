import {useEffect, useState} from 'react';
import {X, ExternalLink, Layers} from 'lucide-react';
import type {ProjectItem} from '../data/portfolioData';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({project, onClose}: ProjectModalProps) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="glass-surface relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl p-5 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project overview"
          className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#060913]/80 text-slate-300 transition-colors hover:border-cyan-400/50 hover:text-white focus-visible:outline-2 focus-visible:outline-cyan-400"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="pr-12">
          <div className="flex items-center gap-2 text-xs font-medium text-cyan-300">
            <span className="font-mono tabular-nums">{project.index}</span>
            <span aria-hidden="true" className="text-slate-500">
              /
            </span>
            <span>{project.category}</span>
          </div>

          <h3
            id="project-modal-title"
            className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl"
          >
            {project.title}
          </h3>
        </div>

        <div className="mt-5 aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#070b18]">
          {!imageError ? (
            <img
              src={project.imageUrl}
              alt={project.imageAlt}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950/60 to-violet-950/60 p-6 text-center">
              <Layers className="mb-2 h-10 w-10 text-cyan-400" />
              <p className="font-display text-lg font-semibold text-white">
                {project.name}
              </p>
            </div>
          )}
        </div>

        <p className="mt-6 text-base leading-relaxed text-slate-200">
          {project.description}
        </p>

        <div className="mt-6 border-t border-white/[0.08] pt-5">
          <p className="text-xs font-semibold tracking-wider uppercase text-slate-400">
            Key Highlights
          </p>
          <ul className="mt-3 space-y-2">
            {project.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-300"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400"
                />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-white/[0.08] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium tracking-wider uppercase text-slate-400">
              Technology Stack
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs text-slate-200">
              {project.technologies.map((tech, idx) => (
                <span key={tech} className="inline-flex items-center gap-2.5">
                  <span>{tech}</span>
                  {idx < project.technologies.length - 1 && (
                    <span aria-hidden="true" className="text-slate-600">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-white whitespace-nowrap shrink-0 accent-gradient-btn focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
          >
            <span>Open Live Demo</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
