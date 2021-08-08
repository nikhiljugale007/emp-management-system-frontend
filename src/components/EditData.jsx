import React from "react";
import {
	TextField,
	Button,
	Box,
	FormControl,
	FormControlLabel,
	RadioGroup,
	FormLabel,
	Radio,
	InputLabel,
	MenuItem,
	Select,
	Grid,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { updateEmp } from "../api/apicalls";
import { useHistory, Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: "100vh",
		display: "flex",
		flexDirection: "column",
		margin: "20px",
	},
	root2: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
}));

function EditData(props) {
	const classes = useStyles();
	const history = useHistory();
	const [isLoading, setIsLoading] = React.useState(false);

	const [data, setData] = React.useState(props.location.item);

	const submitData = () => {
		if (
			data.emp_name === "" ||
			data.emp_salary === "" ||
			data.emp_address === "" ||
			data.emp_gender === "" ||
			data.emp_team === ""
		) {
			alert("All feilds are compulsary");
		} else {
			console.log(data);
			setIsLoading(true);

			updateEmp(data)
				.then((response) => {
					setIsLoading(false);
					console.log(response);
					alert("Data updated  successfully");
					history.push("/view");
				})
				.catch((error) => {
					console.log(error);
					alert(error);
					history.push("/view");
				});
		}
	};
	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				<Grid item md={6} sm={12}>
					<TextField
						id="outlined-basic"
						fullWidth
						label="Name"
						variant="outlined"
						value={data.emp_name}
						onChange={(e) =>
							setData((previous) => ({
								...previous,
								emp_name: e.target.value,
							}))
						}
					/>
				</Grid>
				<Grid item md={6} sm={12}>
					<TextField
						id="outlined-basic"
						fullWidth
						label="Salary"
						variant="outlined"
						value={data.emp_salary}
						onChange={(e) =>
							setData((previous) => ({
								...previous,
								emp_salary: e.target.value,
							}))
						}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="outlined-basic"
						fullWidth
						label="Address"
						variant="outlined"
						value={data.emp_address}
						onChange={(e) =>
							setData((previous) => ({
								...previous,
								emp_address: e.target.value,
							}))
						}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					md={3}
					style={{ display: "flex", flexDirection: "column" }}
				>
					<FormControl variant="outlined">
						<InputLabel id="demo-simple-select-outlined-label">Team</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							value={data.emp_team}
							onChange={(e) =>
								setData((previous) => ({
									...previous,
									emp_team: e.target.value,
								}))
							}
							label="Team"
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							<MenuItem value={"team_a"}>Team A</MenuItem>
							<MenuItem value={"team_b"}>Team B</MenuItem>
							<MenuItem value={"team_c"}>Team C</MenuItem>
						</Select>
					</FormControl>
					<FormControl component="fieldset" style={{ marginTop: "10px" }}>
						<FormLabel component="legend">Gender</FormLabel>
						<RadioGroup
							aria-label="gender"
							name="gender1"
							value={data.emp_gender}
							onChange={(e) =>
								setData((previous) => ({
									...previous,
									emp_gender: e.target.value,
								}))
							}
						>
							<FormControlLabel value="male" control={<Radio />} label="Male" />
							<FormControlLabel
								value="female"
								control={<Radio />}
								label="Female"
							/>
							<FormControlLabel
								value="other"
								control={<Radio />}
								label="Other"
							/>
						</RadioGroup>
					</FormControl>
					<div>
						{isLoading ? (
							<ClipLoader color="#1cc0dd" loading={isLoading} size={150} />
						) : (
							<Box style={{ margin: "10px 0px" }}>
								<Button
									variant="contained"
									color="primary"
									onClick={submitData}
								>
									Submit
								</Button>
							</Box>
						)}
					</div>
					<Link to="/" style={{ textDecoration: "none", margin: "10px  0px" }}>
						<Button variant="contained" color="primary">
							Go To Home Page
						</Button>
					</Link>
				</Grid>
			</Grid>
		</div>
	);
}

export default EditData;
