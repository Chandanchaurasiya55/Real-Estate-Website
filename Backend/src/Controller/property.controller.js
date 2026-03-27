import Property from '../Models/property.model.js';

export async function createProperty(req, res) {
  try {
    const normalizeImageItem = (img) => {
      if (!img) return null;
      if (typeof img === 'string') return img;
      const data = img.data || '';
      if (data.startsWith('data:image')) return data;
      return `data:${img.contentType || 'image/jpeg'};base64,${data}`;
    };

    // Normalize incoming images to data URL, required for frontend img src.
    const rawImages = Array.isArray(req.body.images) ? req.body.images.slice(0, 10) : [];
    const images = rawImages.map((img) => {
      const normalized = normalizeImageItem(img);
      return {
        filename: img?.filename || '',
        contentType: img?.contentType || 'image/jpeg',
        data: normalized,
      };
    }).filter((img) => img?.data);

    let coverImage = normalizeImageItem(req.body.coverImage) || images?.[0]?.data || normalizeImageItem(req.body.image) || '';

    const body = {
      ...req.body,
      coverImage,
      images,
    };

    console.log('createProperty payload check:', {
      coverImageSnippet: coverImage ? coverImage.slice(0, 80) : null,
      imagesCount: images.length,
      firstImageSnippet: images[0]?.data ? images[0].data.slice(0, 80) : null,
    });

    const docSize = Buffer.byteLength(JSON.stringify(body), 'utf8');
    if (docSize > 16000000) {
      return res.status(413).json({ message: 'Payload too large: property image(s) exceed MongoDB 16MB document limit.' });
    }

    const property = await Property.create(body);
    return res.status(201).json({ message: 'Property created', property });
  } catch (error) {
    console.error('Create property error:', error);
    return res.status(400).json({ message: error.message });
  }
}

export async function getProperties(req, res) {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    return res.status(200).json({ properties });
  } catch (error) {
    console.error('Get properties error:', error);
    return res.status(500).json({ message: 'Failed to fetch properties' });
  }
}

export async function getPropertyById(req, res) {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    return res.status(200).json({ property });
  } catch (error) {
    console.error('Get property error:', error);
    return res.status(500).json({ message: 'Failed to fetch property' });
  }
}

export async function deleteProperty(req, res) {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    return res.status(200).json({ message: 'Property deleted' });
  } catch (error) {
    console.error('Delete property error:', error);
    return res.status(500).json({ message: 'Failed to delete property' });
  }
}

export async function updateProperty(req, res) {
  try {
    const normalizeImageItem = (img) => {
      if (!img) return null;
      if (typeof img === 'string') return img;
      const data = img.data || '';
      if (data.startsWith('data:image')) return data;
      return `data:${img.contentType || 'image/jpeg'};base64,${data}`;
    };

    const rawImages = Array.isArray(req.body.images) ? req.body.images.slice(0, 10) : [];
    const images = rawImages.map((img) => {
      const normalized = normalizeImageItem(img);
      return {
        filename: img?.filename || '',
        contentType: img?.contentType || 'image/jpeg',
        data: normalized,
      };
    }).filter((img) => img?.data);

    const coverImage = normalizeImageItem(req.body.coverImage) || images?.[0]?.data || normalizeImageItem(req.body.image) || '';

    const updateData = {
      ...req.body,
      coverImage,
      images,
    };

    const property = await Property.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!property) return res.status(404).json({ message: 'Property not found' });
    return res.status(200).json({ message: 'Property updated', property });
  } catch (error) {
    console.error('Update property error:', error);
    return res.status(500).json({ message: 'Failed to update property' });
  }
}
