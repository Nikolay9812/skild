import { SignIn } from "@clerk/tanstack-react-start";
import { usePostHog } from "@posthog/react";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/__auth/sign-in/$")({
	component: RouteComponent,
});

function RouteComponent() {
	const posthog = usePostHog();

	useEffect(() => {
		posthog.capture("sign_in_page_viewed");
	}, [posthog]);

	return (
		<section id="sign-in">
			<SignIn
				routing="path"
				path="/sign-in"
				signInUrl="/sign-up"
				fallbackRedirectUrl="/"
			/>
		</section>
	);
}
