const { Schema, model } = require("mongoose");
const sensorSchema = new Schema(
    {
        humidity: Number,
        temperaturec: Number,
        temperaturef: Number,
        heatindexc: Number,
        heatindexf: Number,
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = model("sensor", sensorSchema);
