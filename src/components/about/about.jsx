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
					{/* Jakob Madsen is an experienced consultant with {workYears()}{" "}
					years of full-stack .NET and React development experience.
					{/* He has worked on two significant projects, namely Project X
					and Project Y. In Project X, Jakob utilized his skills in
					Azure, React, .NET, Chat functionality, and antivirus
					integration. Project Y involved Django, Wagtail, React, and
					security implementation.
					He holds a Bachelor's degree in Computer Science from NTNU,
					where he completed his thesis on ethical hacking. Jakob's
					expertise is strengthened by his attendance at Microsoft
					University and relevant certifications. His broad skill set
					includes proficiency in software development, front-end and
					back-end web development, cloud computing, chat
					functionality integration, antivirus integration, and
					security implementation. */}
					{/* Jakob Madsen is an experienced software developer currently
					employed at Sopra Steria for two years. With a bachelor's
					degree in computer science from NTNU where his thesis
					explored ethical hacking, Jakob has worked with
					organizations such as Kripos and Vipps, gaining expertise in
					fullstack development using .Net and React.
					<br />
					Jakob actively participates in the software development
					community, attending events like NDC Oslo, writing technical
					articles, and engaging in Advent of Code challenges.
					Additionally, he has attended Microsoft University and holds
					an Azure certification, showcasing his proficiency in
					developing cloud-based applications. Alongside his full-time
					role, he also works part-time as a freelance developer at
					Madsen Technologies, showcasing his passion for continuous
					learning and commitment to delivering high-quality
					solutions. */}
					I'm Jakob Madsen, a software developer with two years of
					experience at Sopra Steria. I hold a bachelor's degree in
					computer science from NTNU, where I focused on ethical
					hacking in my thesis. Throughout my career, I have worked
					with organizations like Kripos and Vipps, specializing in
					fullstack development using .Net and React.
					<br />
					I actively engage in the software development community,
					attending events like NDC Oslo, writing technical articles,
					and participating in Advent of Code challenges. I have also
					attended Microsoft University and hold an Azure
					certification, showcasing my expertise in developing
					cloud-based applications.
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
