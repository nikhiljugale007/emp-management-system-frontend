const axios = require("axios");
const headers = {
	"Content-Type": "application/json",
};
export async function addEmpData(emp) {
	const response = await axios.post("http://localhost:4000/api", emp, {
		headers: headers,
	});

	return response;
}

export async function getAllEmpData(pageNo, pageSize, username) {
	const response = await axios.get(
		`http://localhost:4000/api?pageNo=${pageNo}&size=${pageSize}`,
		{
			data: {
				username: username,
			},
		},
		{
			headers: headers,
		}
	);
	return response;
}

export async function getAllEmpDataWithSearch(pageNo, pageSize, username) {
	const response = await axios.get(
		`http://localhost:4000/api/search?pageNo=${pageNo}&size=${pageSize}&username=${username}`,

		{
			headers: headers,
		}
	);
	return response;
}

export async function deleteEmpById(id) {
	const response = await axios.delete(`http://localhost:4000/api/${id}`, {
		headers: headers,
	});
	return response;
}

export async function getEmpById(id) {
	const response = await axios.get(`http://localhost:4000/api/${id}`, {
		headers: headers,
	});
	return response;
}

export async function updateEmp(emp) {
	console.log("call start");
	const response = await axios.patch(
		`http://localhost:4000/api/${emp._id}`,
		emp,
		{
			headers: headers,
		}
	);
	return response;
}
