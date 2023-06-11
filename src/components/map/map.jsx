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
					maxHeight: "50vh",
					opacity: ".1",
				}}
			/>
			<div
				style={{
					position: "absolute",
					left: "128px",
					top: "550px",
					opacity: ".2",
				}}
			>
				<img
					src="./images/pin.svg"
					style={{
						filter: "saturate(100)",
						maxHeight: "3vh",
						opacity: "2",
					}}
				/>
			</div>
		</div>
	);
}

export default Map;
