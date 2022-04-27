var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TableSchema = new Schema({
    name: { type: String, required: true, max: 100 },
    desc: { type: String, required: true },
    image: {type: String, default: null},
    occupied: {type: Boolean, default: false},
    numberOfSeats: { type: String, max: 100 },
    cafeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TempCafe',
    }
});


// Post Save
TableSchema.post("save", async function (doc, next) {
  try {
    let qrstring = `CafeId: ${doc.cafeId} , TableId: ${doc._id}`; 
    let data = await doc
      .model("Table")
      .finOneAndUpdate({ _id: doc._id }, { image: qrstring });
  } catch (error) {
    console.log("get -> error", error);
    next(error);
  }
});


// Export the model
module.exports = mongoose.model('Table', TableSchema);
