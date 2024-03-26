import { Row } from "react-bootstrap";

function StyledTitle({ title }) {
	return (
		<Row className="justify-content-md-center mt-2">
			<h2 style={{ fontFamily: "", textAlign: "center" }}>{title}</h2>
		</Row>
	);
}

export default StyledTitle;
