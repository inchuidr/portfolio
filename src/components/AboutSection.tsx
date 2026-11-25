import {useState} from 'react';
import {motion} from 'motion/react';
import {User, SlidersHorizontal} from 'lucide-react';
import type {PortfolioProfile} from '../data/portfolioData';

interface AboutSectionProps {
  profile: PortfolioProfile;
  onOpenCustomize: () => void;
}

export default function AboutSection({
  profile,
  onOpenCustomize,
}: AboutSectionProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="about"
      className="border-b border-white/[0.07] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Profile Image Placeholder */}
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-80px'}}
            transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
            className="flex flex-col lg:col-span-5"
          >
            <div className="glass-surface flex h-full flex-col overflow-hidden rounded-2xl p-3">
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#090e1d]">
                {!imageError && profile.profileImageUrl ? (
                  <img
                    src={profile.profileImageUrl}
                    alt={`${profile.fullName} profile portrait placeholder`}
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950/50 to-violet-950/50 p-6 text-center">
                    <User className="mb-3 h-14 w-14 text-cyan-300/80" />
                    <p className="font-display text-base font-medium text-slate-200">
                      Profile Image Placeholder
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Replace with your portrait in Customize
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-3 flex items-center justify-between gap-3 px-2 py-1 text-xs text-slate-400">
                <span className="truncate font-medium text-slate-300">
                  {profile.fullName} · CSE Undergraduate
                </span>
                <button
                  type="button"
                  onClick={onOpenCustomize}
                  className="inline-flex items-center gap-1.5 font-medium text-cyan-300 whitespace-nowrap shrink-0 transition-colors hover:text-cyan-200 focus-visible:outline-2 focus-visible:outline-cyan-400"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  <span>Replace Photo</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* About Narrative */}
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-80px'}}
            transition={{duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1]}}
            className="flex flex-col justify-center lg:col-span-7"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-cyan-400">
              About Me
            </p>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {profile.aboutHeadline}
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-300">
              {profile.aboutParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 border-t border-white/[0.08] pt-7">
              <p className="mb-4 text-xs font-medium tracking-wider uppercase text-slate-400">
                Core Areas of Focus
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {profile.aboutFocusAreas.map((area, index) => (
                  <div
                    key={area}
                    className="flex items-center gap-3 rounded-lg border border-white/[0.07] bg-white/[0.02] px-4 py-3"
                  >
                    <span className="font-mono text-xs tabular-nums text-cyan-300">
                      0{index + 1}
                    </span>
                    <span className="text-sm font-medium text-slate-100">
                      {area}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
