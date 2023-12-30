import { Row, Col } from "react-bootstrap";
import StyledTitle from "../styledTitle";

function Work() {
	const data = require("../../data/work.json");
	const isMobile = window.innerWidth < 780;

	if (isMobile) {
		return <></>;
	}

	const renderWork = (work) => {
		return (
			<>
				<div className="fs-4">{work.company} </div>
				<div className="fs-5">{work.location}</div>
				<div className="fs-5">{work.role}</div>
				<div className="fs-5">
					{work.from} - {work.to}
				</div>
			</>
		);
	};

	return (
		<div className="mt-4 mb-4">
			<StyledTitle title={"Work Experience"} />
			<Col className="mt-4" style={{ margin: "auto" }}>
				{[...data?.work, null].map((a, idx) => {
					if (a === null) return;
					return (
						<>
							<Row className="m-0 p-0">
								<Col className="d-flex m-0 p-0">
									{idx % 2 === 0 ? (
										<>
											<Col
												className="pe-4"
												style={{
													textAlign: "right",
													maxWidth:
														"calc(100% - 40px)",
												}}
											>
												{renderWork(a)}
											</Col>
											<Col style={{ maxWidth: "40px" }}>
												<Row
													className="h-50 m-0 p-0"
													style={{
														borderBottom:
															"2px solid #666",
													}}
												></Row>
											</Col>
										</>
									) : null}
								</Col>
								<Col
									style={{
										width: "2px",
										maxWidth: "2px",
										margin: "0px",
										padding: "0px",
										borderLeft: "2px solid #666",
									}}
								></Col>
								<Col className="d-flex m-0 p-0">
									{idx % 2 !== 0 ? (
										<>
											<Col style={{ maxWidth: "40px" }}>
												<Row
													className="h-50 m-0 p-0"
													style={{
														borderBottom:
															"2px solid #666",
													}}
												></Row>
											</Col>
											<Col
												className="ps-4"
												style={{
													maxWidth:
														"calc(100% - 40px)",
												}}
											>
												{renderWork(a)}
											</Col>
										</>
									) : null}
								</Col>
							</Row>
						</>
					);
				})}
			</Col>
		</div>
	);
}

export default Work;
