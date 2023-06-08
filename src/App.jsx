import { Col, Container, Row } from "react-bootstrap";
import Medium from "./components/medium/medium";
import About from "./components/about/about";
import Projects from "./components/projects/projects";

function App() {
  return (
    <div  className="mt-4 mb-4">
    <Container style={{borderRadius: "5px", background: "#eee"}}>
      <Row className="justify-content-md-center">
        <Col xs lg="6" className="mt-3">
          <h1 style={{textAlign: "center"}}>Jakob Lønnerød Madsen</h1>
          <h4 style={{textAlign: "center"}} className="text-muted">Madsen Technologies</h4>
        </Col>
      </Row>
      <Row className="mt-4">
        <About />
      </Row>
      <Row>
        <Projects />
      </Row>
      <Row className="p-4">
        <Medium />
      </Row>
    </Container>
    </div>
  );
}

export default App;
