const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const images = [
  { name: 'hero-bg.jpg', width: 1920, height: 1080, color: '#4F46E5' },
  { name: 'women-category.jpg', width: 800, height: 600, color: '#EC4899' },
  { name: 'men-category.jpg', width: 800, height: 600, color: '#3B82F6' },
  { name: 'accessories-category.jpg', width: 800, height: 600, color: '#10B981' },
  { name: 'product-1.jpg', width: 600, height: 800, color: '#F59E0B' },
];

const outputDir = path.join(__dirname, '../public/images');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

images.forEach(({ name, width, height, color }) => {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);

  // Add text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(name.replace('.jpg', ''), width / 2, height / 2);

  // Save image
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(path.join(outputDir, name), buffer);
});

console.log('Placeholder images generated successfully!'); 