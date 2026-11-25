import {useState} from 'react';
import {motion} from 'motion/react';
import {
  Mail,
  Github,
  Linkedin,
  Copy,
  Check,
  Send,
  ArrowUpRight,
  SlidersHorizontal,
} from 'lucide-react';
import type {PortfolioProfile} from '../data/portfolioData';

interface ContactSectionProps {
  profile: PortfolioProfile;
  onOpenCustomize: () => void;
}

export default function ContactSection({
  profile,
  onOpenCustomize,
}: ContactSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    subject: string;
  } | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setCopiedEmail(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setErrorMsg('Please complete all fields before sending your message.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setSubmittedData({name: name.trim(), subject: subject.trim()});
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  const mailtoComposeUrl = `mailto:${encodeURIComponent(
    profile.email,
  )}?subject=${encodeURIComponent(submittedData?.subject ?? 'Portfolio Inquiry')}`;

  return (
    <section id="contact" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Contact Details & Placeholders */}
          <motion.div
            initial={{opacity: 0, y: 18}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-70px'}}
            transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
            className="flex flex-col justify-between lg:col-span-5"
          >
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-cyan-400">
                Contact
              </p>
              <h2 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Let&apos;s Connect &amp; Build Together
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                {profile.locationLabel}. Feel free to reach out for software development opportunities, AI research discussions, or hackathon collaborations.
              </p>

              <div className="mt-8 space-y-4">
                {/* Email Placeholder */}
                <div className="glass-surface flex items-center justify-between gap-3 rounded-xl p-4">
                  <div className="flex min-w-0 items-center gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-400/25 bg-cyan-400/10 text-cyan-300">
                      <Mail className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-400">
                        Email
                      </p>
                      <a
                        href={`mailto:${profile.email}`}
                        className="block truncate text-sm font-medium text-white hover:text-cyan-300"
                      >
                        {profile.email}
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address"
                    className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-xs font-medium text-slate-200 transition-colors hover:border-cyan-400/40 hover:text-white focus-visible:outline-2 focus-visible:outline-cyan-400"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-cyan-300" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* GitHub Profile Placeholder */}
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-surface glass-surface-hover flex items-center justify-between gap-3 rounded-xl p-4 focus-visible:outline-2 focus-visible:outline-cyan-400"
                >
                  <div className="flex min-w-0 items-center gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-slate-100">
                      <Github className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-400">
                        GitHub Profile
                      </p>
                      <p className="truncate text-sm font-medium text-white">
                        {profile.githubLabel}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400" />
                </a>

                {/* LinkedIn Profile Placeholder */}
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-surface glass-surface-hover flex items-center justify-between gap-3 rounded-xl p-4 focus-visible:outline-2 focus-visible:outline-cyan-400"
                >
                  <div className="flex min-w-0 items-center gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-blue-400/25 bg-blue-500/10 text-blue-300">
                      <Linkedin className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-400">
                        LinkedIn Profile
                      </p>
                      <p className="truncate text-sm font-medium text-white">
                        {profile.linkedinLabel}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400" />
                </a>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={onOpenCustomize}
                className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 transition-colors hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-cyan-400"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>Update email, GitHub, or LinkedIn placeholders</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{opacity: 0, y: 18}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-70px'}}
            transition={{duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-7"
          >
            <div className="glass-surface rounded-2xl p-6 sm:p-8">
              <h3 className="font-display text-xl font-semibold text-white">
                Send a Message
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Use the form below to start a conversation directly.
              </p>

              {submittedData && (
                <div
                  role="status"
                  className="mt-5 rounded-xl border border-cyan-400/35 bg-cyan-400/10 p-4 text-sm text-cyan-100"
                >
                  <p className="font-medium">
                    Thank you, {submittedData.name}. Your message has been prepared.
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-xs">
                    <a
                      href={mailtoComposeUrl}
                      className="inline-flex items-center gap-1 font-semibold text-cyan-300 underline underline-offset-4 hover:text-cyan-200"
                    >
                      <span>Open in Email Client</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmittedData(null)}
                      className="text-slate-300 hover:text-white"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              )}

              {errorMsg && (
                <div
                  role="alert"
                  className="mt-5 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
                >
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block text-xs font-medium text-slate-300"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      required
                      className="w-full rounded-xl border border-white/10 bg-[#060913]/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-cyan-400/60 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block text-xs font-medium text-slate-300"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full rounded-xl border border-white/10 bg-[#060913]/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-cyan-400/60 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="mb-2 block text-xs font-medium text-slate-300"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Project inquiry, internship, or collaboration"
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#060913]/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-cyan-400/60 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-xs font-medium text-slate-300"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message here..."
                    required
                    className="w-full resize-y rounded-xl border border-white/10 bg-[#060913]/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-cyan-400/60 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white whitespace-nowrap sm:w-auto accent-gradient-btn focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
