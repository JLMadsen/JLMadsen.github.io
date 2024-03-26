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
					I'm Jakob Madsen, a software developer with two years of
					experience at Sopra Steria. I hold a bachelor's degree in
					computer science from NTNU, where I focused on ethical
					hacking in my thesis. Throughout my career, I have worked
					with organizations like Kripos and Vipps, specializing in
					fullstack development using .Net and React.
					<br />
					I actively engage in the software development community,
					attending events like NDC Oslo, writing technical articles,
					and participating in Advent of Code challenges.
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
