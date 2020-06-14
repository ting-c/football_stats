const axios = require('axios');
require("dotenv").config();

const { 
  GraphQLObjectType, 
  GraphQLInt, 
  GraphQLString, 
  GraphQLList, 
  GraphQLSchema, 
} = require('graphql');

const headers = { 'X-Auth-Token': process.env.REACT_APP_API_KEY };

// Competition Type
const CompetitionType = new GraphQLObjectType({
	name: "Competitions",
	fields: () => ({
		id: { type: GraphQLInt },
    area: { type: AreaType },
    name: { type: GraphQLString },
    plan: { type: GraphQLString },
    emblemUrl: { type: GraphQLString },
		currentSeason: { type: CurrentSeasonType },
		lastUpdated: { type: GraphQLString }
	}),
});

const AreaType = new GraphQLObjectType({
	name: "Area",
	fields: () => ({
		id: { type: GraphQLInt },
		name: { type: GraphQLString },
		countryCode: { type: GraphQLString },
		ensignUrl: { type: GraphQLString }
	}),
});

const CurrentSeasonType = new GraphQLObjectType({
  name: 'CurrentSeason',
  fields: () => ({
    id: { type: GraphQLInt },
    startDate: { type: GraphQLString },
    endDate: { type: GraphQLString },
    currentMatchday: { type: GraphQLString },
    winner: { type: WinnerType }
  })
});

const WinnerType = new GraphQLObjectType({
	name: "Winner",
	fields: () => ({
		id: { type: GraphQLInt },
		name: { type: GraphQLString },
		shortName: { type: GraphQLString },
		tla: { type: GraphQLString },
		crestUrl: { type: GraphQLString }
	}),
});

// Team Type
const TeamType = new GraphQLObjectType({
	name: "Teams",
	fields: () => ({
		id: { type: GraphQLInt },
		name: { type: GraphQLString },
		area: { type: AreaType },
		activeCompetitions: { type: new GraphQLList(CompetitionType) },
		crestUrl: { type: GraphQLString },
    website: { type: GraphQLString },
    founded: { type: GraphQLInt },
		venue: { type: GraphQLString },
	}),
});

const StandingType = new GraphQLObjectType({
	name: "Standing",
	fields: () => ({
		stage: { type: GraphQLString },
		type: { type: GraphQLString },
		group: { type: GraphQLString },
    table: { type: new GraphQLList(TableStatsType) }
	}),
});

const TableStatsType = new GraphQLObjectType({
	name: "TableStats",
	fields: () => ({
		position: { type: GraphQLInt },
		team: { type: TeamType },
		group: { type: GraphQLString },
		playedGames: { type: GraphQLInt },
		won: { type: GraphQLInt },
		draw: { type: GraphQLInt },
		lost: { type: GraphQLInt },
		points: { type: GraphQLInt },
		goalsFor: { type: GraphQLInt },
		goalsAgainst: { type: GraphQLInt },
		goalDifference: { type: GraphQLInt }
	}),
});

const MatchType = new GraphQLObjectType({
	name: "Match",
	fields: () => ({
    id: { type: GraphQLInt },
    competition: { type: CompetitionType },
		season: { type: SeasonType },
		utcDate: { type: GraphQLString },
    status: { type: GraphQLString },
    venue: { type: GraphQLString },
		matchday: { type: GraphQLInt },
		stage: { type: GraphQLString },
		group: { type: GraphQLString },
		lastUpdated: { type: GraphQLString },
		score: { type: ScoreType },
		homeTeam: { type: TeamType },
		awayTeam: { type: TeamType },
		referees: { type: new GraphQLList(PlayerType) },
	}),
});

const MatchAndHead2HeadType = new GraphQLObjectType({
	name: "MatchAndHead2Head",
	fields: () => ({
		head2head: { type: Head2HeadType },
		match: { type: MatchType }
	})
});

const Head2HeadType = new GraphQLObjectType({
	name: "Head2Head",
	fields: () => ({
		numberOfMatches: { type: GraphQLInt },
		totalGoals: { type: GraphQLInt },
		homeTeam: { type: Head2HeadTeamType },
		awayTeam: { type: Head2HeadTeamType },
	})
});

