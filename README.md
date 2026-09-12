# Central Pharmacy — Website Prototype

Student frontend prototype for **Central Pharmacy**.  
This is a **clickable demo**, not a live pharmacy system.

- No real patient records
- No real prescription files stored
- No real payments

Open `index.html` in a browser, or from this folder run:

```
python -m http.server 5500
```

Then visit `http://localhost:5500`.

## Project structure

```
central-pharmacy/
├── index.html              Home page
├── shop.html               Product catalogue
├── product.html            Single product (demo)
├── prescriptions.html      Upload-for-review workflow
├── cart.html               Basket
├── checkout.html           Delivery/collection + confirm
├── account.html            Orders, prescriptions, profile
├── about.html              About the pharmacy
├── contact.html            Contact details and form
├── admin.html              Admin dashboard concept
├── css/
│   └── styles.css          All visual design
├── js/
│   ├── data.js             Demo products and copy
│   └── app.js              Shared behaviour + page logic
└── assets/
    └── logo.svg            Brand mark
```

## How the prototype “remembers” things

The site uses the browser’s `localStorage` (like a small notebook on your computer).  
Refreshing the page keeps the cart, demo orders, and demo prescriptions.  
Clearing site data resets the prototype.
