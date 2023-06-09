import { Col, Container, Row } from "react-bootstrap";
import Contact from "../contact/contact";

function About() {
	const workYears = () => {
		const now = new Date();
		const then = new Date(2021, 8, 1);
		return new Date(now - then).getFullYear() - 1970 + 1;
	};

	return (
		<Row className="d-flex justify-content-md-center">
			<div style={{ maxWidth: "720px" }}>
				<div className="d-contents">
					<img
						height="200px"
						src="./jakob.png"
						style={{ float: "left" }}
					/>
				</div>
				<p style={{ textAlign: "justify" }}>
					Jakob Madsen is an experienced consultant with {workYears()}{" "}
					years of full-stack .NET and React development experience.
					{/* He has worked on two significant projects, namely Project X
					and Project Y. In Project X, Jakob utilized his skills in
					Azure, React, .NET, Chat functionality, and antivirus
					integration. Project Y involved Django, Wagtail, React, and
					security implementation.*/}{" "}
					He holds a Bachelor's degree in Computer Science from NTNU,
					where he completed his thesis on ethical hacking. Jakob's
					expertise is strengthened by his attendance at Microsoft
					University and relevant certifications. His broad skill set
					includes proficiency in software development, front-end and
					back-end web development, cloud computing, chat
					functionality integration, antivirus integration, and
					security implementation.
				</p>
				<Contact />
			</div>
		</Row>
	);
}

export default About;
