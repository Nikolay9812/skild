import { usePostHog } from "@posthog/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Terminal } from "lucide-react";
import SkillCard from "#/components/SkillCard";
import { dataConnect } from "#/lib/firebase";
import { createServerFn } from "@tanstack/react-start";
import { getSkills } from "#/dataconnect-generated";

const getSkillsFn = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { data } = await getSkills(dataConnect, {
      searchTerm: "",
      limit: 10,
    });

    return data.skills;
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
});

export const Route = createFileRoute("/")({
  component: App,
  loader: () => getSkillsFn(),
});

function App() {
  const posthog = usePostHog();

  const handleBrowseRegistry = () => {
    posthog.capture("browse_registry_clicked", { source: "hero" });
  };

  const handlePublishSkill = () => {
    posthog.capture("publish_skill_clicked", { source: "hero" });
  };

  const skills =  Route.useLoaderData();

  return (
    <div id="home">
      <section className="hero">
        <div className="copy">
          <h1>
            The Registry for <br />
            <span className="text-gradient">Agentic Intelligence</span>
          </h1>
          <p>
            Discover, share, and collaborate on agentic intelligence projects.{" "}
            <br />
            Explore a wide range of tools, frameworks, and resources to build
            the future of AI. <br />
            Join our community of innovators and contribute to the evolution of
            intelligent agents.
          </p>
        </div>

        <div className="actions">
          <Link
            to="/skills"
            className="btn-primary"
            onClick={handleBrowseRegistry}
          >
            <Terminal size={18} />
            <span>Browse Registry</span>
          </Link>
          <Link
            to="/skills/new"
            className="btn-secondary"
            onClick={handlePublishSkill}
          >
            Publish Skill
          </Link>
        </div>
      </section>

      <section className="latest">
        <div className="space-y-2">
          <h2>
            Recently Created <span className="text-gradient">Skills</span>
          </h2>
          <p>Check out the latest skills added to the registry.</p>
        </div>

        <div>
          {skills.length > 0 ? (
            <div className="skills-grid">
              {skills.map((skill) => (
                <SkillCard key={skill.id} {...skill} />
              ))}
            </div>
          ) : (
            <p>No skills found.</p>
          )}
        </div>
      </section>
    </div>
  );
}
