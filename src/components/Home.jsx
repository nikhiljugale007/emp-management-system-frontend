import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
	root: {
		minHeight: "100vh",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
});
const Home = () => {
	const classes = useStyles();
	return (
		<div>
			<div className={classes.root}>
				<Box m={2}>
					<Link to="/add" style={{ textDecoration: "none" }}>
						<Button variant="outlined" color="primary">
							Add Data
						</Button>{" "}
					</Link>
				</Box>
				<Box m={2}>
					<Link to="/view" style={{ textDecoration: "none" }}>
						<Button variant="outlined" color="primary">
							View Data
						</Button>
					</Link>
				</Box>
			</div>
		</div>
	);
};

export default Home;
