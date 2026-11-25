import {useState} from 'react';
import {motion} from 'motion/react';
import {
  Code2,
  Layout,
  Server,
  BrainCircuit,
  Cpu,
  Database,
  Wrench,
  Pencil,
  Plus,
  X,
  RotateCcw,
  Check,
} from 'lucide-react';
import type {SkillCategory} from '../data/portfolioData';

interface SkillsSectionProps {
  skills: SkillCategory[];
  onAddSkill: (categoryId: string, item: string) => void;
  onRemoveSkill: (categoryId: string, item: string) => void;
  onResetSkills: () => void;
}

const ICON_MAP = {
  code: Code2,
  layout: Layout,
  server: Server,
  brain: BrainCircuit,
  cpu: Cpu,
  database: Database,
  wrench: Wrench,
};

export default function SkillsSection({
  skills,
  onAddSkill,
  onRemoveSkill,
  onResetSkills,
}: SkillsSectionProps) {
  const [editMode, setEditMode] = useState(false);
  const [draftInputs, setDraftInputs] = useState<Record<string, string>>({});

  const handleAddSubmit = (categoryId: string) => {
    const value = (draftInputs[categoryId] ?? '').trim();
    if (!value) return;
    onAddSkill(categoryId, value);
    setDraftInputs((prev) => ({...prev, [categoryId]: ''}));
  };

  return (
    <section
      id="skills"
      className="border-b border-white/[0.07] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-widest uppercase text-cyan-400">
              Technical Capabilities
            </p>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Skills &amp; Engineering Toolkit
            </h2>
            <p className="mt-3 text-base text-slate-300">
              Core languages, frameworks, and tools across software development, artificial intelligence, and data systems.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start md:self-auto">
            {editMode && (
              <button
                type="button"
                onClick={onResetSkills}
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
                  <span>Edit Skills</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((category, index) => {
            const Icon = ICON_MAP[category.iconKey];
            const draftValue = draftInputs[category.id] ?? '';

            return (
              <motion.div
                key={category.id}
                initial={{opacity: 0, y: 18}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, margin: '-60px'}}
                transition={{
                  duration: 0.4,
                  delay: Math.min(index * 0.04, 0.2),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="glass-surface glass-surface-hover flex flex-col justify-between rounded-2xl p-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/25 bg-gradient-to-br from-blue-600/20 via-violet-600/15 to-cyan-500/15 text-cyan-300">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="truncate font-display text-lg font-semibold text-white">
                        {category.category}
                      </h3>
                    </div>
                    <span className="font-mono text-xs tabular-nums text-slate-400 shrink-0">
                      {category.items.length}
                    </span>
                  </div>

                  {/* Clean Unboxed Technology List */}
                  <ul className="mt-4 divide-y divide-white/[0.05]">
                    {category.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center justify-between gap-3 py-2.5 text-sm text-slate-200"
                      >
                        <span>{item}</span>
                        {editMode && (
                          <button
                            type="button"
                            onClick={() => onRemoveSkill(category.id, item)}
                            aria-label={`Remove ${item} from ${category.category}`}
                            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-rose-500/15 hover:text-rose-300 focus-visible:outline-2 focus-visible:outline-cyan-400"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </li>
                    ))}
                    {category.items.length === 0 && (
                      <li className="py-3 text-xs text-slate-500">
                        No technologies added yet.
                      </li>
                    )}
                  </ul>
                </div>

                {editMode && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAddSubmit(category.id);
                    }}
                    className="mt-4 flex items-center gap-2 border-t border-white/[0.08] pt-4"
                  >
                    <input
                      type="text"
                      value={draftValue}
                      onChange={(e) =>
                        setDraftInputs((prev) => ({
                          ...prev,
                          [category.id]: e.target.value,
                        }))
                      }
                      placeholder="Add technology..."
                      aria-label={`Add technology to ${category.category}`}
                      className="min-w-0 flex-1 rounded-lg border border-white/10 bg-[#060913]/80 px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-cyan-400/60 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="inline-flex h-9 shrink-0 items-center gap-1 rounded-lg border border-cyan-400/35 bg-cyan-400/15 px-3 text-xs font-medium text-cyan-200 transition-colors hover:bg-cyan-400/25 focus-visible:outline-2 focus-visible:outline-cyan-400"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add</span>
                    </button>
                  </form>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
