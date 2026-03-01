import { prisma } from "@/lib/db";

export type PublicProfile = {
  id: string;
  displayName: string;
  headline: string;
  subheadline: string;
  about: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  website: string | null;
  avatarUrl: string | null;
  heroBgUrl: string | null;
  cvUrl: string | null;
  socials: any | null;
};

export async function getProfile(): Promise<PublicProfile | null> {
  return prisma.profile.findFirst({
    select: {
      id: true,
      displayName: true,
      headline: true,
      subheadline: true,
      about: true,
      phone: true,
      email: true,
      address: true,
      website: true,
      avatarUrl: true,
      heroBgUrl: true,
      cvUrl: true,
      socials: true,
    },
  });
}

export async function getCategories() {
  return prisma.category.findMany({
    select: { id: true, name: true, slug: true },
    orderBy: { name: "asc" },
  });
}

export async function getProjects(opts?: { featured?: boolean }) {
  const where = opts?.featured ? { featured: true } : undefined;
  return prisma.project.findMany({
    where,
    select: {
      id: true,
      title: true,
      slug: true,
      type: true,
      description: true,
      year: true,
      client: true,
      tags: true,
      featured: true,
      thumbnailUrl: true,
      mediaUrl: true,
      categoryId: true,
      category: { select: { id: true, name: true, slug: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({
    where: { slug },
    select: {
      id: true,
      title: true,
      slug: true,
      type: true,
      description: true,
      year: true,
      client: true,
      tags: true,
      featured: true,
      thumbnailUrl: true,
      mediaUrl: true,
      categoryId: true,
      category: { select: { id: true, name: true, slug: true } },
    },
  });
}
