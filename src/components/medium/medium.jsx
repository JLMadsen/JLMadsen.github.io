import { Badge, Card, Col, Row } from "react-bootstrap";
import StyledTitle from "../styledTitle";

function Medium() {
	const articles = require("../../data/content.json").articles;

	return (
		<div>
			<Row className="justify-content-md-center mt-2">
				<StyledTitle title={"Articles"} />
			</Row>
			<Row xs={1} md={3} className="g-4">
				{articles.map((article) => {
					return (
						<Col key={article.guid} className="p-2">
							<a
								target="_blank"
								href={article.link}
								style={{
									color: "black",
									textDecoration: "none",
								}}
							>
								<Card
									style={{
										border: "0px",
										boxShadow:
											"rgba(149, 157, 165, 0.2) 0px 8px 24px",
									}}
								>
									<Card.Img
										style={{
											objectFit: "scale-down",
										}}
										variant="top"
										src={article.image}
										height={"250px"}
									/>
									<Card.Body>
										<Card.Title>{article.title}</Card.Title>
										<Card.Subtitle className="text-muted">
											{new Date(
												article.date
											).getFullYear()}
										</Card.Subtitle>
										<Card.Text>
											{article.description}
										</Card.Text>
										{article.categories.map((category) => (
											<Badge
												key={category}
												bg="light"
												text="dark"
												className="m-1"
											>
												{category}
											</Badge>
										))}
									</Card.Body>
								</Card>
							</a>
						</Col>
					);
				})}
			</Row>
		</div>
	);
}

export default Medium;
