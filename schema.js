const axios = require('axios');
const { API_KEY } = require('./API_KEY');

const { 
  GraphQLObjectType, 
  GraphQLInt, 
  GraphQLString, 
  GraphQLList, 
  GraphQLSchema, 
} = require('graphql');

const headers = { 'X-Auth-Token': API_KEY };

// Competition Type
const CompetitionType = new GraphQLObjectType({
	name: "Competitions",
	fields: () => ({
		id: { type: GraphQLInt },
    area: { type: AreaType },
    name: { type: GraphQLString },
		plan: { type: GraphQLString },
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
  name: 'Teams',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    venue: { type: GraphQLString }
  })
});


// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    competitions: {
      type: new GraphQLList(CompetitionType),
      async resolve(parent, args) {
        const response = await axios.get(`http://api.football-data.org/v2/competitions`);
        return response.data.competitions;
      }
    },
    competition: {
      type: CompetitionType,
      args: {
        id: { type: GraphQLInt }
      },
      async resolve(parent, args) {
        const response = await axios.get(
          `http://api.football-data.org/v2/competitions/${args.id}`, 
          { headers }
        );
        return response.data;
      }      
    },
    teams: {
      type: new GraphQLList(TeamType),
      args: {
        competition_id: { type: GraphQLInt }
      },
      async resolve(parent, args) {
        const response = await axios.get(`http://api.football-data.org/v2/competitions/${args.competition_id}/teams`,
          { headers }
        );
        return response.data.teams;
      }
    },
    team: {
      type: TeamType,
      args: {
        id: { type: GraphQLInt }
      },
      async resolve(parent, args) {
        const response = await axios.get(
          `http://api.football-data.org/v2/teams/${args.id}`,
          { headers }
        );
        return response.data;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
})