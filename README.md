# Digital Slam Book 📖

A modern full-stack web application for creating and sharing digital slam books. Users can sign messages, leave memories, and create a digital keepsake with friends and colleagues.

## Features ✨

- **User Authentication**: Secure user registration and login
- **Create Slam Books**: Create personalized digital slam books
- **Sign Messages**: Friends can leave signed messages and memories
- **Responsive Design**: Mobile-friendly interface built with React and Tailwind CSS
- **Modern Backend**: Fast and scalable Node.js/Express backend
- **Database Integration**: Persistent data storage for all slam books and messages

## Tech Stack 🛠️

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Language**: TypeScript/JavaScript

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (or your choice)
- **Authentication**: JWT (JSON Web Tokens)

## Project Structure 📁

```
Slambk/
├── backend/
│   ├── src/
│   │   ├── index.js
│   │   ├── controllers/
│   │   │   └── user.controller.js
│   │   ├── models/
│   │   │   └── user.models.js
│   │   └── routes/
│   │       └── slam.routes.js
│   ├── package.json
│   └── .env (create this file)
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── components/
│   ├── public/
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
└── README.md
```

## Getting Started 🚀

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/crucie/SlamBk.git
cd SlamBk
```

#### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

Start the backend server:
```bash
npm run dev
```

#### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Available Scripts 📝

### Backend
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test           # Run tests (if configured)
```

### Frontend
```bash
npm run dev        # Start Vite development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## API Endpoints 🔌

### User Routes
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/:id` - Get user profile

### Slam Book Routes
- `POST /api/slambooks` - Create a new slam book
- `GET /api/slambooks/:id` - Get slam book details
- `POST /api/slambooks/:id/sign` - Sign a slam book
- `GET /api/slambooks/:id/messages` - Get all messages in a slam book

## Contributing 🤝

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📜

This project is licensed under the MIT License - see the LICENSE file for details.

## Author 👤

**Crucie**
- GitHub: [@crucie](https://github.com/crucie)

## Support 💬

If you have any questions or issues, please open an issue on GitHub or contact the maintainers.

---

Made with ❤️ for creating digital memories
