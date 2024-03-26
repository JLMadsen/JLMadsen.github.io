import { Col } from "react-bootstrap";
import StyledTitle from "../styledTitle";

function Work() {
	const work = require("../../data/content.json").work;
	const isMobile = window.innerWidth < 780;

	return (
		<div className="mt-4 mb-4">
			<StyledTitle title={"Work"} />
			<Col className="mt-4" style={{ margin: "auto" }}>
				{[...work, null].map((w) => {
					if (w == null) return;
					return (
						<div
							className={`p-2 mb-4 shadow d-flex ${
								isMobile ? "w-100" : "w-50"
							}`}
							style={{
								borderRadius: "15px",
								background: "white",
								marginLeft: "auto",
								marginRight: "auto",
							}}
						>
							<div>
								<img
									src={w.image}
									style={{
										height: "100px",
										aspectRatio: "1",
										objectFit: "contain",
										padding: "5px",
										margin: isMobile ? "0px" : "10px",
									}}
									alt={`${w.company} logo`}
								/>
							</div>
							<div className="d-inline-block">
								<div className="fs-5 fw-bold">{w.role}</div>
								<div className="fs-5">{w.company}</div>
								<div className="fs-6">
									{w.from} - {w.to}
								</div>
								<div className="fs-6">{w.location}</div>
							</div>
						</div>
					);
				})}
			</Col>
		</div>
	);
}

export default Work;
