# BlogPost — Full-Stack Blog Application

A full-stack blog application built with **React, TypeScript, Tailwind CSS, Node.js, Express, and MongoDB**. The application connects a React frontend to a REST API to fetch, create, and delete blog posts.

## 🚀 Features

- **View Posts:** Fetch and display blog posts from the backend API.
- **Create Posts:** Add new blog posts with a title and content.
- **Delete Posts:** Remove posts through the user interface.
- **Responsive UI:** Clean, responsive layout built with Tailwind CSS.
- **REST API Integration:** Communicate with the backend using Axios.
- **Loading and Error Handling:** Provide feedback when requests are processing or fail.
- **MongoDB Persistence:** Store blog posts in a MongoDB database through the backend.

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB

### BACKEND_URL="https://week10-data-storm-3.onrender.com"

### 1. Clone the Repository

```bash
git clone https://github.com/Codersintu/week11-project.git
cd BlogPost
```


```



```


```



## 🔄 Application Workflow

1. The React application loads and requests posts from the Express API.
2. Axios sends HTTP requests to the backend.
3. Express processes requests and interacts with MongoDB.
4. The backend returns the requested data.
5. React updates the UI to display the latest posts.
6. Users can create or delete posts, and the frontend refreshes the list after successful operations.

## 🌐 CORS Configuration

Since Vite and Express usually run on different ports during development, configure CORS in the Express application.

Install the middleware:

```bash
npm install cors
```

Example configuration:

```javascript
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173'
}));
```

Use the actual frontend origin shown by Vite. If your backend uses ES modules, use the appropriate `import` syntax.

## 🔐 Environment Variables

Keep database credentials and other secrets in environment variables.

- Do not commit `.env` files containing credentials.
- Add `.env` to `.gitignore`.
- Provide a `.env.example` file with placeholder values for other developers.

Example `.env.example`:

```env
PORT=8001
MONGODB_URI=your_mongodb_connection_string
```

## 🧪 Testing Checklist

- [ ] The frontend successfully fetches posts from the backend.
- [ ] New posts can be created and saved to MongoDB.
- [ ] Existing posts can be deleted.
- [ ] The UI updates after successful create and delete requests.
- [ ] Loading and error states work as expected.
- [ ] CORS is configured correctly.
- [ ] The application handles an empty post list.
- [ ] The layout works on desktop and mobile screens.

## 🎯 Project Objective

This project demonstrates full-stack system integration by connecting a React frontend to a Node.js/Express REST API backed by MongoDB.

It covers HTTP requests, asynchronous data fetching, CORS configuration, CRUD operations, state management, and responsive UI development.

## 👨‍💻 Author

**Sintu Mahto**

GitHub: [@Codersintu](https://github.com/Codersintu)

---

⭐ If you find this project useful, consider giving the repository a star.
