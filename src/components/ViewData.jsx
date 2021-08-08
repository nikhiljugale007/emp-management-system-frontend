import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import {
	Table,
	Box,
	Button,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	TextField,
} from "@material-ui/core/";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { deleteEmpById } from "../api/apicalls";
import { getAllEmpDataWithSearch } from "../api/apicalls";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SortIcon from "@material-ui/icons/Sort";
import ClipLoader from "react-spinners/ClipLoader";

const useStyles = makeStyles({
	table: {
		minWidth: 650,
		margin: 4,
	},
	root: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		border: "1px",
		margin: "20px",
		width: "95%",
	},
	tableRow: {
		textDecoration: "none",
		alignItems: "center",
		justifyContent: "center",
		"&:hover": {
			backgroundColor: "#92bce4 !important",
			cursor: "pointer",
		},
	},
});

export default function ViewData() {
	const classes = useStyles();
	const [emp_data, setEmpData] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(false);
	const [pageSize, setPageSize] = React.useState(10);
	const [pageNo, setPageNo] = React.useState(1);
	const [username, setUserName] = React.useState("");
	const [sortDirection, setSortDirection] = React.useState(true);
	React.useEffect(() => {
		setIsLoading(true);
		getAllEmpDataWithSearch(pageNo, pageSize, username)
			.then((response) => {
				setEmpData(response.data.data);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
				alert(err);
			});
	}, [pageNo, pageSize, username]);

	function deleteEmp(id) {
		deleteEmpById(id)
			.then((response) => {
				console.log(response);
				alert("Deletion Success");
			})
			.catch((err) => {
				console.log(err);
				alert(err.message);
			});
		window.location.reload();
	}
	const nextPage = () => {
		setPageNo((previous) => previous + 1);
	};
	const prevPage = () => {
		if (pageNo === 1) {
			alert("Page No cannot be 0");
		} else {
			setPageNo((previous) => previous - 1);
		}
	};

	const sortBySalary = () => {
		setSortDirection(!sortDirection);
		let sortedData = [...emp_data];
		sortedData.sort((a, b) => {
			if (a.emp_salary < b.emp_salary) {
				if (sortDirection) return -1;
				else return 1;
			}
			if (a.emp_salary > b.emp_salary) {
				if (sortDirection) return 1;
				else return -1;
			}
		});
		setEmpData(sortedData);
	};

	return (
		<TableContainer className={classes.root}>
			<Box m={2}>
				<Link to="/" style={{ textDecoration: "none" }}>
					<Button variant="contained" color="primary">
						Go To Home Page
					</Button>
				</Link>
			</Box>
			<hr />
			<Box m={2}>
				<Button variant="contained" color="primary">
					Employee Data
				</Button>
			</Box>
			<FormControl variant="outlined" style={{ width: "200px", margin: 8 }}>
				<InputLabel id="demo-simple-select-outlined-label">
					Page Size
				</InputLabel>
				<Select
					value={pageSize}
					onChange={(e) => {
						setPageSize(e.target.value);
						setPageNo(1);
					}}
					label="Team"
				>
					<MenuItem value={1}>1</MenuItem>
					<MenuItem value={5}>5</MenuItem>
					<MenuItem value={10}>10</MenuItem>
				</Select>
			</FormControl>
			<Box style={{ display: "flex", flexDirection: "row", margin: "10px" }}>
				<Button variant="outlined" color="primary" onClick={prevPage}>
					PREV
				</Button>
				<Button variant="outlined" color="primary" onClick={nextPage}>
					{pageNo}
				</Button>
				<Button variant="outlined" color="primary" onClick={nextPage}>
					NEXT
				</Button>
			</Box>
			<Box style={{ display: "flex", flexDirection: "row", margin: "10px" }}>
				<TextField
					variant="outlined"
					label="search"
					value={username}
					onChange={(e) => setUserName(e.target.value)}
				/>
				{/* <Button variant="outlined" color="primary">
					Search
				</Button> */}
			</Box>
			<Table className={classes.table} aria-label="a dense table" border={1}>
				<TableHead>
					<TableRow>
						<TableCell>Employee ID</TableCell>
						<TableCell>Name</TableCell>
						<TableCell onClick={sortBySalary} className={classes.tableRow}>
							<div
								style={{
									display: "flex",
								}}
							>
								<div style={{ marginRight: "10px" }}>Salary</div> <SortIcon />
							</div>
						</TableCell>
						<TableCell>Gender</TableCell>
						<TableCell>team</TableCell>
						<TableCell>address</TableCell>
						<TableCell>action EDIT</TableCell>
						<TableCell>action DELETE</TableCell>
					</TableRow>
				</TableHead>
				{isLoading ? (
					<div>Loading....</div>
				) : (
					<TableBody>
						{emp_data.map((row, index) => (
							<TableRow key={index}>
								<TableCell component="th" scope="row">
									{row._id}
								</TableCell>
								<TableCell align="left">{row.emp_name}</TableCell>
								<TableCell align="left">{row.emp_salary}</TableCell>
								<TableCell align="left">{row.emp_gender}</TableCell>
								<TableCell align="left">{row.emp_team}</TableCell>
								<TableCell align="left">{row.emp_address}</TableCell>
								<TableCell align="left" className={classes.tableRow}>
									<Link to={{ pathname: "edit", item: row }}>
										<EditIcon style={{ color: "#099215" }} />
									</Link>{" "}
								</TableCell>
								<TableCell
									align="left"
									className={classes.tableRow}
									onClick={() => deleteEmp(row._id)}
								>
									<DeleteIcon style={{ color: "#f50606" }} />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				)}
			</Table>
		</TableContainer>
	);
}
