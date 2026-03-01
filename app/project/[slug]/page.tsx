import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AnimatedBackdrop } from "@/components/AnimatedBackdrop";
import { SiteHeader } from "@/components/SiteHeader";
import { Container } from "@/components/Container";
import { getProfile, getProjectBySlug } from "@/lib/data";

export const dynamic = "force-dynamic";

function isYouTube(url: string) {
  return /youtube\.com|youtu\.be/.test(url);
}

function isVideoFile(url: string) {
  return /\.(mp4|webm|mov|m4v)$/i.test(url);
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const [profile, project] = await Promise.all([
    getProfile(),
    getProjectBySlug(params.slug),
  ]);

  if (!project || !profile) return notFound();

  const tags = (project.tags as unknown as string[] | null) || [];
  const media = project.mediaUrl || project.thumbnailUrl || "/assets/placeholder-design.jpg";

  return (
    <main className="relative min-h-screen">
      <AnimatedBackdrop imageUrl={profile.heroBgUrl} />
      <SiteHeader />

      <div className="relative pt-24 pb-16">
        <Container>
          <Link href="/#work" className="text-sm text-white/70 hover:text-white">
            ← Back to portfolio
          </Link>

          <div className="mt-6 grid lg:grid-cols-[1.2fr_0.8fr] gap-6 items-start">
            <div className="glass rounded-3xl neon-border overflow-hidden">
              <div className="relative aspect-[16/10] bg-black/20">
                {project.type === "VIDEO" && project.mediaUrl && isYouTube(project.mediaUrl) ? (
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={project.mediaUrl.replace("watch?v=", "embed/")}
                    title={project.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : project.type === "VIDEO" && project.mediaUrl && isVideoFile(project.mediaUrl) ? (
                  <video className="absolute inset-0 w-full h-full object-cover" controls>
                    <source src={project.mediaUrl} />
                  </video>
                ) : (
                  <Image
                    src={media}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                  />
                )}
              </div>
            </div>

            <div className="glass rounded-3xl neon-border p-6 md:p-8">
              <div className="text-xs uppercase tracking-[0.30em] text-white/55">
                {project.type} • {project.category?.name || "Uncategorized"}
              </div>
              <h1 className="mt-3 text-3xl md:text-4xl font-extrabold">{project.title}</h1>

              {project.description && (
                <p className="mt-4 text-white/70 leading-relaxed">
                  {project.description}
                </p>
              )}

              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                {project.year && (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-white/50 text-xs">Year</div>
                    <div className="mt-1 font-semibold">{project.year}</div>
                  </div>
                )}
                {project.client && (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-white/50 text-xs">Client</div>
                    <div className="mt-1 font-semibold">{project.client}</div>
                  </div>
                )}
              </div>

              {tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/75"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
}
