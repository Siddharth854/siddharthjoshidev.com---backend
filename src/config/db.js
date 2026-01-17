const mongoose = require("mongoose")

const mondbUrl = "mongodb+srv://siddharthjoshi854:KebXjDDr7mwMHcm@cluster0.ujuzcji.mongodb.net/?appName=Cluster0"

const connectDb=()=>{
    return mongoose.connect(mondbUrl);
}

module.exports = {connectDb};