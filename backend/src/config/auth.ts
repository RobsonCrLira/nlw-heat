export default {
    secret: `${process.env.JWT_SECRET}`,
    tokenExpiryTimeInSeconds: 24 * 60 * 60,
};
