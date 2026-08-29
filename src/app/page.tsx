import { ContactSection } from "@/components/ContactSection";
import { EducationSection } from "@/components/EducationSection";
import { Footer } from "@/components/Footer";
import { HeroBento } from "@/components/HeroBento";
import { PillNav } from "@/components/PillNav";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { SkillsSection } from "@/components/SkillsSection";
import { WorkSection } from "@/components/WorkSection";

export default function HomePage() {
  return (
    <>
      <PillNav />
      <main>
        <HeroBento />
        <WorkSection />
        <ServicesSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
