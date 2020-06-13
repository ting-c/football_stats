import React from 'react'

export default function Table({ group, stage, type, table }) {
  return (
		<div className="card">
			<div className="card-header bg-dark text-white ">
				<h1 className="mt-2 mb-1 d-flex justify-content-around" style={{ fontSize: "1rem" }}>
					<span>{ stage ? stage.replace("_", " ") : null }</span>
					<span>{ group ? group.replace("_", " ") : null }</span>
					<span>{ type ? type.replace("_", " ") : null }</span>
				</h1>
			</div>
			<table
				className="table table-light table-responsive-sm"
				style={{ fontSize: "1rem" }}
			>
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Team</th>
						<th scope="col">P</th>
						<th scope="col">W</th>
						<th scope="col">D</th>
						<th scope="col">L</th>
						<th scope="col">Pt</th>
						<th scope="col">GF</th>
						<th scope="col">GA</th>
						<th scope="col">GD</th>
					</tr>
				</thead>
				<tbody>
					{table.map((row) => {
						const {
							position,
							team,
							playedGames,
							won,
							draw,
							lost,
							points,
							goalsFor,
							goalsAgainst,
							goalDifference,
						} = row;
						return (
							<tr key={position}>
								<th scope="row">{position}</th>
								<td>{team.name}</td>
								<td>{playedGames}</td>
								<td>{won}</td>
								<td>{draw}</td>
								<td>{lost}</td>
								<td>{points}</td>
								<td>{goalsFor}</td>
								<td>{goalsAgainst}</td>
								<td>{goalDifference}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
