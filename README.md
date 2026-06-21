# Floortje Rijnaars Portfolio

A professional portfolio website showcasing design projects and work.

## Project Structure

```
portfolio/
├── index.html                 # Main homepage
├── pages/                     # Project detail pages
│   ├── project-davids.html
│   ├── project-choukoud.html
│   └── project-lifeline.html
├── css/                       # Stylesheets
│   └── style.css              # Main stylesheet with all styles
├── js/                        # JavaScript files
│   └── script.js              # Main JavaScript for interactions
├── assets/                    # All static assets
│   ├── logo/                  # Logo files
│   │   ├── logo.svg
│   │   └── logo.png
│   ├── images/                # All image assets
│   │   ├── hero/              # Hero section images
│   │   │   ├── phone-intro.png
│   │   │   ├── portrait-front.jpg
│   │   │   └── portrait-back.jpg
│   │   ├── about/             # About section images
│   │   │   └── about-photo2.jpg
│   │   └── projects/          # Project-specific images
│   │       ├── davids/
│   │       │   ├── project-davids.jpg
│   │       │   ├── case-davids-overview.jpg
│   │       │   └── case-davids-tools.jpg
│   │       ├── choukoud/
│   │       │   ├── project-choukoud.jpg
│   │       │   ├── case-choukoud-overview.jpg
│   │       │   └── case-choukoud-tools.jpg
│   │       └── lifeline/
│   │           ├── project-lifelines.jpg
│   │           ├── case-lifeline-overview.jpg
│   │           └── case-lifeline-tools.jpg
│   └── icons/                 # Icon files (currently empty)
└── README.md                  # This file

```

## File Organization

### Root Level
- **index.html**: Main landing page with hero, featured projects, about section, and contact information

### Pages Directory
- **project-davids.html**: Case study for Davids Hoveniersbedrijf project
- **project-choukoud.html**: Case study for Choukoud Gym project  
- **project-lifeline.html**: Case study for LifeLine board game project

### CSS Directory
- **style.css**: Complete stylesheet containing all styles for the portfolio (includes variables, responsive design, animations)

### JS Directory
- **script.js**: JavaScript for interactive features including carousel, smooth scrolling, animations, and navigation

### Assets Organization
Images are organized by category for easy maintenance:
- **hero/**: Banner, portrait, and intro phone images
- **about/**: Profile photos for the about section
- **projects/**: Organized by project name with project thumbnails and case study images
- **logo/**: Logo files in different formats
- **icons/**: Reserved for icon assets

## Features

- Responsive design (mobile, tablet, desktop)
- Smooth scrolling navigation
- Interactive project carousel
- Portfolio project case studies
- Sticky navigation header
- Animated elements and transitions
- Professional typography with Playfair Display serif and DM Sans sans-serif

## Development Notes

All asset paths use relative URLs from their respective directories:
- From root (index.html): `assets/images/...`
- From pages/ (project files): `../assets/images/...`

CSS and JS files are referenced with updated paths:
- From root: `css/style.css` and `js/script.js`
- From pages: `../css/style.css` and `../js/script.js`

## Browser Support

Modern browsers with support for:
- CSS Grid and Flexbox
- CSS Custom Properties
- Intersection Observer API
- Smooth scroll behavior
