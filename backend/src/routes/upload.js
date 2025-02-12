// src/routes/upload.js
import { Router } from 'express';
import { upload } from '../middleware/upload.js';

const router = Router();

// Update the base URL to use server IP
const generateUrls = (req, files) => {
  const baseUrl = `http://188.175.32.34:5000`;
  return files.map(file => ({
    url: `/uploads/${file.filename}`,
    fullUrl: `${baseUrl}/uploads/${file.filename}`
  }));
};

// Route pro upload jediného obrázku (slider)
router.post('/slider', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nebyl nahrán žádný soubor' });
    }
    const { url, fullUrl } = generateUrls(req, [req.file])[0];
    res.json({ url, fullUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route pro upload více obrázků (produkty)
router.post('/product', upload.array('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'Nebyl nahrán žádný soubor' });
    }
    const urls = generateUrls(req, req.files);
    res.json({ urls });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/category', upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }
  
    // Vezmeme pouze název souboru:
    const fileName = req.file.filename;
    
    // Z něj sestavíme relativní URL /uploads/...
    const url = `/uploads/${fileName}`;
  
  
    // Vrátíme JSON s "url"
    return res.json({ url });
  });
  

export default router;