const Head2HeadTeamType = new GraphQLObjectType({
	name: "Head2HeadTeamType",
	fields: () => ({
		id: { type: GraphQLInt },
		name: { type: GraphQLString },
		wins: { type: GraphQLInt },
		draws: { type: GraphQLInt },
		losses: { type: GraphQLInt },
	}),
});

const SeasonType = new GraphQLObjectType({
  name: "Season",
  fields: () => ({
    id: { type: GraphQLInt },
    startDate: { type: GraphQLString },
    endDate: { type: GraphQLString },
    currentMatchday: { type: GraphQLInt },
    winner: { type: GraphQLString }
  })
});

const PlayerType = new GraphQLObjectType({
	name: "Player",
	fields: () => ({
		id: { type: GraphQLInt },
		name: { type: GraphQLString },
		firstName: { type: GraphQLString },
		lastName: { type: GraphQLString },
		dateOfBirth: { type: GraphQLString },
		countryOfBirth: { type: GraphQLString },
		nationality: { type: GraphQLString },
		position: { type: GraphQLString },
		shirtNumber: { type: GraphQLInt },
		lastUpdated: { type: GraphQLString }
	}),
});

const ScoreType = new GraphQLObjectType({
	name: "Score",
	fields: () => ({
		winner: { type: GraphQLString },
		duration: { type: GraphQLString },
		fullTime: { type: HomeAndAwayScoreType },
		halfTime: { type: HomeAndAwayScoreType },
		extraTime: { type: HomeAndAwayScoreType },
		penalties: { type: HomeAndAwayScoreType }
	}),
});

const HomeAndAwayScoreType = new GraphQLObjectType({
	name: "HomeAndAwayScore",
	fields: () => ({
		homeTeam: { type: GraphQLInt },
		awayTeam: { type: GraphQLInt }
	}),
});

// Root Query
const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		competitions: {
			type: new GraphQLList(CompetitionType),
			async resolve(parent, args) {
				const response = await axios.get(
					`http://api.football-data.org/v2/competitions`
				);
				return response.data.competitions;
			},
		},
		competition: {
			type: CompetitionType,
			args: {
				id: { type: GraphQLInt },
			},
			async resolve(parent, args) {
				const response = await axios.get(
					`http://api.football-data.org/v2/competitions/${args.id}`,
					{ headers }
				);
				return response.data;
			},
		},
		teams: {
			type: new GraphQLList(TeamType),
			args: {
				competition_id: { type: GraphQLInt },
			},
			async resolve(parent, args) {
				const response = await axios.get(
					`http://api.football-data.org/v2/competitions/${args.competition_id}/teams`,
					{ headers }
				);
				return response.data.teams;
			},
		},
		team: {
			type: TeamType,
			args: {
				id: { type: GraphQLInt },
			},
			async resolve(parent, args) {
				const response = await axios.get(
					`http://api.football-data.org/v2/teams/${args.id}`,
					{ headers }
				);
				return response.data;
			},
		},
		standings: {
			type: new GraphQLList(StandingType),
			args: {
				competition_id: { type: GraphQLInt },
			},
			async resolve(parent, args) {
				const response = await axios.get(
					`http://api.football-data.org/v2/competitions/${args.competition_id}/standings`,
					{ headers }
				);
				return response.data.standings;
			},
		},
		competition_matches: {
			type: new GraphQLList(MatchType),
			args: {
				competition_id: { type: GraphQLInt },
			},
			async resolve(parent, args) {
				const response = await axios.get(
					`http://api.football-data.org/v2/competitions/${args.competition_id}/matches`,
					{ headers }
				);
				return response.data.matches;
			},
		},
		team_matches: {
			type: new GraphQLList(MatchType),
			args: {
				team_id: { type: GraphQLInt },
			},
			async resolve(parent, args) {
				const response = await axios.get(
					`http://api.football-data.org/v2/teams/${args.team_id}/matches`,
					{ headers }
				);
				return response.data.matches;
			},
		},
		match_and_head2head: {
			type: MatchAndHead2HeadType,
			args: {
				match_id: { type: GraphQLInt },
			},
			async resolve(parent, args) {
				const response = await axios.get(
					`http://api.football-data.org/v2/matches/${args.match_id}`,
					{ headers }
				);
				return response.data;
			},
		},
	},
});

module.exports = new GraphQLSchema({
  query: RootQuery
})