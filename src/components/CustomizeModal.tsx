import {useEffect, useState} from 'react';
import {X, RotateCcw, Save} from 'lucide-react';
import type {PortfolioProfile, ProjectItem} from '../data/portfolioData';

interface CustomizeModalProps {
  isOpen: boolean;
  profile: PortfolioProfile;
  projects: ProjectItem[];
  onClose: () => void;
  onSave: (
    updatedProfile: PortfolioProfile,
    updatedProjectTechs: Record<string, string[]>,
  ) => void;
  onResetAll: () => void;
}

export default function CustomizeModal({
  isOpen,
  profile,
  projects,
  onClose,
  onSave,
  onResetAll,
}: CustomizeModalProps) {
  const [initials, setInitials] = useState(profile.initials);
  const [fullName, setFullName] = useState(profile.fullName);
  const [profileImageUrl, setProfileImageUrl] = useState(profile.profileImageUrl);
  const [email, setEmail] = useState(profile.email);
  const [githubUrl, setGithubUrl] = useState(profile.githubUrl);
  const [githubLabel, setGithubLabel] = useState(profile.githubLabel);
  const [linkedinUrl, setLinkedinUrl] = useState(profile.linkedinUrl);
  const [linkedinLabel, setLinkedinLabel] = useState(profile.linkedinLabel);
  const [projectTechDrafts, setProjectTechDrafts] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    if (!isOpen) return;
    setInitials(profile.initials);
    setFullName(profile.fullName);
    setProfileImageUrl(profile.profileImageUrl);
    setEmail(profile.email);
    setGithubUrl(profile.githubUrl);
    setGithubLabel(profile.githubLabel);
    setLinkedinUrl(profile.linkedinUrl);
    setLinkedinLabel(profile.linkedinLabel);

    const techMap: Record<string, string> = {};
    projects.forEach((p) => {
      techMap[p.id] = p.technologies.join(', ');
    });
    setProjectTechDrafts(techMap);
  }, [isOpen, profile, projects]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTechs: Record<string, string[]> = {};
    Object.entries(projectTechDrafts).forEach(([projectId, rawText]) => {
      updatedTechs[projectId] = rawText
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    });

    onSave(
      {
        ...profile,
        initials: initials.trim() || 'YN',
        fullName: fullName.trim() || 'Your Name',
        profileImageUrl: profileImageUrl.trim(),
        email: email.trim() || 'your.email@example.com',
        githubUrl: githubUrl.trim() || 'https://github.com/yourusername',
        githubLabel: githubLabel.trim() || 'github.com/yourusername',
        linkedinUrl: linkedinUrl.trim() || 'https://linkedin.com/in/yourusername',
        linkedinLabel: linkedinLabel.trim() || 'linkedin.com/in/yourusername',
      },
      updatedTechs,
    );
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="customize-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="glass-surface relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div>
            <h3
              id="customize-modal-title"
              className="font-display text-xl font-bold text-white sm:text-2xl"
            >
              Customize Portfolio Details
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Update your initials, portrait URL, contact placeholders, and project technology stacks. Saved locally in your browser.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close customization dialog"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#060913]/80 text-slate-300 transition-colors hover:border-cyan-400/50 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="cust-initials"
                className="mb-1.5 block text-xs font-medium text-slate-300"
              >
                Navbar Initials (1–3 chars)
              </label>
              <input
                id="cust-initials"
                type="text"
                maxLength={3}
                value={initials}
                onChange={(e) => setInitials(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#060913]/80 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400/60 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="cust-fullname"
                className="mb-1.5 block text-xs font-medium text-slate-300"
              >
                Display Name
              </label>
              <input
                id="cust-fullname"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#060913]/80 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400/60 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="cust-photo"
              className="mb-1.5 block text-xs font-medium text-slate-300"
            >
              Profile Image URL (About Section)
            </label>
            <input
              id="cust-photo"
              type="text"
              value={profileImageUrl}
              onChange={(e) => setProfileImageUrl(e.target.value)}
              placeholder="/src/assets/images/about_profile_placeholder_1795587330963.jpg"
              className="w-full rounded-xl border border-white/10 bg-[#060913]/80 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400/60 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="cust-email"
              className="mb-1.5 block text-xs font-medium text-slate-300"
            >
              Contact Email
            </label>
            <input
              id="cust-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#060913]/80 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400/60 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="cust-github-url"
                className="mb-1.5 block text-xs font-medium text-slate-300"
              >
                GitHub URL
              </label>
              <input
                id="cust-github-url"
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#060913]/80 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400/60 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="cust-github-label"
                className="mb-1.5 block text-xs font-medium text-slate-300"
              >
                GitHub Display Label
              </label>
              <input
                id="cust-github-label"
                type="text"
                value={githubLabel}
                onChange={(e) => setGithubLabel(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#060913]/80 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400/60 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="cust-linkedin-url"
                className="mb-1.5 block text-xs font-medium text-slate-300"
              >
                LinkedIn URL
              </label>
              <input
                id="cust-linkedin-url"
                type="url"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#060913]/80 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400/60 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="cust-linkedin-label"
                className="mb-1.5 block text-xs font-medium text-slate-300"
              >
                LinkedIn Display Label
              </label>
              <input
                id="cust-linkedin-label"
                type="text"
                value={linkedinLabel}
                onChange={(e) => setLinkedinLabel(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#060913]/80 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400/60 focus:outline-none"
              />
            </div>
          </div>

          <div className="border-t border-white/[0.08] pt-4">
            <p className="mb-3 text-xs font-semibold tracking-wider uppercase text-slate-400">
              Project Technology Stacks (comma-separated)
            </p>
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.id}>
                  <label
                    htmlFor={`cust-tech-${project.id}`}
                    className="mb-1 block text-xs font-medium text-slate-300"
                  >
                    {project.name}
                  </label>
                  <input
                    id={`cust-tech-${project.id}`}
                    type="text"
                    value={projectTechDrafts[project.id] ?? ''}
                    onChange={(e) =>
                      setProjectTechDrafts((prev) => ({
                        ...prev,
                        [project.id]: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-white/10 bg-[#060913]/80 px-3.5 py-2 text-xs font-mono text-white focus:border-cyan-400/60 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-5">
            <button
              type="button"
              onClick={() => {
                onResetAll();
                onClose();
              }}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-rose-400/40 hover:text-rose-200"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset All Defaults</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex min-h-[40px] items-center rounded-lg border border-white/10 px-4 py-2 text-xs font-medium text-slate-300 transition-colors hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg px-5 py-2 text-xs font-semibold text-white accent-gradient-btn"
              >
                <Save className="h-3.5 w-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
