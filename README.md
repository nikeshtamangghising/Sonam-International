# Sonam International E-commerce Platform

This repository contains the codebase for Sonam International's e-commerce platform, a modern clothing retail business looking to establish an online presence through a web application and mobile applications.

## Project Overview

Sonam is a clothing retail business with a focus on providing a seamless shopping experience for customers across all devices and platforms. The platform showcases the brand's clothing collections and enables customers to browse and purchase products.

## Technology Stack

- **Web Frontend:** Next.js (React framework)
- **Mobile Applications:** Flutter
- **Backend Services:** Node.js/Express with GraphQL
- **Database:** PostgreSQL
- **Caching:** Redis
- **Authentication:** JWT-based with multiple login options
- **DevOps:** GitHub Actions, Docker, Vercel/Netlify

## Repository Structure

- `Context.md`: Comprehensive project documentation including database schema, architecture, and development process
- `docs/`: Additional documentation
- `web/`: Next.js web application
- `mobile/`: Flutter mobile application
- `server/`: Backend services

## Development Process

The project follows a hybrid Agile-DevOps approach with a focus on cross-platform development. The development sequence is:

1. **Phase One:** Next.js Web Application
2. **Phase Two:** Flutter Mobile Applications

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/nikeshtamangghising/Sonam-International.git
   ```

2. Check out the `develop` branch:
   ```
   git checkout develop
   ```

3. Follow setup instructions in the respective directories:
   - Web: `web/README.md`
   - Mobile: `mobile/README.md`
   - Server: `server/README.md`

## Branching Strategy

- `main`: Production-ready code
- `develop`: Integration branch for features
- `feature/*`: Feature branches
- `bugfix/*`: Bug fix branches
- `release/*`: Release preparation branches
- `hotfix/*`: Emergency fixes for production

## Contributing

1. Create a feature branch from `develop`
2. Implement changes with regular commits
3. Push branch to GitHub
4. Create Pull Request to `develop`
5. Ensure CI/CD pipeline passes
6. Request code review from team members
7. Address review comments
8. Merge after approval

## License

Proprietary - All rights reserved by Sonam International.
