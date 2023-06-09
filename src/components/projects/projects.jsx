import { Col, Row } from "react-bootstrap";
import StyledTitle from "../styledTitle";
import { useEffect, useState } from "react";
import axios from "axios";
import WavyLink from "../wavyLink";

function Projects() {
	const [projects, setProjects] = useState([]);
	const isMobile = window.innerWidth < 750;
	let previousProject = null;

	useEffect(() => {
		(async () => {
			const response = await axios.get("/projects.json");
			setProjects(response.data.projects);
		})();
	});

	const renderText = (project, isMobile) => {
		if (!project) return <div />;
		return (
			<div className={isMobile ? "w-100" : "w-50"}>
				<h2>{project.name}</h2>
				<p>{project.description}</p>
				<WavyLink link={project.link} text={"Check it out!"} />
			</div>
		);
	};

	const renderImage = (project, isMobile, reversed) => {
		if (!project) return <div />;
		return !isMobile ? (
			<div className="w-50">
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
				{[...projects, null].map((project, idx) => {
					const reversed = idx % 2 === 0;
					const text = renderText(previousProject, isMobile);
					const image = renderImage(project, isMobile, reversed);
					previousProject = project ?? null;
					return (
						<div
							key={project?.name ?? idx}
							className="ms-4 pe-4 mt-4 mb-4"
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
