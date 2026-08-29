import { ArchitectureShowcase } from "@/components/ArchitectureShowcase";
import { ContactSection } from "@/components/ContactSection";
import { Education } from "@/components/Education";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { ProjectsBento } from "@/components/ProjectsBento";
import { SkillsGrid } from "@/components/SkillsGrid";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="hairline" />
        <ArchitectureShowcase />
        <div className="hairline" />
        <ExperienceTimeline />
        <div className="hairline" />
        <ProjectsBento />
        <div className="hairline" />
        <SkillsGrid />
        <div className="hairline" />
        <Education />
        <div className="hairline" />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
