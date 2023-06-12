function Map() {
	return (
		<div
			style={{
				zIndex: "1",
				position: "absolute",
				right: "-200px",
				top: "-80px",
				userSelect: "none",
			}}
		>
			<img
				src="./images/norway.svg"
				style={{
					maxHeight: "40em",
					opacity: ".1",
				}}
			/>
			<div
				style={{
					position: "absolute",
					left: "127px",
					top: "545px",
					opacity: ".2",
				}}
			>
				<img
					src="./images/pin.svg"
					style={{
						filter: "saturate(100)",
						maxHeight: "2.4em",
						opacity: "2",
					}}
				/>
			</div>
		</div>
	);
}

export default Map;
