const fs = require('fs');
const path = require('path');

// Create public directory if it doesn't exist
if (!fs.existsSync('public')) {
  fs.mkdirSync('public');
}

// Copy HTML, JS, and CSS files
['index.html', 'script.js', 'styles.css'].forEach(file => {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join('public', file));
    console.log(`Copied ${file} to public/`);
  }
});

// Copy assets directory
if (fs.existsSync('assets')) {
  if (!fs.existsSync('public/assets')) {
    fs.mkdirSync('public/assets', { recursive: true });
  }
  const files = fs.readdirSync('assets');
  files.forEach(file => {
    const srcPath = path.join('assets', file);
    const destPath = path.join('public/assets', file);
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied assets/${file} to public/assets/`);
  });
}

console.log('Build completed successfully!');

