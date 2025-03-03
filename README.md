# Around The U.S.

<img width="1411" alt="Project Banner" src="https://github.com/user-attachments/assets/be38a2fe-5717-4db3-8ce7-afe159ae30bd" />

## 📱 Live Demo

[View Live Demo](https://lidor-cohen.github.io/se_project_aroundtheus/) </br>
[Video Explanation](https://youtu.be/eqVeF5gljBc)

## 📝 Overview

"Around The U.S." is an interactive web application that showcases a social media profile with complete CRUD (Create, Read, Update, Delete) functionality. The application allows users to share photos from places they've visited around the United States, update their profile information, and interact with content.

## ✨ Features

- **User Profile Management**
  - Edit profile name and description
  - Update profile picture

- **Post Management**
  - Create new posts with images and descriptions
  - View all posts in a responsive grid layout
  - Like/unlike posts
  - Delete posts

- **Responsive Design**
  - Fully responsive layout for all screen sizes
  - Optimized for mobile, tablet, and desktop viewing

- **Enhanced User Experience**
  - Smooth animations and transitions
  - Loading states for all API operations
  - Comprehensive error handling with user-friendly messages

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3 (BEM methodology)
- JavaScript (ES6+)
- Webpack 5

### Backend
- API integration
- Asynchronous JavaScript (Promises)

## 🔍 Implementation Details

### Responsive Design
The application uses responsive design principles to ensure a consistent experience across all devices. Media queries and flexible grid layouts enable the interface to adapt smoothly to different screen sizes.

### BEM Methodology
CSS follows the Block, Element, Modifier (BEM) methodology for naming conventions, promoting code organization and reusability.

### API Integration
All data operations are performed through API endpoints:
- User information retrieval and updates
- Post creation, loading, and deletion
- Like functionality

### Error Handling
Comprehensive error handling for all API interactions, with user-friendly error messages to guide the user when operations fail.

## 🚀 Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/lidor-cohen/se_project_aroundtheus.git
   ```

2. Navigate to the project directory:
   ```bash
   cd se_project_aroundtheus
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

6. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

## 🖼️ Project Structure

```
se_project_aroundtheus/
├── src/
│   ├── blocks/          # BEM blocks
│   ├── components/      # JavaScript component classes
│   ├── images/          # Image assets
│   ├── pages/           # Page-specific styles
│   ├── utils/           # Utility functions and constants
│   ├── vendor/          # Third-party code
│   ├── index.html       # Main HTML file
│   └── index.js         # JavaScript entry point
├── webpack.config.js    # Webpack configuration
├── package.json         # Project dependencies and scripts
└── README.md            # Project documentation
```

## 👨‍💻 Author

**Lidor Cohen** - Full-Stack Developer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Profile-blue?style=flat-square&logo=linkedin)](https://linkedin.com/in/lidor-cohen-fsd)
[![GitHub](https://img.shields.io/badge/GitHub-Profile-black?style=flat-square&logo=github)](https://github.com/lidor-cohen)

## 📄 License

This project is licensed under the ISC License.
