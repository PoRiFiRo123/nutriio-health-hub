# Nutriio Health Hub

A modern e-commerce platform for health and wellness products, built with React, TypeScript, and Supabase.

## 🚀 Features

- **User Authentication**
  - Secure login and registration system
  - User profile management
  - Protected routes

- **Product Management**
  - Browse products with filtering and search
  - Detailed product pages
  - Product categories and tags

- **Shopping Experience**
  - Shopping cart functionality
  - Secure checkout process
  - Payment integration
  - Order tracking

- **Blog System**
  - Health and wellness articles
  - Blog post categories
  - Rich text content

- **User Dashboard**
  - Order history
  - Profile management
  - Account settings

- **Contact & Support**
  - Contact form
  - Customer support
  - FAQ section

## 🛠️ Tech Stack

- **Frontend**
  - React 18
  - TypeScript
  - Vite
  - Tailwind CSS
  - Shadcn UI Components
  - React Router DOM
  - React Query
  - React Hook Form
  - Zod (Form validation)

- **Backend**
  - Supabase (Authentication, Database, Storage)
  - EmailJS (Email notifications)

- **Development Tools**
  - ESLint
  - TypeScript
  - PostCSS
  - Tailwind CSS

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/PoRiFiRo123/nutriio-health-hub.git
   cd nutriio-health-hub
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
   ```

## 🚀 Development

To start the development server:

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
# or
bun run build
```

To preview the production build:

```bash
npm run preview
# or
yarn preview
# or
bun run preview
```

## 📁 Project Structure

```
nutriio-health-hub/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # Shadcn UI components
│   │   │   ├── accordion.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── aspect-ratio.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── breadcrumb.tsx
│   │   │   ├── button.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── card.tsx
│   │   │   ├── carousel.tsx
│   │   │   ├── chart.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── collapsible.tsx
│   │   │   ├── command.tsx
│   │   │   ├── context-menu.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── hover-card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── input-otp.tsx
│   │   │   ├── label.tsx
│   │   │   ├── menubar.tsx
│   │   │   ├── navigation-menu.tsx
│   │   │   ├── pagination.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── radio-group.tsx
│   │   │   ├── resizable.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── select.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── sonner.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── toaster.tsx
│   │   │   ├── toggle.tsx
│   │   │   ├── toggle-group.tsx
│   │   │   ├── tooltip.tsx
│   │   │   └── use-toast.ts
│   │   ├── profile/      # Profile-related components
│   │   ├── AboutCompany.tsx
│   │   ├── ChatBot.tsx
│   │   ├── EducationalContent.tsx
│   │   ├── FeaturedBlogSection.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ProductCategories.tsx
│   │   ├── ProductsDropdown.tsx
│   │   ├── SearchHeader.tsx
│   │   ├── Testimonials.tsx
│   │   └── WhatsAppWidget.tsx
│   ├── hooks/           # Custom React hooks
│   │   ├── use-mobile.tsx
│   │   ├── use-toast.ts
│   │   ├── useAuth.tsx
│   │   └── useCart.tsx
│   ├── integrations/    # Third-party service integrations
│   │   └── supabase/
│   │       ├── client.ts
│   │       └── types.ts
│   ├── lib/            # Utility functions and configurations
│   │   └── utils.ts
│   ├── pages/          # Page components
│   │   ├── About.tsx
│   │   ├── Auth.tsx
│   │   ├── Blog.tsx
│   │   ├── BlogPost.tsx
│   │   ├── Cart.tsx
│   │   ├── Checkout.tsx
│   │   ├── Contact.tsx
│   │   ├── Index.tsx
│   │   ├── NotFound.tsx
│   │   ├── PaymentFailure.tsx
│   │   ├── PaymentSuccess.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── Products.tsx
│   │   └── Profile.tsx
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .gitignore
├── components.json
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json
└── vite.config.ts

```

## 🔒 Environment Variables

The following environment variables are required:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `VITE_EMAILJS_PUBLIC_KEY`: EmailJS public key
- `VITE_EMAILJS_TEMPLATE_ID`: EmailJS template ID
- `VITE_EMAILJS_SERVICE_ID`: EmailJS service ID

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Nishit R Kirani
