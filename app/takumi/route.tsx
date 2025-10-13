import ImageResponse from "@takumi-rs/image-response";

function OgImage({ title }: { title: string }) {
	return (
		<div>
			<h1>Hello from {title}!</h1>
		</div>
	);
}

export function GET(request: Request) {
	return new ImageResponse(<OgImage title="Next.js" />, {
		width: 1200,
		height: 630,
	});
}
