
# 🎨 To-Do App Frontend (React + Vite)

This is the frontend for the **To-Do Board Application**.  
Users can register, login, create boards, edit them, and manage their tasks.

---

## 🌐 Live Website
👉 https://todo-frontend-one-hazel.vercel.app/

---

## ⚙️ Tech Stack
- React.js
- Vite
- CSS (Custom UI)
- Fetch API
- Deployed on Vercel

---

## ✨ Features
- User authentication (Login / Register)
- Auto-login after registration
- Board creation, update & deletion
- Clean and centered UI
- Logout support
- Backend connected via REST API

---

## 📂 Project Structure
frontend/
│
├── src/
│ ├── App.jsx
│ ├── App.css
│ └── main.jsx
├── index.html
├── package.json
└── vite.config.js


---

## 🔗 Backend Connection

Frontend connects to backend using:
```js
const API_URL = import.meta.env.VITE_API_URL;
🛠️ Local Setup
1️⃣ Clone Repo
git clone https://github.com/Virendra7773/todo-frontend.git
cd todo-frontend
2️⃣ Install Dependencies
npm install
3️⃣ Create .env
VITE_API_URL=http://localhost:5000
4️⃣ Start Dev Server
npm run dev
Runs at:

http://localhost:5173
🚀 Deployment
Hosted on Vercel

Environment variable set:

VITE_API_URL= https://todo-backend-1kdd.onrender.com
👨‍💻 Author
Virendra Singh
