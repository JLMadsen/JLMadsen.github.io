import axios from "axios";
import { useEffect, useState } from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import StyledTitle from "../styledTitle";

function Medium() {
	const feedUrl =
		"https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@jakob.m";
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		(async () => {
			const response = await axios.get(feedUrl);
			setArticles(
				response?.data?.items?.map((item) => {
					return {
						guid: item.guid,
						link: item.link,
						date: item.pubDate,
						img: item.thumbnail,
						title: item.title,
						cats: item.categories,
					};
				})
			);
		})();
	}, []);

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
								href={article.link}
								style={{
									color: "black",
									textDecoration: "none",
								}}
							>
								<Card style={{border: "0px", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"}}>
									<Card.Img
										style={{ objectFit: "scale-down" }}
										variant="top"
										src={article.img}
										height={"300px"}
									/>
									<Card.Body>
										<Card.Title>{article.title}</Card.Title>
										<Card.Subtitle className="text-muted">
											{article.date}
										</Card.Subtitle>
										<Card.Text>
											{article.description}
										</Card.Text>
										{article.cats.map((category) => (
											<Badge
                                            key={category}
												bg="light" text="dark"
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
