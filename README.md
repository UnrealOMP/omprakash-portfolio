# Om Prakash Gadge — Software Engineer Portfolio

A modern, dual-experience software engineering portfolio website designed for **Om Prakash Gadge** (`@UnrealOMP`), combining:
1. **Immersive Dark 3D Cinema Hero (`Three.js` + `GSAP`)**: Floating matte-graphite geometric monoliths illuminated by a warm emissive orb point light with real-time shadow mapping and cursor parallax.
2. **Minimalist High-Contrast Editorial Sections**: Spacious, typography-driven sections for About, Technical Skills, Featured Project Case Studies (with interactive UI Preview & System Architecture tabs), Live GitHub & LeetCode Telemetry, Education, and a functional Contact Form.

---

## 📁 Project Structure

```text
omprakash-portfolio/
├── index.html                        # Primary semantic HTML5 document & SEO metadata
├── css/
│   └── styles.css                    # Custom design system (Dual-tone Editorial Light + Dark Cinema)
├── js/
│   ├── three-hero.js                 # Three.js interactive 3D geometric hero scene
│   └── main.js                       # Adaptive navbar, skill filters, live GitHub/LeetCode sync, GSAP animations & contact form
├── assets/
│   ├── favicon.svg                   # Custom 3D isometric cube & glowing orb vector favicon
│   ├── Omprakash_Gadge_Resume.pdf    # Official downloadable resume PDF
│   └── images/
│       ├── Logo.png                  # Personal brand emblem (UNREAL OMP)
│       ├── about-me.jpg              # Portrait photograph for About dossier
│       └── OMP.jpg                   # Secondary photograph asset
└── README.md                         # Project documentation & local run instructions
```

---

## 🚀 Key Highlights

- **Interactive Three.js 3D Hero**: Hardware-accelerated WebGL scene featuring floating bevelled cubes, cylinders, and a warm glowing light source (`#ff9a5a`) that reacts smoothly to cursor movement and automatically pauses via `IntersectionObserver` when scrolled out of view.
- **Adaptive Dual-State Navigation**: Starts as translucent dark glass over the Hero section, transitions into a crisp white/black editorial bar across the main content sections, and includes a persistent `[Editorial Light / Full Dark]` theme switcher.
- **Interactive Project Showcases**:
  - **PMPML Transit Platform** ([UnrealOMP/PMPML-Transit-App](https://github.com/UnrealOMP/PMPML-Transit-App))
  - **MeetAI — AI-Powered Transcription Platform** ([UnrealOMP/Meet-AI](https://github.com/UnrealOMP/Meet-AI))
  - **IoT Water Quality Monitoring Platform** ([UnrealOMP/IOT-Based-Water-Quality-Monitoring-using-AI](https://github.com/UnrealOMP/IOT-Based-Water-Quality-Monitoring-using-AI))
  - Plus **Employee Attendance & Payroll System** and **Role-Based Task Management System**
  - Each featured project includes an interactive switcher between **UI Preview** and **System Architecture**.
- **Live GitHub & LeetCode Telemetry**: Fetches live repository & contribution data from GitHub (`@UnrealOMP`) and problem-solving stats from LeetCode (`@Unreal_OMP`), backed by verified real snapshot fallbacks for instant zero-latency rendering.
- **Functional Contact Form**: Submits directly to Google Sheets via Google Apps Script (`submit-to-google-sheet`), paired with one-click email copy (`omprakashg6766@gmail.com`) and direct PDF resume download.

---

## 💻 Running Locally

Because the site is built with clean, dependency-free HTML5, CSS3, and ES6 JavaScript, you can run it using any static HTTP server:

### Option 1: Using Python (Built-in)
```powershell
cd d:\codes\Salary_Counter\omprakash-portfolio
python -m http.server 5500
```
Then open **[http://localhost:5500](http://localhost:5500)** in your browser.

### Option 2: Using Node.js (`npx serve`)
```powershell
cd d:\codes\Salary_Counter\omprakash-portfolio
npx serve -l 5500
```
Then open **[http://localhost:5500](http://localhost:5500)** in your browser.

### Option 3: VS Code Live Server
Open `d:\codes\Salary_Counter\omprakash-portfolio\index.html` and click **"Go Live"** in the VS Code status bar.
