import {useState} from 'react';
import {motion} from 'motion/react';
import {ArrowRight, Mail, Cpu} from 'lucide-react';
import type {PortfolioProfile, ProjectItem} from '../data/portfolioData';

interface HeroSectionProps {
  profile: PortfolioProfile;
  projects: ProjectItem[];
}

export default function HeroSection({profile, projects}: HeroSectionProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-white/[0.07] pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Editorial Typographic Hierarchy */}
          <motion.div
            initial={{opacity: 0, y: 16}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
            className="flex flex-col justify-center lg:col-span-7"
          >
            <p className="mb-4 text-sm font-medium tracking-wide text-cyan-300/90 sm:text-base">
              {profile.heroSubheading}
            </p>

            <h1 className="text-balance font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
              Building{' '}
              <span className="accent-gradient-text">Intelligent Solutions</span>{' '}
              for Tomorrow.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {profile.heroIntro}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="group inline-flex min-h-[44px] items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white whitespace-nowrap shrink-0 accent-gradient-btn focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
              >
                <span>Explore My Projects</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <a
                href="#contact"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-slate-100 whitespace-nowrap shrink-0 transition-colors duration-200 hover:border-cyan-400/50 hover:bg-white/[0.08] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
              >
                <Mail className="h-4 w-4 text-cyan-300" />
                <span>Contact Me</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Animated AI & Developer Visual */}
          <motion.div
            initial={{opacity: 0, scale: 0.97}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1]}}
            className="flex lg:col-span-5"
          >
            <div className="glass-surface relative flex w-full flex-col overflow-hidden rounded-2xl p-2 shadow-2xl shadow-blue-950/40">
              <div className="relative aspect-[16/10] w-full flex-1 overflow-hidden rounded-xl bg-[#070b18] lg:aspect-auto lg:min-h-[360px]">
                {!imageError ? (
                  <motion.img
                    src="/src/assets/images/hero_ai_abstract_1795587329684.jpg"
                    alt="Abstract neural network and translucent software architecture illustration"
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    animate={{scale: [1, 1.03, 1]}}
                    transition={{
                      duration: 14,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950/60 to-violet-950/60 p-8 text-center">
                    <Cpu className="mb-3 h-10 w-10 text-cyan-400" />
                    <p className="font-display text-lg font-semibold text-white">
                      Intelligent Software Engineering
                    </p>
                  </div>
                )}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060913]/80 via-transparent to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 px-5 py-4 text-xs text-slate-300">
                  <span className="font-medium text-slate-100">
                    Applied AI · Full-Stack Systems
                  </span>
                  <span className="font-mono text-cyan-300">
                    {projects.length} Featured Builds
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width Project Anchor Strip Below Split */}
        <div className="mt-12 grid grid-cols-1 divide-y divide-white/[0.08] rounded-xl border border-white/[0.08] bg-white/[0.02] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {projects.map((project) => (
            <a
              key={project.id}
              href={`#project-${project.id}`}
              className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors duration-150 hover:bg-white/[0.04] focus-visible:outline-2 focus-visible:outline-cyan-400"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="font-mono tabular-nums text-cyan-300">
                    {project.index}
                  </span>
                  <span aria-hidden="true">/</span>
                  <span className="truncate">{project.category}</span>
                </div>
                <p className="mt-0.5 truncate font-display text-sm font-semibold text-white group-hover:text-cyan-200">
                  {project.name}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-cyan-300" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
