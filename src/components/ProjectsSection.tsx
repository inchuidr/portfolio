import {useState} from 'react';
import {motion} from 'motion/react';
import {ExternalLink, Maximize2, Layers} from 'lucide-react';
import type {ProjectItem} from '../data/portfolioData';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
}

export default function ProjectsSection({
  projects,
  onSelectProject,
}: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  const visibleProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <section
      id="projects"
      className="border-b border-white/[0.07] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header & Functional Filter Bar */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-widest uppercase text-cyan-400">
              Featured Projects
            </p>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Intelligent Applications Built for Practical Impact
            </h2>
            <p className="mt-3 text-base text-slate-300">
              Explore live deployments spanning system health diagnostics, AI workflow automation, and personal knowledge intelligence.
            </p>
          </div>

          {/* Interactive Filter Controls */}
          <div
            role="group"
            aria-label="Filter projects by category"
            className="flex flex-wrap items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.03] p-1.5 self-start md:self-auto"
          >
            {categories.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`min-h-[36px] rounded-lg px-3.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                    isSelected
                      ? 'bg-gradient-to-r from-blue-600/80 to-violet-600/80 text-white shadow-sm'
                      : 'text-slate-400 hover:bg-white/[0.05] hover:text-slate-100'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Large Editorial Project Showcase Cards */}
        <div className="mt-12 space-y-10">
          {visibleProjects.map((project, index) => {
            const isReversed = index % 2 === 1;
            const hasImageError = failedImages[project.id];

            return (
              <motion.article
                key={project.id}
                id={`project-${project.id}`}
                initial={{opacity: 0, y: 24}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, margin: '-70px'}}
                transition={{
                  duration: 0.45,
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="glass-surface glass-surface-hover overflow-hidden rounded-2xl p-4 sm:p-6 lg:p-8"
              >
                <div className="grid grid-cols-1 items-stretch gap-7 lg:grid-cols-12 lg:gap-10">
                  {/* Project Illustration */}
                  <div
                    className={`flex flex-col lg:col-span-5 ${
                      isReversed ? 'lg:order-2' : ''
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      aria-label={`Inspect ${project.name} details`}
                      className="group relative aspect-[4/3] w-full flex-1 overflow-hidden rounded-xl border border-white/[0.08] bg-[#070b18] text-left focus-visible:outline-2 focus-visible:outline-cyan-400"
                    >
                      {!hasImageError ? (
                        <img
                          src={project.imageUrl}
                          alt={project.imageAlt}
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setFailedImages((prev) => ({
                              ...prev,
                              [project.id]: true,
                            }))
                          }
                          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950/60 to-violet-950/60 p-6 text-center">
                          <Layers className="mb-3 h-10 w-10 text-cyan-400" />
                          <p className="font-display text-lg font-semibold text-white">
                            {project.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {project.category}
                          </p>
                        </div>
                      )}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060913]/65 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-60"
                      />
                      <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-[#060913]/80 px-3 py-1.5 text-xs font-medium text-slate-100 backdrop-blur-md transition-colors group-hover:border-cyan-400/50 group-hover:text-cyan-200">
                        <Maximize2 className="h-3.5 w-3.5" />
                        <span>Overview</span>
                      </span>
                    </button>
                  </div>

                  {/* Project Copy, Tech Stack & Live Demo CTA */}
                  <div
                    className={`flex flex-col justify-between lg:col-span-7 ${
                      isReversed ? 'lg:order-1' : ''
                    }`}
                  >
                    <div>
                      {/* Unboxed Metadata Kicker */}
                      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-cyan-300">
                        <span className="font-mono tabular-nums">
                          {project.index}
                        </span>
                        <span aria-hidden="true" className="text-slate-500">
                          /
                        </span>
                        <span>{project.category}</span>
                      </div>

                      <h3 className="mt-2.5 text-balance font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        {project.title}
                      </h3>

                      <p className="mt-3 text-base leading-relaxed text-slate-300">
                        {project.description}
                      </p>

                      {/* Key Engineering Highlights */}
                      <ul className="mt-5 space-y-2 border-t border-white/[0.08] pt-5">
                        {project.highlights.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-300"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technology Stack & Actions */}
                    <div className="mt-7 border-t border-white/[0.08] pt-5">
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                        <div className="min-w-0">
                          <p className="text-xs font-medium tracking-wider uppercase text-slate-400">
                            Technology Stack
                          </p>
                          <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs text-slate-200">
                            {project.technologies.map((tech, techIndex) => (
                              <span key={tech} className="inline-flex items-center gap-2.5">
                                <span>{tech}</span>
                                {techIndex < project.technologies.length - 1 && (
                                  <span
                                    aria-hidden="true"
                                    className="text-slate-600"
                                  >
                                    ·
                                  </span>
                                )}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 shrink-0">
                          <button
                            type="button"
                            onClick={() => onSelectProject(project)}
                            className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium text-slate-200 whitespace-nowrap shrink-0 transition-colors hover:border-cyan-400/50 hover:text-white focus-visible:outline-2 focus-visible:outline-cyan-400"
                          >
                            Details
                          </button>

                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold text-white whitespace-nowrap shrink-0 accent-gradient-btn focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
                          >
                            <span>Live Demo</span>
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
