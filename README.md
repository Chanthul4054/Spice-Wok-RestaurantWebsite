# Spice & Wok – Restaurant Website

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)]
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)]
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)]
[![Frontend Project](https://img.shields.io/badge/Project-Frontend-blue)]
[![License: MIT](https://img.shields.io/badge/License-MIT-green)]

**Spice & Wok** is a multi-page restaurant website developed using **HTML, CSS, JavaScript, and XML**.  
The project features categorized menus, price sorting, a shopping cart flow, and a checkout page, all implemented on the client side.

---

## Table of Contents
- About
- Features
- Tech Stack
- Folder Structure
- Run Locally
- GitHub Pages Deployment
- Customization
- Contributing
- License

---

## About
This project simulates a real restaurant website experience. Users can browse cuisines, sort items by price, add items to a cart, and proceed to checkout. XML is used as a structured data source for menu items.

---

## Features
- Multi-page website navigation
- Cuisine-based menu pages (Chinese, Indian, Specials)
- Price sorting (Low → High, High → Low)
- Cart and checkout workflow
- XML-driven menu data
- Responsive and clean UI

---

## Tech Stack
- **HTML5** – Markup and page structure
- **CSS3** – Styling and layout
- **JavaScript (Vanilla)** – Logic, filtering, cart handling
- **XML** – Menu data source

---

## Project Structure
```text
Spice-Wok-RestaurantWebsite/
│
├── Spice&Wok/
│ ├── CSS/
│ │ ├── home.css
│ │ ├── menu.css
│ │ ├── cart.css
│ │ ├── checkout.css
│ │ └── about.css
│ │
│ ├── script/
│ │ ├── cart.js
│ │ ├── chinese.js
│ │ ├── indian.js
│ │ ├── special.js
│ │ ├── lowToHigh.js
│ │ └── highToLow.js
│ │
│ ├── xml/
│ │ └── menu.xml
│ │
│ ├── images/
│ │ └── (site images)
│ │
│ ├── home.html
│ ├── menu.html
│ ├── chinese.html
│ ├── indian.html
│ ├── lowToHigh.html
│ ├── highToLow.html
│ ├── cart.html
│ ├── checkout.html
│ └── about.html
│
└── README.md
```

---

## Run Locally

### Option A: Open directly
1. Clone the repository:
   ```bash
   git clone https://github.com/Chanthul4054/Spice-Wok-RestaurantWebsite.git
   ```

2. Open ```index.html``` in your browser.


### Option B (recommended): Use a local server

Some browsers restrict local XML fetches when opening files directly. Use a local server for best results.

**Using VS Code Live Server**

1. Install the Live Server extension in VS Code
2. Right-click index.html → Open with Live Server

**Using Python**
```bash
python -m http.server 5500
```

---

## Usage

Once opened in a browser:

- Use the navigation menu to explore Home, Menu, and Order pages.
- On the Menu page, filter dishes by category (e.g., Appetizers, Main Courses).
- On the Order page, complete the food ordering form. Validation ensures required fields are completed before submission.

---

## Customization

You can tailor the website to your restaurant:

1. Update Menu Items
  - Edit or add dishes in ```xml/menu.xml```.
  - Include new images in the ```images/``` directory.
2. Style Adjustments
  - Modify ```css/styles.css``` for brand colors, layout tweaks, and typography.
3. Script Enhancements
  - Extend JavaScript in ```js/``` for additional navigation or animation effects.

---

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository.
2. Create a feature branch (git checkout -b feature-name).
3. Commit your changes (git commit -m "Add feature").
4. Push to your fork (git push origin feature-name).
5. Open a pull request

---

## License

This project is open source and available under the **MIT License**.

---

## Author

Developed By Chanthul4054





