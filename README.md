# MedicHub
This is a generic website for hospitals built using spring boot and react

# MedicBackend

A Spring Boot REST API for a medical management system with JWT authentication and role-based access control.

---

## Features

- User registration and login (JWT-based)
- Role-based access: `ROLE_USER`, `ROLE_DOCTOR`, `ROLE_ADMIN`
- Secure endpoints (only `/auth/register` and `/auth/login` are public)
- Appointment management
- Medical leave management
- MySQL database integration
- CORS support for frontend integration
- Ready for Google OAuth extension

---

## Tech Stack

- Java 17+
- Spring Boot
- Spring Security (JWT)
- MySQL
- Maven
- Lombok

---

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/your-username/medicBackend.git
cd medicBackend/demo
```

### 2. Configure the Database

Edit `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/medic_db?createDatabaseIfNotExist=true
spring.datasource.username=YOUR_DB_USER
spring.datasource.password=YOUR_DB_PASSWORD
```

### 3. Build and Run

```sh
mvn clean install
mvn spring-boot:run
```

The API will be available at:  
`http://localhost:8080/api`

---

## API Endpoints

| Method | Endpoint                | Description                | Auth Required |
|--------|-------------------------|----------------------------|--------------|
| POST   | `/api/auth/register`    | Register new user          | ❌           |
| POST   | `/api/auth/login`       | User login (get JWT)       | ❌           |
| GET    | `/api/users/me`         | Get current user profile   | ✅           |
| POST   | `/api/appointments`     | Create appointment         | ✅           |
| ...    | ...                     | ...                        | ...          |

> **Note:** All endpoints except `/api/auth/register` and `/api/auth/login` require a valid JWT in the `Authorization` header.

---

## Authentication

- After login, include the JWT in the `Authorization` header for all protected requests:
  ```
  Authorization: Bearer <your-jwt-token>
  ```

---

## Project Structure

```
src/main/java/com/example/demo/
├── config/         # Security configuration
├── controller/     # REST controllers
├── model/          # JPA entities
├── repository/     # Spring Data repositories
├── security/       # JWT filter and utilities
├── service/        # Business logic
```

---

## Extending with Google OAuth

- The backend is ready for Google OAuth integration.
- See `/auth/google` endpoint (to be implemented).

---

## License

This project is licensed under the MIT License.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## Contact

For questions, contact [your-email@example.com](mailto:your-email@example.com)
