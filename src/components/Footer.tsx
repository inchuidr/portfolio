import {Github, Linkedin, SlidersHorizontal} from 'lucide-react';
import type {PortfolioProfile} from '../data/portfolioData';

interface FooterProps {
  profile: PortfolioProfile;
  onOpenCustomize: () => void;
}

export default function Footer({profile, onOpenCustomize}: FooterProps) {
  return (
    <footer className="border-t border-white/[0.08] bg-[#04070f] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
        <div>
          <p className="text-sm font-medium text-slate-200">
            Designed &amp; Developed with passion.
          </p>
          <p className="mt-1 text-xs text-slate-400">
            © 2026 All Rights Reserved.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenCustomize}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-slate-300 whitespace-nowrap transition-colors hover:border-cyan-400/40 hover:text-white focus-visible:outline-2 focus-visible:outline-cyan-400"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Customize Portfolio</span>
          </button>

          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-300 transition-colors hover:border-cyan-400/40 hover:text-white focus-visible:outline-2 focus-visible:outline-cyan-400"
          >
            <Github className="h-4 w-4" />
          </a>

          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-300 transition-colors hover:border-cyan-400/40 hover:text-white focus-visible:outline-2 focus-visible:outline-cyan-400"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
