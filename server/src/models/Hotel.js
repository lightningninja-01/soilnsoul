import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  whatsappMessage: {
    type: String,
    default: function() {
      return `Hi, I am interested in booking ${this.name}.`;
    }
  }
}, { timestamps: true });

const Hotel = mongoose.model('Hotel', hotelSchema);
export default Hotel;
