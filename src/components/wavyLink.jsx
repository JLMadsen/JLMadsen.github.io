function WavyLink({ link, text }) {
	return (
		<a
			href={link}
			target="_blank"
			style={{
				color: "royalblue",
				textDecoration: "royalblue underline 2px",
				fontSize: "larger",
			}}
		>
			{text}
		</a>
	);
}

export default WavyLink;
