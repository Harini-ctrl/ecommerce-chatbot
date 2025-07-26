
# 🛍️ E-commerce Customer Support Chatbot

A simple customer support chatbot built using **React (Vite)** for the frontend and **Node.js (Express)** for the backend. It answers queries related to:

- 📦 Order Status
- 👕 Remaining Stock of Products
- 🔝 Top 5 Most Sold Products

---

## 🔧 Tech Stack

- **Frontend**: React + CSS
- **Backend**: Node.js + Express
- **Data Source**: CSV files (products, orders, inventory)
- **HTTP Client**: Axios
- **Tooling**: Vite (for fast React development)

---

## 📁 Folder Structure

```

ecommerce-chatbot/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── products.csv
│   ├── orders.csv
│   ├── order\_items.csv
│   ├── inventory\_items.csv
│   └── index.js
│
├── frontend/
│   ├── src/
│   │   ├── ChatBot.jsx
│   │   └── styles.css
│   └── index.html
│
├── README.md


````

---

## 🚀 Running the App

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/ecommerce-chatbot.git
cd ecommerce-chatbot
````

### 2. Start Backend

```bash
cd backend
npm install
node index.js
```

> Server runs on `http://localhost:5000`

---

### 3. Start Frontend

```bash
cd ../frontend
npm install
npm run dev
```

> Frontend runs on `http://localhost:5173`

---

## 🤖 Sample Queries to Try

* `What are the top 5 products?`
* `What is the order status for 12345?`
* `How many "Classic T-Shirts" are left in stock?`

---

## 📌 Notes

* All logic is handled using keyword matching (no NLP)
* Data is read from CSV files for simplicity
* You can test individual API endpoints in Postman

---

## 🧑‍💻 Author

* P Harini Srutakeerti
* https://github.com/Harini-ctrl/ecommerce-chatbot


