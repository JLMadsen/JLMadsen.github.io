import axios from "axios";
import { useEffect, useState } from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import StyledTitle from "../styledTitle";

function Medium() {
	const feedUrl =
		"https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@jakob.m";
	const [articles, setArticles] = useState([]);
	const altTitles = {
		"4fa8f8c5eb1c":
			"React-Leaflet 101: Bringing Interactive Maps to Your React Projects",
	};

	const altImages = {
		"4fa8f8c5eb1c":
			"https://miro.medium.com/v2/resize:fit:720/format:webp/1*jrmWnhURrTLnoTX2FdevQA.png",
		"6b192aa3de0b":
			"https://miro.medium.com/v2/resize:fit:720/format:webp/1*B2xrnv1NRc0Bf6vi_Q53vA.png",
		"14f459681a15":
			"https://miro.medium.com/v2/resize:fit:640/format:webp/1*K5s4mY1f0DP1h-rcYoMq5w.png",
	};

	useEffect(() => {
		(async () => {
			const response = await axios.get(feedUrl);
			setArticles(
				response?.data?.items?.map((item) => {
					return {
						guid: item.guid,
						link: item.link,
						date: item.pubDate,
						img:
							altImages[item.guid.split("/").pop()] ??
							item.thumbnail,
						title:
							altTitles[item.guid.split("/").pop()] ?? item.title,
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
										src={article.img}
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
										{article.cats.map((category) => (
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
