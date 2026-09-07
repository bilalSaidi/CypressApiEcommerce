# Cypress API Automation Project

A comprehensive Cypress API automation framework demonstrating advanced testing patterns, schema validation, and CI/CD integration. This project showcases modern API testing practices with real-world scenarios and enterprise-level quality assurance.

**API Documentation:** https://api-with-bugs.practicesoftwaretesting.com/api/documentation  
**Practice Application:** https://testsmith-io.github.io/practice-software-testing/#/

> **Note:** This project uses a public practice API for demonstration purposes. All test data, credentials, and API endpoints are publicly available and intended for learning and portfolio purposes. No sensitive or production data is used in this project.

## 🚀 Key Features & Skills Demonstrated

### Advanced Testing Patterns
- **Custom Cypress Commands** - Reusable authentication and utility functions
- **Schema Validation** - JSON Schema validation using AJV for API contract testing
- **Test Data Management** - Dynamic test data generation with Faker.js
- **CRUD Operations** - Complete Create, Read, Update, Delete test coverage
- **Error Handling** - Comprehensive negative scenario testing
- **Test Isolation** - Proper setup and cleanup for reliable test execution

### API Testing Excellence
- **Authentication Testing** - Bearer token authentication and authorization
- **Pagination Handling** - Dynamic user ID discovery across paginated results
- **HTTP Status Validation** - Proper status code verification (200, 201, 401, 404, 409)
- **Response Validation** - Deep object comparison and schema validation
- **Negative Testing** - Unauthorized access, duplicate registration, invalid data

### CI/CD & DevOps
- **GitHub Actions** - Automated testing pipeline with Node.js 22
- **Artifact Management** - Screenshot and video capture for debugging
- **Environment Configuration** - Dynamic Cypress config creation in CI
- **Branch Protection** - Quality gates for code merging

## 🛠️ Technology Stack

- **Cypress 16** - Modern E2E testing framework
- **JavaScript (ES6+)** - Modern JavaScript features
- **@faker-js/faker** - Realistic test data generation
- **AJV** - JSON Schema validation
- **GitHub Actions** - CI/CD automation
- **JSON Schema** - API contract validation

## 📋 Setup & Installation

### Prerequisites
- Node.js 22+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bilalSaidi/CypressApiEcommerce.git
   cd APICYPRESS
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run tests** (config is created automatically in CI, or create locally)
   ```bash
   # For local development, create cypress.config.js with:
   # baseUrl: https://api-with-bugs.practicesoftwaretesting.com
   # AdminEmail: admin@practicesoftwaretesting.com
   # AdminPassword: welcome01
   ```

### Running Tests

```bash
# Interactive mode
npx cypress open

# Headless execution
npm test

# Specific browser
npm run test:chrome

# With browser UI
npm run test:headed
```

## 🏗️ Project Architecture

```
cypress/
├── e2e/                    # Test specifications
│   └── users.cy.js        # User management API tests
├── fixtures/               # Test data and schemas
│   ├── user.js            # User test data
│   └── schemas/           # JSON Schema definitions
│       ├── userResponse.schema.json
│       ├── paginatedUserResponse.schema.json
│       ├── duplicateConflictResponse.schema.json
│       ├── unauthorizedResponse.schema.json
│       ├── updateResponse.schema.json
│       ├── itemNotFoundResponse.schema.json
│       └── tokenResponse.schema.json
├── support/                # Custom commands and utilities
│   ├── commands.js        # Custom Cypress commands
│   ├── e2e.js            # Global configuration
│   └── helperFunctions.js # Utility functions
└── screenshots/           # Test failure screenshots
```

## 🔧 Advanced Features

### 1. Schema Validation
Custom Cypress command for JSON Schema validation using AJV:

```javascript
// Validates API responses against predefined schemas
cy.validateSchema('userResponse', response.body);
```

**Benefits:**
- **API Contract Testing** - Ensures API responses match expected structure
- **Data Integrity** - Validates data types, required fields, and formats
- **Regression Prevention** - Catches API changes that break contracts
- **Documentation** - Schemas serve as living API documentation

### 2. Custom Authentication Command
Reusable login command with token management:

```javascript
// Custom command handles authentication flow
cy.login().then((token) => {
  AdminToken = token; // Reuse across tests
});
```

**Features:**
- **Token validation** - Verifies successful authentication
- **Reusability** - Single login for entire test suite
- **Error handling** - Proper failure scenarios

### 3. Dynamic Test Data
Faker.js integration for realistic test data:

```javascript
const newUser = {
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  email: faker.internet.email(),
  // ... more realistic data
};
```

**Advantages:**
- **Realistic Testing** - Data resembles production scenarios
- **Uniqueness** - Prevents test data conflicts
- **Maintainability** - No hardcoded test data
- **Scalability** - Easy to generate multiple test cases

### 4. Pagination Handling
Smart user discovery across paginated results:

```javascript
// Custom function finds user ID across multiple pages
findUserOnPage(userEmail, AdminToken, 1).then((id) => {
  userId = id;
});
```

**Capabilities:**
- **Dynamic Discovery** - Finds users regardless of pagination
- **Efficient Search** - Stops when user is found
- **Error Handling** - Graceful handling of missing users
- **Performance** - Optimized for large datasets

## 🧪 Test Coverage

### User Management API Tests

**Positive Scenarios:**
- ✅ Admin authentication and token retrieval
- ✅ Get all users with valid authentication
- ✅ Create new user with valid data
- ✅ Update existing user information
- ✅ Delete user and verify removal
- ✅ Schema validation for all responses

