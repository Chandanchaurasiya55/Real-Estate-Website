import mongoose from "mongoose";
import Property from "../Models/property.model.js";

// ─── GridFS helpers ───────────────────────────────────────────────────────────

const getGridFSBucket = () => {
  const db = mongoose.connection.db;
  return new mongoose.mongo.GridFSBucket(db, { bucketName: "propertyPhotos" });
};

const parseDataUrl = (dataUrl) => {
  const match = dataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
  if (!match) return null;
  return {
    contentType: match[1],
    base64: match[2],
  };
};

const saveDataUrlToGridFS = (dataUrl, filename) => {
  const parsed = parseDataUrl(dataUrl);
  if (!parsed) return null;

  const buffer = Buffer.from(parsed.base64, "base64");
  const bucket = getGridFSBucket();

  return new Promise((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(filename, {
      contentType: parsed.contentType,
    });

    uploadStream.on("error", (error) => {
      reject(error);
    });

    uploadStream.on("finish", () => {
      if (uploadStream.id) {
        resolve(uploadStream.id.toString());
      } else {
        reject(new Error("GridFS upload finished but no file ID"));
      }
    });

    uploadStream.write(buffer);
    uploadStream.end();
  });
};

const normalizeImageInput = async (img, prefix) => {
  if (!img) return null;

  if (typeof img === "string") {
    const value = img.trim();
    if (value.startsWith("data:image")) {
      const fileId = await saveDataUrlToGridFS(value, `${prefix}-${Date.now()}`);
      return { fileId, contentType: parseDataUrl(value)?.contentType };
    }
    if (value.startsWith("http://") || value.startsWith("https://")) {
      return { externalUrl: value };
    }
    return null;
  }

  const raw = img.data || "";
  if (typeof raw === "string" && raw.startsWith("data:image")) {
    const fileId = await saveDataUrlToGridFS(raw, `${prefix}-${Date.now()}`);
    return { fileId, contentType: parseDataUrl(raw)?.contentType };
  }

  if (img.url && typeof img.url === "string") {
    return { externalUrl: img.url };
  }

  return null;
};

const processImages = async (rawImages = [], prefix = "prop") => {
  const result = [];
  for (let i = 0; i < Math.min(rawImages.length, 10); i++) {
    const img = rawImages[i];
    const entry = await normalizeImageInput(img, `${prefix}-${i}`);
    if (!entry) continue;

    result.push({
      filename: img?.filename || `image-${i}`,
      contentType: entry.contentType || img?.contentType || "image/jpeg",
      fileId: entry.fileId || "",
      externalUrl: entry.externalUrl || "",
    });
  }
  return result;
};

const resolveCoverReference = (coverInput, images) => {
  if (coverInput?.fileId) return coverInput.fileId;
  if (images && images.length > 0 && images[0].fileId) return images[0].fileId;
  return "";
};

// ─── Controllers ──────────────────────────────────────────────────────────────


// ─── Controllers ──────────────────────────────────────────────────────────────

export async function createProperty(req, res) {
  try {
    const images = await processImages(req.body.images || [], `prop-${Date.now()}`);

    const coverInput = await normalizeImageInput(req.body.coverImage || req.body.image, "cover");
    const coverImageId = resolveCoverReference(coverInput, images);

    const property = await Property.create({
      ...req.body,
      coverImageId,
      images,
    });

    return res.status(201).json({ message: "Property created", property });
  } catch (error) {
    console.error("createProperty error:", error);
    return res.status(400).json({ message: error.message });
  }
}

export async function getPropertyImage(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid image id" });
    }

    const bucket = getGridFSBucket();
    const _id = new mongoose.Types.ObjectId(id);
    const downloadStream = bucket.openDownloadStream(_id);

    downloadStream.on("error", (err) => {
      console.error("getPropertyImage error:", err);
      return res.status(404).json({ message: "Image not found" });
    });

    downloadStream.on("file", (file) => {
      res.set("Content-Type", file.contentType || "application/octet-stream");
      res.set("Cache-Control", "public, max-age=31536000");
    });

    downloadStream.pipe(res);
  } catch (error) {
    console.error("getPropertyImage error:", error);
    return res.status(500).json({ message: "Failed to fetch image" });
  }
}

export async function getProperties(req, res) {
  try {
    // FIX: select only the fields the listing cards actually need.
    // This keeps the payload small and fast — no giant base64 blobs accidentally
    // stored in older documents will be sent over the wire.
    const properties = await Property.find()
      .select(
        "title location type price area bedrooms bathrooms coverImageId createdAt",
      )
      .sort({ createdAt: -1 })
      .lean(); // plain JS objects — faster serialisation than Mongoose docs

    return res.status(200).json({ properties });
  } catch (error) {
    console.error("getProperties error:", error);
    return res.status(500).json({ message: "Failed to fetch properties" });
  }
}

export async function getPropertyById(req, res) {
  try {
    // Full detail (including images array) only when a single property is opened
    const property = await Property.findById(req.params.id).lean();
    if (!property)
      return res.status(404).json({ message: "Property not found" });
    return res.status(200).json({ property });
  } catch (error) {
    console.error("getPropertyById error:", error);
    return res.status(500).json({ message: "Failed to fetch property" });
  }
}

export async function deleteProperty(req, res) {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });
    return res.status(200).json({ message: "Property deleted" });
  } catch (error) {
    console.error("deleteProperty error:", error);
    return res.status(500).json({ message: "Failed to delete property" });
  }
}

export async function updateProperty(req, res) {
  try {
    const images = await processImages(req.body.images || [], `prop-${Date.now()}`);

    const coverInput = await normalizeImageInput(req.body.coverImage || req.body.image, "cover");
    const coverImageId = resolveCoverReference(coverInput, images);

    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { ...req.body, coverImageId, images },
      { new: true, runValidators: true },
    ).lean();

    if (!property)
      return res.status(404).json({ message: "Property not found" });
    return res.status(200).json({ message: "Property updated", property });
  } catch (error) {
    console.error("updateProperty error:", error);
    return res.status(500).json({ message: "Failed to update property" });
  }
}
