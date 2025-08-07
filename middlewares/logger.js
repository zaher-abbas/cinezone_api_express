export const logger = (req, res, next) => {
    const date = new Date();
    const log = `[${date.toISOString()}] ${req.method} ${req.url}`
    console.log(log);
    next();
}