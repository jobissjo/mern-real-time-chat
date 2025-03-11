import rateLimit from "express-rate-limit";

export const anonymousRateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 150,
    message: "Too many requests from this IP, please try again later"
});

export const UserRateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: 200,
    keyGenerator: (req) => req.userId || req.ip,
    message: "Too many requests from this user, please try again later"
})