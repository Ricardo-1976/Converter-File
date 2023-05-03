export default {
  components: {
    schemas: {
      AuthLogin: {
        type: 'object',
        properties: {
          auth: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              token: { type: 'string' },
            },
          },
          user: {
            type: 'object',
            $ref: '#/components/schemas/User',
          },
        },
      },
    },
  },
};
