import React from 'react';
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import moment from 'moment';

const MATCH_QUERY = gql`
	query MatchAndHead2HeadQuery($match_id: Int!) {
		match_and_head2head(match_id: $match_id) {
      head2head {
        numberOfMatches,
        totalGoals,
        homeTeam {
            wins,
            draws,
            losses
        },
        awayTeam {
            wins,
            draws,
            losses
        }
      },
      match {
        id,
        competition {
          id,
          name,
          area {
            name,
            ensignUrl
          }
        },
        season {
          id,
          startDate,
          endDate,
          currentMatchday,
          winner
        },
        utcDate,
        status,
        venue,
        matchday,
        stage,
        group,
        lastUpdated,
        score {
          winner,
          duration,
          fullTime {
            homeTeam,
            awayTeam
          },
          halfTime {
            homeTeam,
            awayTeam
          },
          extraTime {
            homeTeam,
            awayTeam
          },
          penalties {
            homeTeam,
            awayTeam
          }
        },
        homeTeam {
          id,
          name
        },
        awayTeam {
          id,
          name
        },
        referees {
          id,
          name,
          nationality
        }
      }
    }
  }
`;

const MatchDetails = (props) => {
  const id = parseInt(props.match.params.id);

  const { loading, error, data } = useQuery(MATCH_QUERY, {
		variables: { match_id: id },
  });
  
  if (loading) return <p>Loading...</p>;
	if (error) {
		console.log(error);
		return <p>Error</p>;
	};

  const { match, head2head } = data.match_and_head2head;

  return (
		<div className="container bg-light">
			<div
				className="row bg-primary text-white justify-content-center"
				style={{ fontSize: "1.5rem" }}
			>
				<div>Match Details</div>
			</div>

			<table
				className="table table-light table-responsive-sm"
				style={{ fontSize: "1rem" }}
			>
				<tbody>
					<tr>
						<td>Competition</td>
						<td>
              <div className='mb-2'>{match.competition.name}</div>
							<div>
                {`${match.competition.area.name}`}
                <span className="m-1">
                  {match.competition.area.ensignUrl ? (
                    <img
                      src={match.competition.area.ensignUrl}
                      className="m-2"
                      style={{ height: "1rem" }}
                      alt="Competition Country Flag"
                    />
                  ) : null}
                </span>
              </div>
						</td>
					</tr>
					<tr>
						<td>Matchday</td>
						<td>{match.matchday}</td>
					</tr>
					<tr>
						<td>Match Date & Time</td>
						<td>{moment.utc(match.utcDate).toString()}</td>
					</tr>
					<tr>
						<td>Venue</td>
						<td>{match.venue}</td>
					</tr>
					{match.stage !== "REGULAR_SEASON" ? (
						<>
							<tr>
								<td>Stage</td>
								<td>{match.stage}</td>
							</tr>
							<tr>
								<td>Group</td>
								<td>{match.group}</td>
							</tr>
						</>
					) : null}
					<tr>
						<td>Home Team</td>
						<td>
							{match.homeTeam.name}
							<span className="mx-1 font-weight-bold">
								{match.score.winner === "HOME_TEAM" ? "(Winner)" : null}
							</span>
						</td>
					</tr>
					<tr>
						<td>Away Team</td>
						<td>
							<div>{match.awayTeam.name}</div>
							<div className="mx-2" style={{ width: "100%" }}>
								{match.score.winner === "AWAY_TEAM" ? "( Winner )" : null}
							</div>
						</td>
					</tr>
					<tr>
						<td>Referees</td>
						<td>
							{match.referees.map((referee, idx) => (
								<div className="m-1" key={idx}>
									{referee.name}
								</div>
							))}
						</td>
					</tr>
					{match.score.fullTime.homeTeam !== null ? (
						<tr>
							<td>Full Time</td>
							<td>
								{match.score.fullTime.homeTeam}
								<span className="mx-3">-</span>
								{match.score.fullTime.awayTeam}
							</td>
						</tr>
					) : null}
					{match.score.halfTime.homeTeam !== null ? (
						<tr>
							<td>Half Time</td>
							<td>
								{match.score.halfTime.homeTeam}
								<span className="mx-3">-</span>
								{match.score.halfTime.awayTeam}
							</td>
						</tr>
					) : null}
					{match.score.extraTime.homeTeam !== null ? (
						<tr>
							<td>Extra Time</td>
							<td>
								{match.score.extraTime.homeTeam}
								<span className="mx-3">-</span>
								{match.score.extraTime.awayTeam}
							</td>
						</tr>
					) : null}
					{match.score.penalties.homeTeam !== null ? (
						<tr>
							<td>Penalties</td>
							<td>
								{match.score.penalties.homeTeam}
								<span className="mx-3">-</span>
								{match.score.penalties.awayTeam}
							</td>
						</tr>
					) : null}
					<tr>
						<td>Last Updated</td>
						<td>{moment.utc(match.lastUpdated).toString()}</td>
					</tr>
				</tbody>
			</table>

			<div
				className="row bg-primary text-white justify-content-center"
				style={{ fontSize: "1.5rem" }}
			>
				<div>Head To Head</div>
			</div>
			<div className="container">
				<div className="row py-2">
					<div className="col">Number of Matches</div>
					<div className="col">{head2head.numberOfMatches}</div>
				</div>
				<div className="row py-2">
					<div className="col">Total Goals</div>
					<div className="col">{head2head.totalGoals}</div>
				</div>
        <table className='table'>
          <thead>
            <tr>
              <th />
              <th>Wins</th>
              <th>Draws</th>
              <th>Losses</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{match.homeTeam.name}</th>
              <td>{head2head.homeTeam.wins}</td>
              <td>{head2head.homeTeam.draws}</td>
              <td>{head2head.homeTeam.losses}</td>
            </tr>
            <tr>
              <th>{match.awayTeam.name}</th>
              <td>{head2head.awayTeam.wins}</td>
              <td>{head2head.awayTeam.draws}</td>
              <td>{head2head.awayTeam.losses}</td>
            </tr>
          </tbody>
        </table>
			</div>
		</div>
	);
}

export default MatchDetails
