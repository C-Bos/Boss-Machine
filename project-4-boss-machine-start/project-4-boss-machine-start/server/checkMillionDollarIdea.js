const checkMillionDollarIdea = (req, res, next) => {
    //This function will make sure that any new or updated ideas are still worth at least one million dollars!
    //The total value of an idea is the product of its numWeeks and weeklyRevenue properties.
    const { numWeeks, weeklyRevenue } = req.body;
    const totalValue = Number(numWeeks) * Number(weeklyRevenue);
    if (totalValue >= 1000000) {
        next();
    } else {
        res.status(400).send();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
