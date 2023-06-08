const mongoose = require("mongoose");


const connectToDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);

        console.log(
            "database Connected Successfully",
            connect.connection.host,
            connect.connection.name
        );
    }
    catch (err) {
        console.log(err.messagee);
        process.exit(1);
    }

}

module.exports = connectToDb;