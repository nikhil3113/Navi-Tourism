# Navi Mumbai Tourism

## [Demo](https://navitourism.vercel.app)

## Introduction
Navi Mumbai Tourism is a web application designed to help users explore and discover the best locations in Navi Mumbai. This project aims to boost tourism in Navi Mumbai by providing detailed information, map previews, and user interaction features like likes and top locations.

## Features
- **Likes**: Users can like their favorite locations.
- **Top Locations**: Discover the top-rated destinations.
- **Admin Control**: Enhanced management capabilities.
- **Map Preview**: Each location includes a map preview.
- **Summary and Distance**: Detailed descriptions and distance from the nearest station.

## Installation Guide

### Prerequisites
Before you begin, ensure you have met the following requirements:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (for Prisma database)

### Step-by-Step Installation

1. **Clone the Repository**
   ```bash
   git clone `https://github.com/your-username/navi-mumbai-tourism.git`
   cd navi-mumbai-tourism   

2. **Install Dependencies**
    `npm install` or `yarn install`

3. **Set Up Database**
    create the .env file and update with your MongoDB database connection string.
    DATABASE_URL= `"mongodb+srv://test:test@cluster0.ns1yp.mongodb.net/myFirstDatabase"`

4. **Run Database Migrations**
    Make sure to run
    `npx prisma db push`

5. **Start the Development Server**
    `npm run dev` or `yarn dev`
    The application should now be running at http://localhost:3000.

