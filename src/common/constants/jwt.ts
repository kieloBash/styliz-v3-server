export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'supersecret',
  expiration: '1h',
};
