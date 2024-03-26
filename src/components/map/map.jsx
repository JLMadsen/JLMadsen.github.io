function Map() {
	return (
		<div
			style={{
				zIndex: "1",
				position: "absolute",
				right: "0",
				top: "-80px",
				userSelect: "none",
			}}
		>
			<img
				src="./images/map/norway.svg"
				style={{
					maxHeight: "40em",
					opacity: ".1",
					marginRight: "-200px",
				}}
			/>
			<div
				style={{
					position: "absolute",
					left: "128px",
					top: "545px",
					opacity: ".2",
				}}
			>
				<img
					src="./images/map/pin.svg"
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
