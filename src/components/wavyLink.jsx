function WavyLink({ link, text }) {
	return (
		<a
			href={link}
			target="_blank"
			style={{
				color: "#222",
				textDecoration: "#888 wavy underline .1em",
				fontSize: "larger",
			}}
		>
			{text}
		</a>
	);
}

export default WavyLink;
