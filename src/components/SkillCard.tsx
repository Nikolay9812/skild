import { usePostHog } from "@posthog/react";
import { Link } from "@tanstack/react-router";
import {
	ArrowBigUp,
	ArrowUpRight,
	Bookmark,
	Check,
	Copy,
	MessageSquare,
} from "lucide-react";
import { useState } from "react";
import type { SkillRecord } from "../../type.d";

type SkillCardProps = Omit<SkillRecord, "id" | "slug" | "authorClerkId">;

const SkillCard = ({
	authorEmail,
	title,
	description,
	createdAt,
	installCommand,
	category,
	upvotes,
	commentCount,
}: SkillCardProps) => {
	const [copied, setCopied] = useState(false);
	const posthog = usePostHog();
	const authorLabel = authorEmail ?? "Unknown author";
	const createdAtLabel = createdAt
		? new Date(createdAt).toLocaleDateString()
		: "Unknown date";

	const handleCopy = () => {
		navigator.clipboard.writeText(installCommand);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
		posthog.capture("skill_install_command_copied", {
			skill_title: title,
			skill_category: category,
			install_command: installCommand,
		});
	};

	const handleOpen = () => {
		posthog.capture("skill_opened", {
			skill_title: title,
			skill_category: category,
		});
	};

	const handleUpvote = () => {
		posthog.capture("skill_upvote_clicked", {
			skill_title: title,
			skill_category: category,
			current_upvotes: upvotes,
		});
	};
	return (
		<article className="skill-card">
			<Link
				to="/skills"
				tabIndex={-1}
				aria-label={`Open ${title}`}
				className="overlay"
			/>

			<div className="chrome">
				<div className="chrome-bar">
					<div className="lights">
						<div className="light red" />
						<div className="light amber" />
						<div className="light green" />
					</div>
					<div className="host">registry.sh</div>
				</div>
			</div>

			<div className="body">
				<div className="meta">
					<div className="author">
						<img src="/logo512.png" alt="author avatar" className="avatar" />
						<div className="author-copy">
							<p>{authorLabel}</p>
							<p>{createdAtLabel}</p>
						</div>
					</div>

					<p className="category">{category}</p>
				</div>

				<div className="summary">
					<Link to="/skills" className="title-link">
						<h3>{title}</h3>
					</Link>

					<p>{description}</p>
				</div>

				<div className="command">
					<div className="command-copy">
						<span>{">_"}</span>
						<p>{installCommand}</p>
					</div>
					<button
						type="button"
						className="copy"
						onClick={handleCopy}
						aria-label="Copy install command"
					>
						{copied ? <Check size={16} /> : <Copy size={16} />}
					</button>
				</div>

				<div className="footer">
					<div className="stats">
						<button
							type="button"
							className="upvote"
							disabled
							onClick={handleUpvote}
						>
							<ArrowBigUp size={16} fill="currentColor" />
							<span>{upvotes}</span>
						</button>

						<div className="comments">
							<MessageSquare size={14} />
							<span>{commentCount}</span>
						</div>
					</div>

					<div className="actions">
						<Link
							to="/skills"
							className="open"
							title={`Open ${title}`}
							onClick={handleOpen}
						>
							<span>Open</span>
							<ArrowUpRight size={14} />
						</Link>

						<button
							type="button"
							className="save"
							aria-label="Saved state"
							disabled
						>
							<Bookmark size={16} />
						</button>
					</div>
				</div>
			</div>
		</article>
	);
};

export default SkillCard;
