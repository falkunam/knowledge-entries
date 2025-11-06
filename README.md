# 🧠 Knowledge Entries Dashboard

A responsive CRUD dashboard built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **React Query**, **Formik + Yup**, and **JSON Server**.

This project demonstrates modern React development practices — including clean architecture, form validation, responsive design, and automated end-to-end tests using **Playwright**.

---

## 🚀 Features

✅ Create, Read, Update, Delete (CRUD) operations  
✅ React Query for data fetching and caching  
✅ JSON Server as mock REST API  
✅ Formik + Yup validation  
✅ Image upload & preview  
✅ Responsive layout (mobile-first)  
✅ Modal form for Add/Edit  
✅ Toast notifications for actions  
✅ Playwright automated tests  
✅ Bonus UI/UX improvements (search + mobile FAB + modal animation)

---

## 🧩 Tech Stack

- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **React Query (TanStack)**
- **Formik + Yup**
- **Axios**
- **React Hot Toast**
- **JSON Server**
- **Playwright**

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/falkunam/knowledge-entries.git
cd knowledge-entries
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start the mock API (JSON Server)

```bash
npm run json-server
```


### 4️⃣ Start the development server
```bash
npm run dev
```

### 5️⃣ Run automated tests (Playwright)
```bash
npm run test:e2e
```


Run with Playwright UI 

```bash
npm run test:e2e:ui
```


## 🎨 UI/UX Improvement (Bonus)

## Feature: Search bar & delete confirmation

- **Added a search/filter input above the entries list.**
- **Allows technicians to quickly locate a record.**
- **Confirmation prompt prevents accidental deletes.**

## Mobile Improvement:

- **Added a floating “+” button for easy Add Entry access on small screens.**

Demo Video: https://drive.google.com/file/d/11_9phpTDLbAAxjNptQ5vidc3izAHN8SB/view?usp=drive_link