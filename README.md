# Business Panel

A modern business management dashboard built with **Next.js**, **Prisma**, and **SQLite**.

This project is a full-stack business management panel designed to manage business information through a clean and simple dashboard interface.

## ✨ Features

* 📋 View list of businesses
* ➕ Create a new business
* ✏️ Edit business information
* 🗑️ Delete businesses
* 🔍 Search and manage businesses
* 🖼️ Upload business logo
* ✅ Form validation
* ⚡ REST API for business management
* 🗄️ SQLite database
* 🔷 Prisma ORM
* 📱 Responsive dashboard interface
* ⚠️ Loading and error handling

## 🛠️ Tech Stack

* **Next.js**
* **React**
* **JavaScript**
* **Prisma**
* **SQLite**
* **Zod**
* **Tailwind CSS**
* **REST API**

## 📁 Project Structure

```text
business-panel/
├── app/
│   ├── api/
│   │   └── businesses/
│   ├── businesses/
│   ├── layout.jsx
│   └── page.jsx
│
├── components/
│   └── ...
│
├── features/
│   └── businesses/
│       └── components/
│
├── prisma/
│   └── schema.prisma
│
├── public/
│   └── uploads/
│
├── package.json
└── README.md
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd business-panel
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up the database

Initialize Prisma and run the database migration:

```bash
npx prisma migrate dev
```

Then generate the Prisma Client:

```bash
npx prisma generate
```

### 4. Run the development server

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

## 🗄️ Database

This project uses **SQLite** as the database and **Prisma ORM** for database access.

The Prisma schema is located at:

```text
prisma/schema.prisma
```

During development, Prisma creates a local SQLite database file.

## 🔌 API

The project provides API endpoints for managing businesses.

### Get all businesses

```http
GET /api/businesses
```

### Create a business

```http
POST /api/businesses
```

### Update a business

```http
PUT /api/businesses/:id
```

### Delete a business

```http
DELETE /api/businesses/:id
```

## ✅ Validation

Business data is validated before being stored in the database.

The project uses **Zod** for schema validation to help prevent invalid data from reaching the database.

## 🖼️ Business Logo

Businesses can have a logo uploaded through the management form.

Uploaded files are handled by the application and associated with the corresponding business.

## 🎯 Project Goals

The main goals of this project were to practice:

* Building full-stack applications with Next.js
* Working with the App Router
* Creating API routes
* Connecting Next.js to a database
* Using Prisma ORM
* Handling forms and validation
* Managing CRUD operations
* Handling file uploads
* Building reusable React components
* Managing loading and error states

## 🔮 Future Improvements

Possible improvements for future versions include:

* 🔐 Authentication and authorization
* 👥 User and role management
* 📊 Business analytics dashboard
* 🧪 Automated testing with Playwright
* 🏗️ Improved project architecture
* 🎨 More advanced UI/UX
* 🔎 Advanced filtering and pagination
* 📦 Better file storage management
* 🚀 Production deployment

## 👩‍💻 Author

**Mahdis Nasr**

Computer Engineering Student & Front-End Developer

---

⭐ If you find this project useful, feel free to star the repository.
