const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const URLSchema = new Schema(
  {
    mainUrl: {
      type: String,
      required: true,
    },
    currentUrl: {
      type: String,
      required: true,
    },
    customUrl: {
      type: String,
      required: true,
    },
    createdDate: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  }
);


module.exports = mongoose.model('short_urls', URLSchema);
