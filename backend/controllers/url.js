const URL = require("../model/url");
const shortid = require("shortid");
const QRCode = require("qrcode");

module.exports.createUrl = async (req, res) => {
  const { originalUrl, customCode } = req.body;
  const userId = req.user.id;

  try {
    const urlCount = await URL.countDocuments({ user: userId });
    if (urlCount >= 4) {
      return res
        .status(403)
        .json({ message: "URL limit exceeded (max 4 URLs allowed)" });
    }
    const shortCode = customCode || shortid.generate();
    const shortUrl = `http://localhost:8080/${shortCode}`;

    const existing = await URL.findOne({ shortCode });
    if (existing) {
      return res.status(409).json({ message: "Short code already taken" });
    }
    const qrCode = await QRCode.toDataURL(shortUrl);
    const newUrl = new URL({
      originalUrl,
      shortCode,
      shortUrl,
      qrCode,
      user: userId,
    });
    await newUrl.save();
    res.status(201).json({ shortUrl, qrCode });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.getAllUrl = async (req, res) => {
  try {
    const userId = req.user.id;
    const urls = await URL.find({ user: userId }).select("-__v");
    res.status(200).json({ urls });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.redirectUrl = async (req, res) => {
  try {
    const urlEntry = await URL.findOne({ shortCode: req.params.shortCode });
    if (!urlEntry) {
      return res.status(404).send("short url not found");
    }
    return res.redirect(urlEntry.originalUrl);
  } catch (e) {
    console.error("Error during redirect:", e);
    res.status(500).send("Server error");
  }
};
