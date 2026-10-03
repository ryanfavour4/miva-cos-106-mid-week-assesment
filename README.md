# RyanNova — Student Academic Portfolio

A multi-page student academic portfolio and management website built for the **COS 106 Introduction to Web Technologies** term project.

**Student:** Ryan Favour Chukwuka
**Course:** COS 106 — Web Technologies
**Institution:** MIVA Open University

---

## About

RyanNova is a personal academic portfolio featuring a homepage, about page, projects showcase, an interactive academic task planner, and a contact form with JavaScript validation. The entire site is built with **only HTML, CSS, and vanilla JavaScript** — no frameworks, no build tools, no package managers.

## Folder Structure

```
student-portfolio/
│
├── index.html              Homepage
├── index.css               Homepage styles
├── index.js                Homepage script
│
├── about/
│   ├── about.html          About page
│   ├── about.css           About page styles
│   └── about.js            About page script
│
├── projects/
│   ├── projects.html       Projects showcase
│   ├── projects.css        Projects page styles
│   └── projects.js         Projects page script
│
├── planner/
│   ├── planner.html        Academic task planner
│   ├── planner.css         Planner styles
│   └── planner.js          Planner logic (add/complete/delete/stats)
│
├── contact/
│   ├── contact.html        Contact form
│   ├── contact.css         Contact page styles
│   └── contact.js          Form validation logic
│
├── css/
│   ├── global.css          Design tokens + shared components
│   ├── navigation.css      Header + footer styles
│   └── responsive.css      Media queries for all pages
│
├── js/
│   └── global.js           Mobile nav toggle + active link
│
└── README.md
```

## How to Run

Open `index.html` in any modern web browser. No server or installation required.

## Features

- **Homepage** — Hero, academic snapshot, skills, selected projects, interests, embedded video
- **About** — Personal intro, educational timeline, academic course table, career aspirations, skill breakdown, hobbies
- **Projects** — Featured project + grid layout with 5 projects
- **Academic Planner** — Add, complete, delete, and filter tasks with live statistics and localStorage persistence
- **Contact** — Form with JavaScript validation (name, email, phone, message)
- **Responsive** — Adapts to desktop, tablet, and mobile
- **Navigation** — Consistent header with active-page indicator and mobile menu

## Technologies

- HTML5 (semantic elements)
- CSS3 (Grid, Flexbox, custom properties, media queries)
- Vanilla JavaScript (ES5-compatible patterns)
