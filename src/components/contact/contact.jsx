import WavyLink from "../wavyLink";

function Contact() {
	const links = [
		{
			name: "Github",
			link: "https://github.com/JLMadsen",
		},
		{
			name: "LinkedIn",
			link: "https://www.linkedin.com/in/jakoblm/",
		},
	];
	return (
		<div>
			<h4>Connect with me on:</h4>
			<ul>
				{links.map((link) => {
					return (
						<li key={link.name} style={{ listStyle: "none" }}>
							<WavyLink link={link.link} text={link.name} />
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default Contact;
