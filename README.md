# Clipping Academy - VSL Landing Page

A modern, responsive Video Sales Letter (VSL) landing page for Clipping Academy coaching business.

## Features

- 🎥 Embedded video player in the hero section
- 💬 Client testimonials with placeholder images
- 📋 Booking form for free consultation calls
- ❓ FAQ section with accordion functionality
- 📱 Fully responsive design
- 🎨 Dark green/black theme matching modern VSL designs

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Follow the prompts to link your project and deploy.

### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your Git repository (GitHub, GitLab, or Bitbucket)
4. Vercel will automatically detect the project settings
5. Click "Deploy"

### Option 3: Connect Your Domain

After deployment:

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your domain: `www.clippingacadmy.online`
4. Follow Vercel's DNS configuration instructions

## Customization

### Replace Placeholder Images

The testimonial images are currently using placeholder services. To replace them:

1. Save your client testimonial photos in the `assets/` folder
2. Name them: `testimonial-1.jpg`, `testimonial-2.jpg`, etc.
3. Update the `src` attributes in `index.html` to point to `assets/testimonial-X.jpg`

### Update Video

Replace the YouTube embed URL in `index.html` (line ~30) with your actual video URL:

```html
<iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID" ...>
```

### Customize Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-green: #0d4d2d;
    --dark-green: #0a3d24;
    --black: #000000;
    --white: #ffffff;
    --yellow-cta: #ffd700;
}
```

### Form Submission

Currently, the form shows an alert on submission. To connect it to a backend:

1. Update the form submission handler in `script.js`
2. Add your form processing endpoint
3. Or integrate with a service like Formspree, Netlify Forms, or your own API

## File Structure

```
.
├── index.html          # Main HTML file
├── styles.css          # All styles
├── script.js           # JavaScript functionality
├── vercel.json         # Vercel configuration
├── package.json        # Project metadata
├── assets/             # Placeholder for testimonial images
└── README.md           # This file
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

