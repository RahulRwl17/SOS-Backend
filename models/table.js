var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TableSchema = new Schema({
    name: { type: String, required: true, max: 100 },
    desc: { type: String, required: true },
    image: {type: String},
    occupied: {type: Boolean, default: false},
    numberOfSeats: { type: String, max: 100 },
    cafeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TempCafe',
    }
});


// Export the model
module.exports = mongoose.model('Table', TableSchema);
