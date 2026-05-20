import { SignUp } from "@clerk/tanstack-react-start";
import { usePostHog } from "@posthog/react";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/__auth/sign-up/$")({
	component: RouteComponent,
});

function RouteComponent() {
	const posthog = usePostHog();

	useEffect(() => {
		posthog.capture("sign_up_page_viewed");
	}, [posthog]);

	return (
		<section id="sign-up">
			{" "}
			<SignUp
				routing="path"
				path="/sign-up"
				signInUrl="/sign-in"
				fallbackRedirectUrl="/"
			/>
		</section>
	);
}
