function BreachTableObject(name, breachDate, pwnCount, isVerified, isFabricated) {

    this.Name = name,
        this.Breach_Date = breachDate,
        this.Accounts = pwnCount,
        // this.dataClasses = dataClasses,
        this.Verified = isVerified,
        this.Fabricated = isFabricated


};

module.exports = BreachTableObject;