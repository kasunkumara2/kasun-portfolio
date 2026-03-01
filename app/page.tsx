import { AnimatedBackdrop } from "@/components/AnimatedBackdrop";
import { SiteHeader } from "@/components/SiteHeader";
import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { SectionTitle } from "@/components/SectionTitle";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { getCategories, getProfile, getProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Page() {
  const profile = await getProfile();

  if (!profile) {
    return (
      <div className="min-h-screen grid place-items-center text-white/70">
        No profile found. Run DB migrate + seed.
      </div>
    );
  }

  const categories = await getCategories();
  const projects = await getProjects();

  return (
    <main className="relative min-h-screen">
      <AnimatedBackdrop imageUrl={profile.heroBgUrl} />
      <SiteHeader />

      <div className="relative">
        <Hero profile={profile} />

        <Container>
          <SectionTitle
            eyebrow="What I do"
            title="Services"
            subtitle="Design that pops, edits that hold attention, and a social strategy that grows brands."
          />
          <Services />

          <SectionTitle
            eyebrow="Portfolio"
            title="Featured Work"
            subtitle="A selection of my design, photography, and video projects. Filter by category."
          />
          <Portfolio categories={categories} projects={projects} />

          <SectionTitle
            eyebrow="About"
            title="Creative story"
            subtitle="A quick look at my background, skills, and how I work with clients."
          />
          <About profile={profile} />

          <SectionTitle
            eyebrow="Contact"
            title="Let’s work together"
            subtitle="Tell me about your project. I’ll respond with a clear plan and timeline."
          />
          <Contact email={profile.email} phone={profile.phone} />
        </Container>

        <Footer profile={profile} />
      </div>
    </main>
  );
}
