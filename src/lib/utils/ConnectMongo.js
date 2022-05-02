const { connect, connection } = require("mongoose");

ConnectMongo = (config) => {
    connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });

    connection.on("connected", () => console.log("[DATABASE] Successfully connected to MongoDB!"))
    connection.on("error", (e) => console.error(`[DATABASE] An error occurred while connecting to the database. ${e.message}`));
}


module.exports = ConnectMongo;