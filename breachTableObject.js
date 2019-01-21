function BreachTableObject(name, breachDate, pwnCount, isVerified, isFabricated) {

    this.Name = name,
        this.Breach_Date = breachDate,
        this.Accounts = pwnCount,
        this.Verified = isVerified,
        this.Fabricated = isFabricated


};

function PasteModelBreach(source, date, title, emailCount) {

    this.Source = source,
        this.Paste_Date = date,
        this.Title = title,
        this.Email_Count = emailCount

}


module.exports = {

    BreachTableObject: BreachTableObject,
    PasteModelBreach: PasteModelBreach
}