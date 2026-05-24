import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { WorkDetailClient } from "@/components/sections/WorkDetailClient";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg relative z-10 text-primary-text">
      <Nav />
      <WorkDetailClient project={project} />
      <Footer />
    </div>
  );
}
