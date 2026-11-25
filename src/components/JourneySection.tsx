import {useState} from 'react';
import {motion} from 'motion/react';
import {Pencil, Plus, Trash2, RotateCcw, Check} from 'lucide-react';
import type {JourneyMilestone} from '../data/portfolioData';

interface JourneySectionProps {
  journey: JourneyMilestone[];
  onAddMilestone: (milestone: Omit<JourneyMilestone, 'id'>) => void;
  onUpdateMilestone: (milestone: JourneyMilestone) => void;
  onRemoveMilestone: (id: string) => void;
  onResetJourney: () => void;
}

export default function JourneySection({
  journey,
  onAddMilestone,
  onUpdateMilestone,
  onRemoveMilestone,
  onResetJourney,
}: JourneySectionProps) {
  const [editMode, setEditMode] = useState(false);
  const [newPeriod, setNewPeriod] = useState('');
  const [newContext, setNewContext] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;
    onAddMilestone({
      period: newPeriod.trim() || 'Milestone',
      context: newContext.trim() || 'Engineering',
      title: newTitle.trim(),
      description: newDescription.trim(),
    });
    setNewPeriod('');
    setNewContext('');
    setNewTitle('');
    setNewDescription('');
  };

  return (
    <section
      id="journey"
      className="border-b border-white/[0.07] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-widest uppercase text-cyan-400">
              My Journey
            </p>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Academic Foundation &amp; Engineering Growth
            </h2>
            <p className="mt-3 text-base text-slate-300">
              Key milestones from studying Computer Science Engineering to building AI-powered applications for real-world problems.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start md:self-auto">
            {editMode && (
              <button
                type="button"
                onClick={onResetJourney}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-slate-300 whitespace-nowrap shrink-0 transition-colors hover:border-white/25 hover:text-white focus-visible:outline-2 focus-visible:outline-cyan-400"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setEditMode((prev) => !prev)}
              className={`inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border px-3.5 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                editMode
                  ? 'border-cyan-400/50 bg-cyan-400/15 text-cyan-200'
                  : 'border-white/15 bg-white/[0.03] text-slate-200 hover:border-cyan-400/40 hover:text-white'
              }`}
            >
              {editMode ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Done Editing</span>
                </>
              ) : (
                <>
                  <Pencil className="h-3.5 w-3.5" />
                  <span>Edit Journey</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Hairline Timeline Layout (Zero thick left borders) */}
        <div className="relative mt-12">
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-4 hidden w-px bg-gradient-to-b from-cyan-400/50 via-blue-500/35 to-violet-500/20 sm:block"
          />

          <div className="space-y-6">
            {journey.map((milestone, index) => (
              <motion.div
                key={milestone.id}
                initial={{opacity: 0, y: 18}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, margin: '-60px'}}
                transition={{
                  duration: 0.4,
                  delay: Math.min(index * 0.05, 0.2),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative sm:pl-12"
              >
                {/* Structural Step Marker */}
                <span
                  aria-hidden="true"
                  className="absolute top-6 left-1.5 hidden h-5 w-5 items-center justify-center rounded-full border border-cyan-400/50 bg-[#060913] font-mono text-[10px] font-medium tabular-nums text-cyan-300 sm:flex"
                >
                  {index + 1}
                </span>

                <div className="glass-surface glass-surface-hover rounded-2xl p-6">
                  {editMode ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <input
                          type="text"
                          value={milestone.period}
                          onChange={(e) =>
                            onUpdateMilestone({
                              ...milestone,
                              period: e.target.value,
                            })
                          }
                          aria-label="Milestone period or stage"
                          placeholder="Stage / Year"
                          className="rounded-lg border border-white/10 bg-[#060913]/80 px-3 py-2 text-xs text-white focus:border-cyan-400/60 focus:outline-none"
                        />
                        <input
                          type="text"
                          value={milestone.context}
                          onChange={(e) =>
                            onUpdateMilestone({
                              ...milestone,
                              context: e.target.value,
                            })
                          }
                          aria-label="Milestone context"
                          placeholder="Category / Context"
                          className="rounded-lg border border-white/10 bg-[#060913]/80 px-3 py-2 text-xs text-white focus:border-cyan-400/60 focus:outline-none"
                        />
                      </div>
                      <input
                        type="text"
                        value={milestone.title}
                        onChange={(e) =>
                          onUpdateMilestone({
                            ...milestone,
                            title: e.target.value,
                          })
                        }
                        aria-label="Milestone title"
                        placeholder="Title"
                        className="w-full rounded-lg border border-white/10 bg-[#060913]/80 px-3 py-2 text-sm font-semibold text-white focus:border-cyan-400/60 focus:outline-none"
                      />
                      <textarea
                        rows={2}
                        value={milestone.description}
                        onChange={(e) =>
                          onUpdateMilestone({
                            ...milestone,
                            description: e.target.value,
                          })
                        }
                        aria-label="Milestone description"
                        placeholder="Description"
                        className="w-full rounded-lg border border-white/10 bg-[#060913]/80 px-3 py-2 text-sm text-slate-200 focus:border-cyan-400/60 focus:outline-none"
                      />
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => onRemoveMilestone(milestone.id)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-300 transition-colors hover:bg-rose-500/20"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Remove Milestone</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                        <span className="font-mono font-medium text-cyan-300">
                          {milestone.period}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{milestone.context}</span>
                      </div>

                      <h3 className="mt-2 font-display text-xl font-semibold text-white">
                        {milestone.title}
                      </h3>

                      <p className="mt-2.5 text-sm leading-relaxed text-slate-300 sm:text-base">
                        {milestone.description}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Add New Milestone Form in Edit Mode */}
          {editMode && (
            <form
              onSubmit={handleAdd}
              className="mt-6 rounded-2xl border border-dashed border-cyan-400/30 bg-white/[0.02] p-6 sm:ml-12"
            >
              <p className="font-display text-sm font-semibold text-white">
                Add New Journey Milestone or Achievement
              </p>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  value={newPeriod}
                  onChange={(e) => setNewPeriod(e.target.value)}
                  placeholder="Stage or Year (e.g. 2026)"
                  className="rounded-lg border border-white/10 bg-[#060913]/80 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400/60 focus:outline-none"
                />
                <input
                  type="text"
                  value={newContext}
                  onChange={(e) => setNewContext(e.target.value)}
                  placeholder="Context (e.g. Hackathon / Project)"
                  className="rounded-lg border border-white/10 bg-[#060913]/80 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400/60 focus:outline-none"
                />
              </div>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Milestone Title"
                required
                className="mt-3 w-full rounded-lg border border-white/10 bg-[#060913]/80 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400/60 focus:outline-none"
              />
              <textarea
                rows={2}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Describe what you built or learned..."
                required
                className="mt-3 w-full rounded-lg border border-white/10 bg-[#060913]/80 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400/60 focus:outline-none"
              />
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold text-white accent-gradient-btn"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Milestone</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
