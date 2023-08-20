import { Row } from "react-bootstrap";
import StyledTitle from "../styledTitle";

function Skills() {
	const { skills } = require("../../data/skills.json");

	return (
		<Row className="justify-content-md-center mt-2">
			<StyledTitle title={"Skills"} />
			<div style={{ maxWidth: "720px" }}>
				{skills.map((skill) => {
					return skill.title;
				})}
			</div>{" "}
		</Row>
	);
}

export default Skills;
