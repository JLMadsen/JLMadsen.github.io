import { Badge, Row } from "react-bootstrap";
import StyledTitle from "../styledTitle";
import WavyLink from "../wavyLink";

function Projects() {
	const data = require("../../data/projects.json");
	const isMobile = window.innerWidth < 750;
	let previousProject = null;

	const renderText = (project, isMobile, reversed) => {
		if (!project) return <div />;
		return (
			<div
				className={`${isMobile ? "w-100" : "w-50"} p${
					reversed ? "e" : "s"
				}-4`}
			>
				<h2>{project.name}</h2>
				{project.stack.map((tech) => (
					<Badge key={tech} bg="light" text="dark" className="m-1">
						{tech}
					</Badge>
				))}
				<br />
				<p>{project.description}</p>

				<WavyLink link={project.link} text={"Check it out!"} />
			</div>
		);
	};

	const renderImage = (project, isMobile, reversed) => {
		if (!project) return <div />;
		return !isMobile ? (
			<div
				className={`w-50`}
				style={{
					display: "flex",
					alignItems: "flex-end",
				}}
			>
				<img
					style={{
						height: "18vw",
						maxHeight: "270px",
						transform: `perspective(400px) rotate3D(0, -1, 0, ${
							reversed ? "" : "-"
						}8deg)`,
						boxShadow: `rgba(0, 0, 0, 0.5) ${
							reversed ? "" : "-"
						}10px 20px 40px`,
						margin: "0 40% 0 auto",
					}}
					src={project.image}
				/>
			</div>
		) : null;
	};

	return (
		<div>
			<Row className="justify-content-md-center mt-2">
				<StyledTitle title={"Projects"} />
				{[...data.projects, null].map((project, idx) => {
					const reversed = idx % 2 === 0;
					const text = renderText(
						previousProject,
						isMobile,
						reversed
					);
					const image = renderImage(project, isMobile, reversed);
					previousProject = project ?? null;
					return (
						<div
							key={project?.name ?? idx}
							className="mt-4 mb-4 ps-4 pe-4"
						>
							<div className="d-flex justify-content-between">
								{reversed ? (
									<>
										{text}
										{image}
									</>
								) : (
									<>
										{image}
										{text}
									</>
								)}
							</div>
						</div>
					);
				})}
			</Row>
		</div>
	);
}

export default Projects;
