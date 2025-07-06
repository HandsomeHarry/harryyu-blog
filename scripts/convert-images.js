const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Note: Run `npm install sharp` before using this script

async function convertToWebP(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality: 85, effort: 6 })
      .toFile(outputPath);
    
    console.log(`✅ Converted: ${inputPath} → ${outputPath}`);
    
    // Get file sizes for comparison
    const originalSize = fs.statSync(inputPath).size;
    const webpSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
    
    console.log(`   Size reduction: ${savings}% (${formatBytes(originalSize)} → ${formatBytes(webpSize)})`);
  } catch (error) {
    console.error(`❌ Failed to convert ${inputPath}:`, error.message);
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function findAndConvertImages(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    
    if (entry.isDirectory()) {
      await findAndConvertImages(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const webpPath = fullPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        
        // Skip if WebP version already exists
        if (!fs.existsSync(webpPath)) {
          await convertToWebP(fullPath, webpPath);
        } else {
          console.log(`⏭️  Skipped (WebP exists): ${fullPath}`);
        }
      }
    }
  }
}

async function main() {
  const imagesDir = path.join(__dirname, '../public/images');
  
  if (!fs.existsSync(imagesDir)) {
    console.error('❌ Images directory not found:', imagesDir);
    process.exit(1);
  }
  
  console.log('🚀 Starting image conversion...');
  console.log('📁 Scanning directory:', imagesDir);
  
  try {
    await findAndConvertImages(imagesDir);
    console.log('✨ Image conversion completed!');
  } catch (error) {
    console.error('❌ Conversion failed:', error);
    process.exit(1);
  }
}

// Usage instructions
console.log(`
📖 Image Conversion Utility
============================

This script converts JPG/PNG images to WebP format for better performance.

Prerequisites:
1. Install Sharp: npm install sharp
2. Run the script: node scripts/convert-images.js

Features:
- Automatically finds all JPG/PNG files in /public/images
- Converts to WebP with 85% quality
- Skips files that already have WebP versions
- Shows file size savings

`);

if (require.main === module) {
  main();
}

module.exports = { convertToWebP, findAndConvertImages };