# Name Entry Application

A simple Laravel + React application that allows users to submit names (first name and last name) to a PostgreSQL database and displays them in a table below the form.

## Features

- **Form Submission**: Add first and last names through a clean, responsive form
- **Real-time Updates**: Names are immediately displayed in the table after submission
- **Modern UI**: Built with React and Tailwind CSS for a beautiful, responsive design
- **Database Storage**: PostgreSQL database with proper migrations and models
- **API Backend**: RESTful API endpoints for creating and retrieving names

## Tech Stack

- **Backend**: Laravel 12 (PHP 8.2+)
- **Frontend**: React 18 with Tailwind CSS
- **Database**: PostgreSQL
- **Build Tool**: Vite
- **Package Manager**: Composer (PHP) + npm (Node.js)

## Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js 20.19+ or 22.12+
- npm or yarn
- PostgreSQL database

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd NameEntry
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   ```

4. **Environment Configuration**
   Create a `.env` file in the root directory with the following database configuration:
   ```env
   DB_CONNECTION=pgsql
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_DATABASE=name_entry_db
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

5. **Generate application key**
   ```bash
   php artisan key:generate
   ```

6. **Run database migrations**
   ```bash
   php artisan migrate
   ```

7. **Build frontend assets**
   ```bash
   npm run build
   ```

8. **Start the development server**
   ```bash
   php artisan serve
   ```

## Usage

1. Open your browser and navigate to `http://localhost:8000`
2. You'll see a form at the top where you can enter first and last names
3. Submit the form to add names to the database
4. Names will appear in the table below the form
5. The table shows First Name, Last Name, and Date Added columns

## API Endpoints

- `POST /api/names` - Create a new name entry
- `GET /api/names` - Retrieve all names

## Development

- **Frontend Development**: Run `npm run dev` for hot reloading
- **Backend Development**: The Laravel server will automatically reload on file changes
- **Database Changes**: Create new migrations with `php artisan make:migration`

## Project Structure

```
├── app/
│   ├── Http/Controllers/NameController.php
│   └── Models/Name.php
├── database/
│   └── migrations/
├── resources/
│   ├── js/
│   │   ├── App.jsx
│   │   ├── app.jsx
│   │   └── components/
│   │       ├── NameForm.jsx
│   │       └── NameTable.jsx
│   ├── views/
│   │   └── app.blade.php
│   └── css/
├── routes/
│   └── web.php
└── vite.config.js
```

## Deployment

For production deployment:

1. Set `APP_ENV=production` in your `.env` file
2. Run `npm run build` to build production assets
3. Ensure your PostgreSQL database is properly configured
4. Set up proper web server configuration (Apache/Nginx)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
