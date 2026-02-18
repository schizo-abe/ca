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

// Copy results, apply, course pages (clean URLs: /results, /apply, /course)
['results', 'apply', 'course'].forEach(dir => {
  const indexSrc = path.join(dir, 'index.html');
  if (fs.existsSync(indexSrc)) {
    const destDir = path.join('public', dir);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(indexSrc, path.join(destDir, 'index.html'));
    console.log(`Copied ${dir}/index.html to public/${dir}/`);
  }
});

// Copy Apple Pay domain verification file to .well-known
const wellKnownDir = path.join('public', '.well-known');
if (!fs.existsSync(wellKnownDir)) {
  fs.mkdirSync(wellKnownDir, { recursive: true });
}
const appleFile = path.join('assets', 'apple-developer-merchantid-domain-association');
if (fs.existsSync(appleFile)) {
  fs.copyFileSync(appleFile, path.join(wellKnownDir, 'apple-developer-merchantid-domain-association'));
  console.log('Copied apple-developer-merchantid-domain-association to public/.well-known/');
}

console.log('Build completed successfully!');

