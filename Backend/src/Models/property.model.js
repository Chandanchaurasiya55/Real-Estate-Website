import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    area: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    coverImageId: { type: String, required: false, default: "" },
    images: [
      {
        filename: String,
        contentType: String,
        fileId: String,
      },
    ],
    available: { type: Boolean, default: true },
    createdBy: { type: String, default: "admin" },
  },
  { timestamps: true },
);

const Property = mongoose.model("Property", propertySchema);
export default Property;