**Negative Scenarios:**
- ✅ Unauthorized access without token
- ✅ Duplicate user registration (409 Conflict)
- ✅ Invalid user operations (404 Not Found)
- ✅ Malformed request handling

**Edge Cases:**
- ✅ Pagination boundary testing
- ✅ Empty response handling
- ✅ Network error scenarios
- ✅ Data validation edge cases

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

**Triggers:**
- Push to main/master/develop branches
- Pull request creation/updates
- Manual workflow dispatch

**Matrix Strategy:**
- **Node.js version**: 22 (required for Cypress 16)
- **Browser**: Chrome
- **OS**: Ubuntu Latest

**Pipeline Features:**
- **Dynamic Config Creation** - Cypress config created in CI environment
- **Artifact Collection** - Screenshots and videos on failures
- **Environment Variables** - Direct credential configuration
- **Quality Gates** - Branch protection rules

### Configuration

The CI pipeline automatically creates the Cypress configuration file with:
- **Base URL:** https://api-with-bugs.practicesoftwaretesting.com
- **Admin Credentials:** Public demo credentials (no secrets needed)
- **Browser:** Chrome
- **Node.js:** Version 22

## 📊 Quality Assurance

### Code Quality
- **ES6+ Features** - Modern JavaScript syntax
- **Modular Design** - Separated concerns and reusable components
- **Error Handling** - Comprehensive error scenarios
- **Documentation** - Inline comments and README

### Test Quality
- **Deterministic Tests** - Reliable, repeatable test execution
- **Proper Cleanup** - Test data isolation and cleanup
- **Meaningful Assertions** - Specific, valuable test validations
- **Performance** - Optimized test execution

### Security
- **Credential Management** - Uses public demo credentials (no real secrets)
- **Environment Variables** - Configuration for different environments
- **API Security** - Proper authentication testing
- **Data Privacy** - All data is from public practice API (no sensitive data)

## 🌐 Public Practice API

This project uses the **Toolshop Practice API**, a public testing environment designed for learning and portfolio purposes.

### API Information
- **Base URL:** https://api-with-bugs.practicesoftwaretesting.com
- **Documentation:** https://api-with-bugs.practicesoftwaretesting.com/api/documentation
- **Practice Application:** https://testsmith-io.github.io/practice-software-testing/#/
- **Purpose:** Public testing environment for API automation practice

### Test Data & Credentials
All test data and credentials used in this project are **publicly available** and intended for learning:

- **Admin Email:** `admin@practicesoftwaretesting.com`
- **Admin Password:** `welcome01`
- **Test Users:** Generated dynamically using Faker.js
- **API Endpoints:** All endpoints are publicly accessible
- **No Sensitive Data:** This project contains no production secrets or private information

### Learning Objectives
This practice API is designed to demonstrate:
- REST API testing patterns
- Authentication and authorization
- CRUD operations
- Error handling and edge cases
- Schema validation
- Test data management

## 📈 Future Enhancements

Potential improvements for this project:

- **Visual Testing** - Screenshot comparison
- **Performance Testing** - Load and stress testing
- **Reporting** - Enhanced test reporting and analytics
- **Parallelization** - Cypress Cloud integration

---

**This project demonstrates enterprise-level API testing capabilities and modern software development practices suitable for production environments.**

## 🔧 Technical Implementation Details

### CRUD Workflow

The CRUD tests intentionally run as an ordered workflow because later operations need the user created by earlier operations:

1. Create a user with `newUser`.
2. Request the users collection and find the created user by its unique email.
3. Store the user's ID for later requests.
4. Attempt to register the same user again and expect `409`.
5. Update the user with `updatedUser` and expect `{ success: true }`.
6. GET the user by ID and verify the updated fields individually.
7. DELETE the user and expect `204` with an empty response body.
8. GET the deleted user and expect `404` with `Requested item not found`.

### Delete Cleanup And Endpoint Validation

The DELETE operation has two purposes in this project:

1. **Cleanup:** The `after()` hook deletes the generated user at the end of the admin suite so test data is not left in the public API. If the test fails before an ID is found, the hook skips the request because there is no known user to delete.
2. **Endpoint validation:** The same cleanup request validates the DELETE endpoint itself by asserting HTTP `204` and an empty response body. After deletion, a GET request for the same ID confirms that the user no longer exists with HTTP `404` and the message `Requested item not found`.

This keeps the test environment clean while also testing the complete delete behavior.

### Solutions To API Limitations

#### The create response does not return the user ID

The registration response confirms creation but does not provide the new user's ID. The update, GET-by-ID, and DELETE endpoints require that ID.

The test therefore requests `/users`, searches the returned `data` array by the unique Faker-generated email, and stores the matching user's ID.

#### The users response is paginated

The users endpoint does not return one complete flat array. Its response contains pagination metadata such as `current_page`, `last_page`, and a `data` array.

The ID lookup starts on page 1, searches `data`, and requests the next page until the user is found or `last_page` is reached.

#### Error responses are asserted explicitly

For expected HTTP errors, the test uses `failOnStatusCode: false`. This lets Cypress return the response so the test can assert the expected status and message instead of failing before the assertion runs.

### Test Data

`cypress/fixtures/user.js` uses Faker to export both:

- `newUser` for registration and duplicate-registration checks
- `updatedUser` for the update request and field-by-field verification

The same generated `newUser` object is reused for the duplicate-registration test, ensuring the email is identical.

## Design Note

The CRUD tests are intentionally dependent because they represent one user's lifecycle. This makes the relationship between create, read, update, and delete behavior clear. In a larger production suite, independent tests could create and clean up their own data to reduce coupling and improve parallel execution.
