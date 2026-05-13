RouteWise 🚗🗺️

RouteWise is a full stack AI-powered road trip planner that helps users discover optimized travel routes, tourist attractions, food stops, travel cautions, and personalized itineraries based on mood and preferences.

Built with React, Node.js, Express, MongoDB, OpenRouteService, Geoapify, Groq AI, and JWT Authentication.

✨ Features
🔐 User Authentication (Signup/Login/Logout)
🛣️ Smart Route Planning
📍 Tourist Stops Along the Route
🍴 Restaurant & Rest Stop Suggestions
🤖 AI Generated Trip Itinerary
⚠️ AI-Based Travel Caution Advice
🧭 Mood-Based Place Recommendations
🗺️ Interactive Maps using Leaflet + OpenStreetMap
🍪 JWT Authentication with Cookies
📱 Responsive UI
🛠️ Tech Stack
Frontend
React.js
React Router DOM
CSS
Leaflet
OpenStreetMap
Backend
Node.js
Express.js
MongoDB
JWT Authentication
bcrypt
Cookie Parser
APIs Used
OpenRouteService API
Geoapify API
Pexels API
Groq AI API
📸 Main Functionalities
Route Planning

Users can:

Select source and destination
Choose travel preferences:
Toll Free
Avoid Highways
Shortest Route
Get:
Distance
Duration
Route Polyline
Tourist Stops
Rest Stops Recommendation

Based on travel duration, RouteWise intelligently suggests:

Cafes
Restaurants
Fast food stops
Images for eateries
AI Trip Planner

Generates a complete day-wise itinerary based on:

Budget
Mood
Travellers
Stay duration
Destination
AI Caution Card

Provides practical travel cautions like:

Fuel planning
Night driving risks
Traffic concerns
Highway conditions
Weather-related visibility warnings
🔒 Authentication
JWT Token Authentication
Protected Routes
Cookies-based session handling
🚀 Deployment

Frontend deployed on Vercel
Backend deployed on Render

⚙️ Environment Variables

Create a .env file in backend folder and add:

DIRECTIONS_API=your_key
PLACES_API=your_key
PHOTOS_API=your_key
GROQ_API=your_key
JWT_SECRET=your_secret
MONGO_URI=your_mongodb_uri
📦 Installation
Clone Repository
git clone https://github.com/your-username/routewise.git
Frontend Setup
cd frontend
npm install
npm run dev
Backend Setup
cd backend
npm install
npm start
🌍 Future Improvements
Live weather integration
Hotel booking suggestions
Save trip history
Export itinerary as PDF
Real-time traffic updates

Link to the website:- https://routewise-1-nqk1.onrender.com/centrePage

👩‍💻 Author

Kavya Oberai

⭐ Project Goal

RouteWise was built to simplify road trip planning by combining maps, AI, and personalized travel recommendations into one platform.
