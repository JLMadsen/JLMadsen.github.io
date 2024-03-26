import { Row } from "react-bootstrap";
import Contact from "../contact/contact";

function About() {
	return (
		<Row className="d-flex justify-content-md-center">
			<div style={{ maxWidth: "720px" }}>
				<div className="d-contents">
					<img
						height="200px"
						src="./images/jakob.png"
						style={{ float: "left" }}
					/>
				</div>
				<p style={{ textAlign: "justify" }}>
					I'm Jakob, a full-stack software developer currently working
					as a <abbr title="Overingeniør">Head Engineer</abbr> in the
					Norwegian Armed Forces. Previously I have worked at Sopra
					Steria on projects such as Sikker Chat for Kripos and
					Vipps.no for Vipps AS. I hold a bachelor's degree in
					computer science from NTNU where I focused on ethical
					hacking and system development.
					<br />
					In addition to my full-time role, I work part-time as a
					freelance developer at Madsen Technologies. This allows me
					to pursue continuous learning and deliver high-quality
					solutions while maintaining a passion for my work.
				</p>
				<Contact />
			</div>
		</Row>
	);
}

export default About;
