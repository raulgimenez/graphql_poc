const { gql } = require("apollo-server");

const typeDef = gql`
  enum CharacterStatus {
    Alive
    Dead
    unknown
  }
  enum CharacterGender {
    Female
    Male
    Genderless
    unknown
  }
  type Location {
    name: String
    url: String
  }
  type Character {
    id: ID
    name: String
    status: CharacterStatus
    species: String
    type: String
    gender: CharacterGender
    origin: Location
    location: Location
    image: String
    episodes: [String]
    url: String
    created: String
  }
  type Query {
    Characters: [Character]
    Character(id: ID!): Character
    CharacterByName(name: String!): [Character]
  }
`;

module.exports = {
  typeDef,
};
