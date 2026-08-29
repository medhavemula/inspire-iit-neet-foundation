# Inspire IIT & NEET Foundation — Landing Page

A modern, responsive, high-performance single-page EdTech SaaS landing page built from scratch with semantic **HTML5**, **CSS3**, and vanilla **JavaScript**.

🌐 **Live Website Demo:** **[https://medhavemula.github.io/inspire-iit-neet-foundation/](https://medhavemula.github.io/inspire-iit-neet-foundation/)**

**Created & Maintained by:** [Medha Vemula](https://github.com/medhavemula)

---

## 🎨 Brand Identity & Color Tokens

- **Inspire Royal Blue (Primary)**: `#0254B8` / `#003677`
- **Inspire Action Orange (Secondary / CTA)**: `#F36F21` / `#DC5C10`
- **Light Blue Backgrounds**: `#EBF3FC` / `#F8FAFD`
- **Typography**: Plus Jakarta Sans / Inter

---

## 📁 File Structure

```
inspire-landing-page/
├── index.html         # Semantic, accessible HTML5 single-page structure (All 8 sections)
├── css/
│   └── styles.css     # Pure CSS3 stylesheet with design tokens, mockups, responsive & motion rules
├── js/
│   └── main.js        # Configurable login URL, role tabs switcher, mobile drawer, scroll observer
├── assets/
│   └── logo.png       # Authentic uploaded brand logo
└── README.md          # Project documentation & preview instructions
```

---

## ⚙️ Configurable CRM Login URL

The CRM/LMS login endpoint is configured in a single location at the top of `js/main.js`:

```javascript
const INSPIRE_CONFIG = {
  loginUrl: "PENDING", // Replace "PENDING" with actual CRM URL e.g. "https://portal.inspireiit.com"
  fallbackWebsite: "https://www.inspireiit.com/",
  contactEmail: "inspireiitfoundation@gmail.com",
  phonePrimary: "+91 9704801457",
  phoneSecondary: "+91 9121441475"
};
```

- When `loginUrl` is set to `"PENDING"`, clicking any **Login to Inspire** CTA displays a clean portal modal with official links and support contact.
- When `loginUrl` is updated with the real URL, all CTAs throughout the page automatically redirect to that endpoint.

---

## 🚀 How to Preview

You can open `index.html` directly in any web browser, or launch a local web server:

### Option 1: Python
```bash
python -m http.server 8000
```
Open [http://localhost:8000](http://localhost:8000)

### Option 2: Node.js (npx)
```bash
npx serve .
```

---

## 📱 Responsive & Accessibility Support
- Fully responsive across **360px**, **390px**, **768px**, **1024px**, and **1440px+**.
- Full support for `@media (prefers-reduced-motion: reduce)`.
- Semantic ARIA roles for tabs and navigation menus.
