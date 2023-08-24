import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import Fuse from "fuse.js";

export default function Table() {
	const [loading, setLoading] = useState(true);
	const [counList, setCounList] = useState([]);

	const columns = [

		{
			name: "Flags",
			cell: row => <img src={row.flags} width={50} alt=''></img>,
			selector: row => row.flags,
			width: '100px',
		},
		{
			name: "Country Name",
			selector: row => row.name,
			sortable: true,
		},
		{
			name: "2 Character Country Code",
			selector: row => row.cca2,
		},
		{
			name: "3 Character Country Code",
			selector: row => row.cca3,
		},
		{
			name: "Native Country Name",
			selector: row => row.name,
		},
		{
			name: "Alternative Country Name",
			selector: row => row.altSpellings,
		},
		{
			name: "Country Calling Codes",
			selector: row => row.idd,
		},
	];

	function getCounList() {
		fetch("https://restcountries.com/v3.1/all")
			.then(res => res.json())
			.then(counList => {
				const data = counList.map((value, index) => {
					return {
						flags: `${value.flags.png}`,
						name: `${value.name.official}`,
						cca2: `${value.cca2}`,
						cca3: `${value.cca3}`,
						nativeName: `${value.name.nativeName}`,
						altSpellings: `${value.altSpellings}`,
						idd: `${value.idd.root}`,
					};
				});

				setCounList(data);
			});
	}

	useEffect(() => {
		getCounList();
	}, []);

	useEffect(() => {
		if (counList.length > 0) {
			console.log(counList);
			setLoading(false);
		}
	}, [counList]);

	const paginationComponentOptions = {
		rowsPerPageText: 'Row Per Pages',
		rangeSeparatorText: 'of',
		selectAllRowsItem: true,
	};

	return (
		<div className="table">
			 <p className="title"> Countries List</p>
			<div className="search-container">
				<input
				type="search"
				onChange={(e) => getCounList(e.target.value)}
				placeholder="Search Country Name"
				/>
			</div>
			<DataTable
				// title="Counties List"
				striped
				columns={columns}
				data={counList}
				pagination
				paginationPerPage = {25}
				paginationComponentOptions={paginationComponentOptions}
				paginationRowsPerPageOptions={[25, 50, 100]}
				progressPending={loading}
				progressComponent={<h1>LOADING...</h1>}
				// selectableRows
				highlightOnHover
			/>
		</div>
	);
}
