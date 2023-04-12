import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
  name: String,
  hostel: String,
  floor: String,
  room: Number,
  contact: Number,
  creator: String,
});

const Address = mongoose.model("Address", addressSchema);

export default Address;
