import { Col, Container, Row } from "react-bootstrap";
import Medium from "./components/medium/medium";
import About from "./components/about/about";
import Projects from "./components/projects/projects";
import Map from "./components/map/map";
import { useEffect, useReducer } from "react";
// import Contact from "./components/contact/contact";

function App() {
	const forceUpdate = useReducer((x) => x + 1, 0)[1];
	const isMobile = window.innerWidth < 750;

	useEffect(() => {
		window.addEventListener("resize", forceUpdate, false);
	}, []);

	return (
		<div className="mt-4 mb-4">
			<Container
				style={{
					borderRadius: "5px",
					background: "#eee",
					color: "#444",
					position: "relative",
					overflow: "hidden",
				}}
			>
				{!isMobile && <Map />}
				<Row className="justify-content-md-center z-3">
					<Col xs lg="6" className="mt-3">
						<h1 style={{ textAlign: "center" }}>
							Jakob Lønnerød Madsen
						</h1>
						<h4
							style={{ textAlign: "center" }}
							className="text-muted"
						>
							Madsen Technologies
						</h4>
					</Col>
				</Row>
				<Row className="mt-4 z-3">
					<About />
				</Row>
				<Row>
					<Projects />
				</Row>
				<Row className="p-4 z-3">
					<Medium />
				</Row>
			</Container>
		</div>
	);
}

export default App;
