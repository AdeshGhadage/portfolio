# Portfolio Website

A modern, responsive portfolio website with a dark theme, blog functionality, and project showcase. Built with vanilla HTML, CSS, and JavaScript - perfect for hosting on GitHub Pages.

## ✨ Features

- 🎨 **Dark Theme Design** - Modern, clean dark theme with gradient accents
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🎭 **Interactive Elements** - Smooth animations, hover effects, and parallax scrolling
- 📝 **Blog Section** - Easy-to-add blog posts with syntax highlighting
- 💼 **Project Showcase** - Detailed project pages with diagrams and implementation details
- ⚡ **Fast & Lightweight** - No frameworks, just vanilla JS for optimal performance
- 🚀 **GitHub Pages Ready** - Deploy easily with GitHub Pages

## 📁 Project Structure

```
Portfolio/
├── index.html              # Main homepage with about and projects
├── blog.html              # Blog listing page
├── css/
│   └── style.css          # All styles with dark theme
├── js/
│   └── main.js            # Interactive features and animations
├── blog/
│   └── sample-post.html   # Example blog post (template)
├── projects/
│   └── sample-project.html # Example project detail page (template)
├── images/                # Your images, diagrams, screenshots
└── README.md             # This file
```

## 🚀 Getting Started

### Local Development

1. Clone or download this repository
2. Open `index.html` in your web browser
3. That's it! No build process required.

### Customization

#### 1. Update Personal Information

Edit `index.html` and update:
- Hero section with your name and title
- About section with your bio
- Skills tags
- Contact links (email, GitHub, LinkedIn)

#### 2. Add Your Projects

In `index.html`, find the projects section and:
- Duplicate the `.project-card` div
- Update project name, description, tags, and links
- Create a new project detail page in the `projects/` folder using `sample-project.html` as a template

#### 3. Add Blog Posts

To add a new blog post:
1. Create a new HTML file in the `blog/` folder (e.g., `my-new-post.html`)
2. Copy the structure from `sample-post.html`
3. Update the content, title, date, and tags
4. Add a new card in `blog.html` linking to your new post

#### 4. Customize Colors

Edit `css/style.css` and modify the CSS variables at the top:

```css
:root {
    --bg-primary: #0a0a0a;        /* Main background */
    --bg-secondary: #151515;      /* Card backgrounds */
    --accent-primary: #6366f1;    /* Primary accent color */
    --accent-secondary: #8b5cf6;  /* Secondary accent color */
    /* ... more variables */
}
```

#### 5. Add Your Images

- Add project screenshots to the `images/` folder
- Add diagrams for project detail pages
- Update image paths in HTML files

## 📤 Deploying to GitHub Pages

1. Create a new repository on GitHub
2. Push your code to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```
3. Go to your repository settings on GitHub
4. Navigate to "Pages" in the left sidebar
5. Under "Source", select "main" branch
6. Click "Save"
7. Your site will be published at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## 🎨 Creating Diagrams

For project detail pages, you can create diagrams using:
- [draw.io](https://app.diagrams.net/) - Free diagram tool
- [Excalidraw](https://excalidraw.com/) - Hand-drawn style diagrams
- [Lucidchart](https://www.lucidchart.com/) - Professional diagrams
- [Figma](https://www.figma.com/) - Design and diagrams

Save diagrams as PNG or SVG and place them in the `images/` folder.

## 📝 Adding Code Snippets

The blog and project pages support syntax-highlighted code blocks:

```html
<pre><code>// Your code here
function example() {
  console.log("Hello World!");
}
</code></pre>
```

## ✅ Customization Checklist

- [ ] Update name and title in hero section
- [ ] Write your bio in the about section
- [ ] Update skills tags
- [ ] Add your contact information and social links
- [ ] Replace sample projects with your real projects
- [ ] Create project detail pages with diagrams
- [ ] Write your first blog post
- [ ] Add your project images/screenshots
- [ ] Update the page title and meta description
- [ ] Test on mobile devices
- [ ] Deploy to GitHub Pages

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **JavaScript** - Vanilla JS for interactivity
- **No frameworks** - Lightweight and fast

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 📄 License

This project is free to use for personal portfolios. Feel free to customize it to your needs!

## 🤝 Contributing

This is a personal portfolio template, but if you find bugs or have suggestions, feel free to open an issue!

## 💡 Tips

1. **Keep it simple** - Don't overcomplicate your portfolio
2. **Show, don't tell** - Use images and diagrams
3. **Regular updates** - Keep adding projects and blog posts
4. **Mobile first** - Test on mobile devices regularly
5. **Performance** - Optimize images before uploading
6. **SEO** - Add meta descriptions to all pages

## 📞 Need Help?

If you run into issues:
1. Check the browser console for errors (F12)
2. Ensure all file paths are correct
3. Verify images are in the correct folder
4. Make sure JavaScript is enabled

---

**Built with ❤️ by Adesh Ghadage**

Happy coding! 🚀
