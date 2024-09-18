# Connect Four Game

This is a simple Connect Four game built as a Single Page Application (SPA) using React, TypeScript, Vite, and Zustand for state management.

## Table of Contents

- [Demo Video](#demo-video)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the App](#running-the-app)
- [Game Instructions](#game-instructions)
- [Technologies Used](#technologies-used)

## Demo Video

https://www.loom.com/share/9144bcfc19e544c9b47c1419df186414?sid=dafbe124-d378-4c76-b71e-82ae70ca6e39

## Getting Started

### Prerequisites

Before running the app, ensure you have the following installed on your local machine:

- Node.js (Version 10.8.2)
- npm (Node Package Manager)

### Installation

1. After cloning Install dependencies using npm:

   ```
   npm install
   ```

## Running the App

To run the app locally, use the following command:

```
npm run dev
```

This will start the development server and open the app in your default web browser.

## Game Instructions

Connect Four is a two-player game in which the players take turns dropping colored discs from the top into a grid. The objective of the game is to be the first to form a horizontal, vertical, or diagonal line of four discs of your color.

1. To start the game, Enter the players name and click on the "Submit" button.
2. Players take turns dropping their colored discs into one of the columns.
3. The game continues until one player achieves four discs in a row, or the grid is full (resulting in a draw).
4. After the game ends, you can choose to restart the game by clicking on the "Reset Game" button.

## Technologies Used

- React
- TypeScript
- Vite
- Zustand
- TailwindCSS

## Approach

The game was built using React for the UI components and state management, Vite for fast development and building, and Zustand for efficient state management. The game logic involves tracking the state of the game board, checking for win conditions after each move, and handling player turns. TailwindCSS was used for styling to provide a visually pleasing user interface.
