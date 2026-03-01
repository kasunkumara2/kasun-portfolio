import { PrismaClient, ProjectType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@local";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin1234";

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: { email: adminEmail, passwordHash, role: "ADMIN" },
  });

  await prisma.profile.upsert({
    where: { id: "default-profile" },
    update: {},
    create: {
      id: "default-profile",
      displayName: "G. Kasun Padma Kumara",
      headline: "Freelance Graphic Designer • Video Editor • Social Media Manager",
      subheadline:
        "Eye‑catching designs, fast‑paced cinematic short‑form videos, and strategy‑driven social media growth.",
      about:
        "Hi, I'm Kasun. I am a passionate Freelance Graphic Designer, Video Editor, and Social Media Manager. I specialize in helping businesses grow their online presence through eye‑catching graphic designs (Social Media Posts, Flyers, Menus), engaging short‑form videos (Reels/TikToks with fast‑paced and cinematic editing), and strategic social media management. I am looking to build a clean, modern, and attractive Portfolio Website to showcase my best designs and video edits to potential clients. The goal is to have a professional space where my creative work takes the spotlight.",
      phone: "+94 71 764 7693",
      email: "kasunpadmakumara2007@gmail.com",
      address: "46/A marambe, gatahaththa",
      website: "",
      avatarUrl: "/assets/kasun.jpg",
      heroBgUrl: "/assets/anime-bg.jpg",
      cvUrl: "/assets/Kasun_CV.pdf",
      socials: {
        facebook: "",
        instagram: "",
        behance: "",
        youtube: "",
        tiktok: ""
      },
    },
  });

  const categories = [
    { name: "Graphic Design", slug: "graphic-design" },
    { name: "Photography", slug: "photography" },
    { name: "Videography", slug: "videography" },
  ];

  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name },
      create: c,
    });
  }

  const catDesign = await prisma.category.findUnique({ where: { slug: "graphic-design" } });
  const catPhoto = await prisma.category.findUnique({ where: { slug: "photography" } });
  const catVideo = await prisma.category.findUnique({ where: { slug: "videography" } });

  const samples = [
    {
      title: "Social Media Post Pack",
      type: ProjectType.DESIGN,
      categoryId: catDesign?.id,
      description: "A clean, bold post set designed for engagement and brand consistency.",
      thumbnailUrl: "/assets/placeholder-design.jpg",
      mediaUrl: "/assets/placeholder-design.jpg",
      tags: ["Social Media", "Branding", "Poster"],
      featured: true,
      year: "2024",
      client: "Sample Client",
    },
    {
      title: "Flyer & Menu Design",
      type: ProjectType.DESIGN,
      categoryId: catDesign?.id,
      description: "Print-ready flyer and menu layout with strong hierarchy and readability.",
      thumbnailUrl: "/assets/placeholder-design.jpg",
      mediaUrl: "/assets/placeholder-design.jpg",
      tags: ["Flyer", "Menu", "Print"],
      featured: false,
      year: "2024",
      client: "Sample Client",
    },
    {
      title: "Outdoor Portrait Session",
      type: ProjectType.PHOTO,
      categoryId: catPhoto?.id,
      description: "Natural-light portraits with careful composition and color grading.",
      thumbnailUrl: "/assets/placeholder-photo.jpg",
      mediaUrl: "/assets/placeholder-photo.jpg",
      tags: ["Portrait", "Outdoor", "Lightroom"],
      featured: true,
      year: "2024",
      client: "Personal",
    },
    {
      title: "Event Photography Highlights",
      type: ProjectType.PHOTO,
      categoryId: catPhoto?.id,
      description: "High-quality event captures with fast turnaround and consistent edits.",
      thumbnailUrl: "/assets/placeholder-photo.jpg",
      mediaUrl: "/assets/placeholder-photo.jpg",
      tags: ["Event", "Highlights", "Color"],
      featured: false,
      year: "2024",
      client: "Sample Client",
    },
    {
      title: "Cinematic Reels Edit",
      type: ProjectType.VIDEO,
      categoryId: catVideo?.id,
      description: "Fast-paced edit with beat cuts, speed ramps, and cinematic color.",
      thumbnailUrl: "/assets/placeholder-video.jpg",
      mediaUrl: "",
      tags: ["Reels", "TikTok", "CapCut"],
      featured: true,
      year: "2024",
      client: "Sample Client",
    },
    {
      title: "Short-form Product Promo",
      type: ProjectType.VIDEO,
      categoryId: catVideo?.id,
      description: "High-retention product promo with hook-first storytelling.",
      thumbnailUrl: "/assets/placeholder-video.jpg",
      mediaUrl: "",
      tags: ["Promo", "Hook", "Story"],
      featured: false,
      year: "2024",
      client: "Sample Client",
    },
  ];

  for (const p of samples) {
    const slug = slugify(p.title);
    await prisma.project.upsert({
      where: { slug },
      update: {
        ...p,
        slug,
      },
      create: {
        ...p,
        slug,
      },
    });
  }

  console.log("✅ Seed complete");
  console.log("Admin login:");
  console.log("  email:", adminEmail);
  console.log("  password:", adminPassword);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
