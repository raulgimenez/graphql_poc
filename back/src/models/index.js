import { gql } from "apollo-server-express";
import Character from "./character";

const typeDef = gql`
  type Query
`;

const typeDefs = [typeDef, Character.typeDef];
const resolvers = [Character.resolvers];
const models = { Character: Character.model };

export default {
  typeDefs,
  resolvers,
  models,
};
