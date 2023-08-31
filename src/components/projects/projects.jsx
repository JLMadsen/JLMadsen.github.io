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
					reversed || isMobile ? "e" : "s"
				}-4`}
				style={{ fontSize: "17px" }}
			>
				<h2>{project.name}</h2>
				{project.task ? (
					<h5 className="text-muted">{project.task}</h5>
				) : null}
				<div className="mb-2">
					{project.stack.map((tech) => (
						<Badge
							key={tech}
							bg="light"
							text="dark"
							className="m-1 ms-0 me-2"
						>
							{tech}
						</Badge>
					))}
				</div>
				<p>{project.description}</p>

				<WavyLink link={project.link} text={"Check it out!"} />
			</div>
		);
	};

	const renderImage = (project, isMobile, reversed) => {
		if (!project) return <div />;
		return (
			<div
				className={`${isMobile ? "w-100 mb-4" : "w-50 ms-4"}`}
				style={{
					display: "flex",
					alignItems: "flex-end",
				}}
			>
				<img
					style={{
						height: isMobile ? "160px" : "18vw",
						maxHeight: isMobile ? "400px" : "270px",
						transform: !isMobile
							? `perspective(400px) rotate3D(0, -1, 0, ${
									reversed ? "" : "-"
							  }8deg)`
							: null,
						boxShadow: `rgba(0, 0, 0, 0.5) ${
							reversed ? "" : "-"
						}10px 20px 40px`,
						margin: `${isMobile ? "auto" : "0 40% 0 auto"}`,
					}}
					src={project.image}
				/>
			</div>
		);
	};

	return (
		<div>
			<Row className="justify-content-md-center mt-2">
				<StyledTitle title={"Projects"} />
				{[...data.projects, null].map((project, idx) => {
					const reversed = idx % 2 === 0;
					const text = renderText(
						!isMobile ? previousProject : project,
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
							<div
								className={
									!isMobile
										? "d-flex justify-content-between"
										: ""
								}
							>
								{reversed && !isMobile ? (
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
