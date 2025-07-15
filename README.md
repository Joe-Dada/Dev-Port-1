# 🚀 Modern Developer Portfolio

A stunning, responsive developer portfolio built with Next.js, featuring smooth animations, a custom cursor, and a professional contact form with Discord integration.

![Portfolio Preview](https://via.placeholder.com/1200x600/000000/FFFFFF?text=Portfolio+Preview)

## ✨ Features

### 🎨 **Modern Design**
- **Minimalist aesthetic** with professional typography
- **Glass morphism effects** and subtle animations
- **Responsive design** that works on all devices
- **Custom cursor** with interactive hover states
- **Smooth scrolling** with parallax effects

### 🎭 **Advanced Animations**
- **Framer Motion** powered smooth transitions
- **Scroll-triggered animations** with proper timing
- **3D hover effects** on cards and buttons
- **Staggered loading** animations
- **Particle background** with floating elements

### 📝 **Professional Contact Form**
- **Modal-based contact form** with validation
- **Discord webhook integration** for notifications
- **Comprehensive project inquiry fields**
- **Budget and timeline selection**
- **Success/error state handling**

### 🛠️ **Technical Excellence**
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Server-side API routes** for secure form handling

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Set up Discord webhook (optional)**
   - Create a Discord webhook in your server
   - Replace the webhook URL in `app/api/contact/route.ts`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Customization Guide

### 📝 **Personal Information**
Edit the following in `app/page.tsx`:

\`\`\`typescript
// Change name and title
<h1 className="text-7xl md:text-9xl font-black leading-none mb-6">
  <span className="block">YOUR</span>
  <span className="block">NAME</span>
</h1>

// Update description
<p className="text-2xl md:text-3xl text-gray-300 mb-6">
  Your professional tagline here
</p>
\`\`\`

### 🛠️ **Skills Section**
Update the skills array:

\`\`\`typescript
const skills = [
  { name: "Your Skill", icon: YourIcon, percentage: 95 },
  // Add more skills...
]
\`\`\`

### 💼 **Projects Section**
Customize the projects array:

\`\`\`typescript
const projects = [
  {
    id: 1,
    title: "Your Project Name",
    subtitle: "Project Type",
    description: "Project description...",
    tech: ["Tech1", "Tech2", "Tech3"],
    year: "2024",
    status: "Live",
  },
  // Add more projects...
]
\`\`\`

### 🎨 **Styling**
- **Colors**: Modify the color scheme in `app/globals.css`
- **Fonts**: Update font families in the CSS file
- **Animations**: Adjust animation durations and effects in components

### 📧 **Contact Form**
1. **Discord Integration**: Replace webhook URL in `app/api/contact/route.ts`
2. **Form Fields**: Modify form fields in `components/contact-modal.tsx`
3. **Validation**: Update validation rules as needed

## 📁 Project Structure

\`\`\`
portfolio/
├── app/
│   ├── api/contact/route.ts      # Contact form API
│   ├── components/
│   │   └── contact-modal.tsx     # Contact form modal
│   ├── globals.css               # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main portfolio page
├── components/ui/               # Reusable UI components
├── public/                      # Static assets
├── README.md                    # This file
└── package.json                # Dependencies
\`\`\`

## 🔧 Tech Stack

### **Frontend**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library

### **UI Components**
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Custom components** - Built with Tailwind CSS

### **Backend**
- **Next.js API Routes** - Server-side functionality
- **Discord Webhooks** - Contact form notifications

## 🎨 Design Features

### **Color Palette**
- **Primary**: Black (#000000)
- **Secondary**: White (#FFFFFF)
- **Accent**: Cyan (#22D3EE) to Purple (#A855F7)
- **Text**: Various gray shades for hierarchy

### **Typography**
- **Headings**: Inter font with black weight (900)
- **Body**: Inter font with normal weight
- **Monospace**: For code and technical elements

### **Animations**
- **Entrance**: Smooth fade-in with slide-up
- **Hover**: Scale and color transitions
- **Scroll**: Parallax and reveal effects
- **Cursor**: Custom cursor with blend modes

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet**: Adjusted layouts for medium screens
- **Desktop**: Full-featured experience
- **Large Screens**: Proper scaling for 4K displays

## 🔒 Security Features

- **Server-side Processing**: Contact form handled securely
- **Input Validation**: Client and server-side validation
- **Rate Limiting**: Prevents spam submissions
- **CORS Protection**: Secure API endpoints

## 🚀 Performance

- **Optimized Images**: Next.js Image optimization
- **Code Splitting**: Automatic code splitting
- **Lazy Loading**: Components loaded on demand
- **Minimal Bundle**: Tree-shaking and optimization

## 📈 SEO Ready

- **Meta Tags**: Proper meta descriptions and titles
- **Open Graph**: Social media sharing optimization
- **Structured Data**: Schema markup for search engines
- **Sitemap**: XML sitemap generation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **Framer Motion** - For smooth animations
- **Tailwind CSS** - For the utility-first approach
- **Radix UI** - For accessible components
- **Lucide** - For beautiful icons

## 📞 Support

If you have any questions or need help customizing the portfolio:

- **GitHub Issues**: [Create an issue](https://github.com/yourusername/portfolio/issues)
- **Email**: your.email@example.com
- **Discord**: YourDiscord#1234

## 🌟 Show Your Support

If you found this portfolio template helpful, please consider:

- ⭐ **Starring** the repository
- 🍴 **Forking** for your own use
- 📢 **Sharing** with other developers
- 🐛 **Reporting** any bugs you find

---

**Built with ❤️ by [Your Name]**

*This portfolio template is designed to showcase modern web development skills and can be easily customized for any developer's needs.*
