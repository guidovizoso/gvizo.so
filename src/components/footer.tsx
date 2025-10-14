import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
	return (
		<footer className="relative sticky bottom-0 z-0 w-full overflow-hidden bg-primary px-6 pt-32 pb-24 text-white md:px-16 lg:px-20">
			<div className="relative z-10 mx-auto flex w-full max-w-screen-2xl flex-col items-start text-card">
				<div>
					<h2 className="font-bold font-serif text-2xl">G</h2>
				</div>
				<div className="mt-8 flex w-full flex-col justify-between gap-4 md:mt-4 md:flex-row md:items-center">
					<ul className="flex flex-row items-center gap-6">
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/posts">Articles</Link>
						</li>
						<li>
							<a
								href="https://www.linkedin.com/in/guidovizoso/"
								rel="noopener noreferrer"
								target="_blank"
							>
								LinkedIn <ArrowUpRight className="inline-block size-4" />
							</a>
						</li>
						<li>
							<a
								href="https://github.com/guidovizoso"
								rel="noopener noreferrer"
								target="_blank"
							>
								Github <ArrowUpRight className="inline-block size-4" />
							</a>
						</li>
					</ul>
					<p className="text-sm">
						Proudly made in Buenos Aires, Argentina 🇦🇷 -{" "}
						{new Date().getFullYear()}
					</p>
				</div>
			</div>
		</footer>
	);
}
