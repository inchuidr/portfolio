import {useEffect, useState} from 'react';
import {
  DEFAULT_PORTFOLIO_DATA,
  type JourneyMilestone,
  type PortfolioData,
  type PortfolioProfile,
  type ProjectItem,
} from './data/portfolioData';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import JourneySection from './components/JourneySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import CustomizeModal from './components/CustomizeModal';

const STORAGE_KEY = 'dev_portfolio_custom_v1';

function loadInitialData(): PortfolioData {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PORTFOLIO_DATA;
    const parsed = JSON.parse(raw) as Partial<PortfolioData>;
    return {
      profile: {...DEFAULT_PORTFOLIO_DATA.profile, ...(parsed.profile ?? {})},
      projects: parsed.projects ?? DEFAULT_PORTFOLIO_DATA.projects,
      skills: parsed.skills ?? DEFAULT_PORTFOLIO_DATA.skills,
      journey: parsed.journey ?? DEFAULT_PORTFOLIO_DATA.journey,
    };
  } catch {
    return DEFAULT_PORTFOLIO_DATA;
  }
}

export default function App() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(loadInitialData);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [customizeOpen, setCustomizeOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolioData));
    } catch {
      // Ignore storage quota errors in restricted browsing contexts
    }
  }, [portfolioData]);

  const handleAddSkill = (categoryId: string, item: string) => {
    setPortfolioData((prev) => ({
      ...prev,
      skills: prev.skills.map((category) => {
        if (category.id !== categoryId) return category;
        if (category.items.some((existing) => existing.toLowerCase() === item.toLowerCase())) {
          return category;
        }
        return {...category, items: [...category.items, item]};
      }),
    }));
  };

  const handleRemoveSkill = (categoryId: string, item: string) => {
    setPortfolioData((prev) => ({
      ...prev,
      skills: prev.skills.map((category) =>
        category.id === categoryId
          ? {...category, items: category.items.filter((s) => s !== item)}
          : category,
      ),
    }));
  };

  const handleResetSkills = () => {
    setPortfolioData((prev) => ({
      ...prev,
      skills: DEFAULT_PORTFOLIO_DATA.skills,
    }));
  };

  const handleAddMilestone = (milestone: Omit<JourneyMilestone, 'id'>) => {
    const newItem: JourneyMilestone = {
      ...milestone,
      id: `milestone-${Date.now()}`,
    };
    setPortfolioData((prev) => ({
      ...prev,
      journey: [...prev.journey, newItem],
    }));
  };

  const handleUpdateMilestone = (updated: JourneyMilestone) => {
    setPortfolioData((prev) => ({
      ...prev,
      journey: prev.journey.map((m) => (m.id === updated.id ? updated : m)),
    }));
  };

  const handleRemoveMilestone = (id: string) => {
    setPortfolioData((prev) => ({
      ...prev,
      journey: prev.journey.filter((m) => m.id !== id),
    }));
  };

  const handleResetJourney = () => {
    setPortfolioData((prev) => ({
      ...prev,
      journey: DEFAULT_PORTFOLIO_DATA.journey,
    }));
  };

  const handleSaveCustomize = (
    updatedProfile: PortfolioProfile,
    updatedProjectTechs: Record<string, string[]>,
  ) => {
    setPortfolioData((prev) => ({
      ...prev,
      profile: updatedProfile,
      projects: prev.projects.map((project) => ({
        ...project,
        technologies:
          updatedProjectTechs[project.id] && updatedProjectTechs[project.id].length > 0
            ? updatedProjectTechs[project.id]
            : project.technologies,
      })),
    }));
  };

  const handleResetAll = () => {
    setPortfolioData(DEFAULT_PORTFOLIO_DATA);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  return (
    <div className="bg-mesh-dark min-h-screen text-slate-100">
      <Navbar initials={portfolioData.profile.initials} />

      <main>
        <HeroSection
          profile={portfolioData.profile}
          projects={portfolioData.projects}
        />

        <AboutSection
          profile={portfolioData.profile}
          onOpenCustomize={() => setCustomizeOpen(true)}
        />

        <ProjectsSection
          projects={portfolioData.projects}
          onSelectProject={(project) => setActiveProject(project)}
        />

        <SkillsSection
          skills={portfolioData.skills}
          onAddSkill={handleAddSkill}
          onRemoveSkill={handleRemoveSkill}
          onResetSkills={handleResetSkills}
        />

        <JourneySection
          journey={portfolioData.journey}
          onAddMilestone={handleAddMilestone}
          onUpdateMilestone={handleUpdateMilestone}
          onRemoveMilestone={handleRemoveMilestone}
          onResetJourney={handleResetJourney}
        />

        <ContactSection
          profile={portfolioData.profile}
          onOpenCustomize={() => setCustomizeOpen(true)}
        />
      </main>

      <Footer
        profile={portfolioData.profile}
        onOpenCustomize={() => setCustomizeOpen(true)}
      />

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />

      <CustomizeModal
        isOpen={customizeOpen}
        profile={portfolioData.profile}
        projects={portfolioData.projects}
        onClose={() => setCustomizeOpen(false)}
        onSave={handleSaveCustomize}
        onResetAll={handleResetAll}
      />
    </div>
  );
}
