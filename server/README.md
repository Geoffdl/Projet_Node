# Projet Node

## Description

**Projet Node** is a school project developed by Geoffroy and Elisa. It is a Node.js application that serves as a beer API, allowing users to manage bars, beers, and orders. The project demonstrates the use of Express.js, Sequelize ORM, and SQLite for database management.

## Features

- **Bar Management**: Create, read, update, and delete bars.
- **Beer Management**: Add, update, and delete beers associated with bars.
- **Order Management**: Create, update, and delete orders for bars.
- **Advanced Queries**: 
  - Retrieve average alcohol degree of beers within a price range.
  - List orders by date and price range.
  - Sort beers alphabetically with pagination and filtering options.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Geoffdl/Projet_Node.git
   cd Projet_Node
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```plaintext
     SERVER_PORT=3000
     DB_STORAGE="db.sqlite"
     DB_DIALECT="sqlite"
     ```

4. **Run the application**:
   ```bash
   npm run dev
   ```

## Usage

- **API Endpoints**:
  - **Bars**: `/bars`, `/bars/:id`
  - **Beers**: `/biere/:id`, `/bars/:id_bar/biere`
  - **Orders**: `/bars/:id_bar/commandes`, `/commandes/:id`
  - **Advanced Queries**: Various endpoints for filtering and sorting.

- **Validation**: The application uses `express-validator` for request validation.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **Sequelize**: Promise-based Node.js ORM for SQL databases.
- **SQLite**: Lightweight database engine.
- **dotenv**: Module to load environment variables from a `.env` file.

## Contributors

- **Geoffroy // https://github.com/Geoffdl **
- **Elisa // https://github.com/Emikoya **

## License

This project is licensed under the ISC License.

## Acknowledgments

- Thanks to our instructor Allan Bernier (https://github.com/AllanBernier) and peers for their support and guidance throughout this project.
