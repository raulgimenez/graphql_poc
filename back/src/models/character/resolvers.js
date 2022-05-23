const resolvers = {
  Query: {
    Characters: async (parent, args, context) => {
      return await context.models.Character.findAll();
    },
    Character: async (parent, args, context) => {
      return await context.models.Character.findByPk(args.id);
    },
    CharacterByName: async (parent, args, context) => {
      return await context.models.Character.findByName(args.name);
    },
  },
};

export { resolvers };
