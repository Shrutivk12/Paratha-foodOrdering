# Paratha - A Campus Paratha Ordering App 🍽️

A full-stack custom web application for college students to order parathas and manage orders efficiently, replacing manual WhatsApp ordering. Includes student authentication, cart management, admin panel for stock/orders, and UPI-based payment tracking.

🌐 Live Site
- Client side: https://paratha-order.onrender.com
- Admin side: https://paratha-admin.onrender.com

## 🔧 Tech Stack

### Frontend
- React.js
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Passport.js (Local Strategy with email)
- Express-session
- Nodemailer

---

## 🛠️ Installation

### Clone the repository
    git clone https://github.com/Shrutivk12/Paratha-foodOrdering.git
    cd Paratha-foodOrdering

### Install dependencies for /backend, /admin, /frontend
    npm install

### Environment Variables - Create a .env file in /backend
    ATLAS_URL=your_mongodb_connection_string
    SECRET=your_session_secret
    CLOUD_NAME=cloudinary_cloud_name
    CLOUD_API_KEY=cloudinary_api_key
    CLOUD_API_SECRET=cloudinary_api_secret
    EMAIL_USER=your_email
    EMAIL_PASS=your_email_app_password

### Run Development Servers
    # /backend
    npm run server

    # /admin & /frontend
    npm run dev
   
---

## 🚀 Features

### User Side
- Sign up with email and password
- Login/logout (session-based)
- Add/remove items to cart
- View total price and quantity
- Place order
- Cancel order if preparing
- Upload UPI payment screenshot
- Receive email updates:
  - When order is out for delivery
  - When order is delivered
  - Daily reminder for unpaid orders

### Admin Side
- Add, view, and delete food items
- Update item availability (In stock/ out of stock)
- Cancel orders if too many
- Mark orders as out for delivery or delivered
- Delete old orders

### Improvements
- View all orders with filters (paid/unpaid/delivered)
- Mail notification from admin to order ASAP when getting out of stock
- Deploy backend with auto-scaling (Kubernetes)
- Add CI/CD using GitHub Actions

---

## 👨‍💻 Author
Built with ❤️ by Shruti Vishwakarma
Reach out at vkshruti1208@gmail.com
Thanks for visiting
