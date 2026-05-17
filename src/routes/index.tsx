import SkillCard from "#/components/SkillCard";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Terminal } from "lucide-react";
import { skills } from "#/lib/skills";

export const Route = createFileRoute("/")({ component: App });

function App() {
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
          <Link to="/skills" className="btn-primary">
            <Terminal size={18} />
            <span>Browse Registry</span>
          </Link>
          <Link to="/skills/new" className="btn-secondary">
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
                <SkillCard
                  key={skill.id}
                  authorEmail={skill.authorEmail}
                  title={skill.title}
                  description={skill.description}
                  category={skill.category}
                  tags={skill.tags}
                  installCommand={skill.installCommand}
                  createdAt={skill.createdAt}
                  upvotes={skill.upvotes}
                  commentCount={skill.commentCount}
                />
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
