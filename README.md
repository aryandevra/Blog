# 📝 Blogify

A modern blogging platform built with **React**, **Vite**, **Appwrite**, and **Tailwind CSS**.

Blogify lets authenticated users create, edit, publish, and manage blog posts with image upload support and a rich text editor.

---

## 🚀 Live Demo

🔗 https://bloging24.netlify.app/

---

## ✨ Features

- 🔐 User authentication with Appwrite
- 📝 Create, edit, and delete blog posts
- 🖼️ Featured image upload and storage
- ✍️ Rich text editing via TinyMCE
- 📱 Responsive layout across devices
- 🎨 Clean modern UI with Tailwind CSS
- ⚡ Fast development experience with Vite
- 🔄 Redux Toolkit for state management
- 🔁 Client-side routing with React Router
- ☁️ Appwrite-backed backend services

---

## 🖼️ Preview

Blogify provides a clean and modern blogging experience where users can:

- Create and publish articles
- Upload featured images
- Edit existing posts
- Browse all published content
- Manage authentication securely

---

## 🛠️ Tech Stack

- React
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router
- React Hook Form
- Appwrite
- TinyMCE
- HTML React Parser

---

## 📁 Project Structure

```text
Blog/
├── public/
├── src/
│   ├── appwrite/
│   │   ├── index.js
│   │   └── ...
│   ├── components/
│   │   ├── index.js
│   │   └── ...
│   ├── conf/
│   │   └── conf.js
│   ├── hooks/
│   │   ├── index.js
│   │   └── ...
│   ├── pages/
│   │   ├── index.js
│   ├── routes/
│   │   └── router.jsx
│   ├── store/
│   │   ├── authSlice.js
│   │   └── store.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── package.json
├── vite.config.js
└── README.md
```

---

## 🔧 Setup

Create a `.env` file in the project root and add:

```env
VITE_APPWRITE_URL=YOUR_APPWRITE_ENDPOINT
VITE_APPWRITE_PROJECT_ID=YOUR_PROJECT_ID
VITE_APPWRITE_DATABASE_ID=YOUR_DATABASE_ID
VITE_APPWRITE_COLLECTION_ID=YOUR_COLLECTION_ID
VITE_APPWRITE_BUCKET_ID=YOUR_BUCKET_ID
VITE_TINYMCE_KEY=YOUR_TINYMCE_KEY
```

---

## 🗄️ Appwrite Setup

### 1. Create a Project

- Create a new Appwrite project.
- Copy the Project ID.

### 2. Create a Database and Collection

Add a collection with fields such as:

```text
title           String
content         String
featuredImage   String
isPrivate       Boolean
userId          String
```

### 3. Create a Storage Bucket

Use Appwrite Storage for featured image uploads.

For development, enable read access as needed.

### 4. Enable Authentication

- Enable email/password authentication
- Allow users to sign up and log in

---

## 📌 Notes

- Ensure Appwrite endpoint and project values are correct in `.env`.
- Use `npm run dev` to start the local Vite server.
- The app uses Appwrite sessions for authentication and file uploads.

```text
Email / Password Authentication
```

---

## 🚀 How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/aryandevra24/Blog.git
```

### 2. Navigate to Project Folder

```bash
cd Blog
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file and add your Appwrite and TinyMCE credentials.

### 5. Start Development Server

```bash
npm run dev
```

### 6. Open Browser

```text
http://localhost:5173
```

---

## 💡 Future Improvements

- 🌙 Dark Mode
- ❤️ Like & Bookmark System
- 💬 Comment Section
- 🔍 Search & Filters
- 📊 User Dashboard Analytics
- 📌 Featured Posts
- 🏷️ Categories & Tags
- 🌍 Multi-language Support
- 📱 Progressive Web App (PWA)

---

## 📜 License

This project is open source and free to use.
