import { Col, Container, Row } from "react-bootstrap";

function About() {
	return (
		<Row className="d-flex justify-content-md-center">
			<div style={{maxWidth: "720px"}}>
				<div>
					<img
						height="200px"
						src="./jakob.png"
						style={{ float: "left" }}
					/>
				</div>
				<p style={{ textAlign: "justify" }}>
                Jakob Madsen is an experienced consultant with 2 years of full-stack .NET and React development experience. He has worked on two significant projects, namely Project X and Project Y. In Project X, Jakob utilized his skills in Azure, React, .NET, Chat functionality, and antivirus integration. Project Y involved Django, Wagtail, React, and security implementation.

Jakob's expertise is further strengthened by his attendance at Microsoft University and relevant certifications. He holds a Bachelor's degree in Computer Science from NTNU, where he completed his thesis on ethical hacking. His broad skill set includes proficiency in software development, front-end and back-end web development, cloud computing, chat functionality integration, antivirus integration, and security implementation.
				</p>
			</div>

			{/* <Col>
                <p>
                    Jakob is VERY cool
                </p>
            </Col>
            <Col>
                <img height="200px" width="225px" src="./jakob.png" style={{borderRadius: "50%"}} />
            </Col> */}
		</Row>
	);
}

export default About;
