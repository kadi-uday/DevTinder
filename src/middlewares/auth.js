const adminAuth = (req, res, next) => {
    const token = "uday";
    const isAdminAuthorized = token === 'uday';
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized Request for admin...");
    } else {
        next();
    };
};

const userAuth = (req, res, next) => {
    const token = "uday";
    const isAdminAuthorized = token === 'uday';
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized Request for user...");
    } else {
        next();
    };
};

module.exports = {adminAuth, userAuth};