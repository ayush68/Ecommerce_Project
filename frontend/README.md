# E-Commerce Frontend - Angular

A modern, responsive e-commerce application built with Angular (Standalone components).

## Features

- **Product Management**
  - View all products with pagination and search
  - Product detail view
  - Add new products
  - Edit existing products
  - Delete products
  - Image upload support

- **Shopping Cart**
  - Add/remove items
  - Update quantities
  - Persistent cart (localStorage)
  - Real-time cart total and count

- **Checkout & Orders**
  - Customer information collection
  - Order placement
  - Order history view
  - Order details with item breakdown

- **Modern UI**
  - Clean, responsive design
  - Gradient navbar
  - Smooth animations
  - Mobile-friendly layout

## Tech Stack

- **Frontend**: Angular 18+
- **Styling**: CSS3
- **HTTP Client**: Angular HttpClient
- **State Management**: RxJS, BehaviorSubject
- **Storage**: localStorage for cart persistence

## Project Structure

```
src/
├── app/
│   ├── components/          # UI components
│   │   ├── navbar/
│   │   ├── product-list/
│   │   ├── product-detail/
│   │   ├── product-form/
│   │   ├── cart/
│   │   └── orders/
│   ├── services/            # API and business logic
│   │   ├── product.service.ts
│   │   ├── cart.service.ts
│   │   └── order.service.ts
│   ├── models/              # TypeScript interfaces
│   │   ├── product.model.ts
│   │   └── order.model.ts
│   ├── app.component.ts     # Root component
│   ├── app.config.ts        # App configuration
│   └── app.routes.ts        # Routing configuration
├── styles.css               # Global styles
├── main.ts                  # Application bootstrap
└── index.html              # HTML template
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Update API URL in services if needed:
   - Default: `http://localhost:8080/api`
   - Edit in: `src/app/services/*.service.ts`

## Running the Application

Start the development server:
```bash
npm start
```

Navigate to `http://localhost:4200/` in your browser.

## Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## API Endpoints Required

Make sure your backend provides these endpoints:

- `GET /api/products` - Get all products
- `GET /api/product/:id` - Get product by ID
- `POST /api/product` - Add new product
- `PUT /api/product/:id` - Update product
- `DELETE /api/product/:id` - Delete product
- `GET /api/product/search?keyword=` - Search products
- `GET /api/product/:id/image` - Get product image
- `POST /api/orders/place` - Place order
- `GET /api/orders` - Get all orders

## Component Details

### Navbar Component
- Navigation links to all pages
- Cart badge showing item count
- Responsive menu

### Product List Component
- Display products in grid layout
- Search functionality
- Add to cart functionality
- Product management options

### Product Form Component
- Add new products
- Edit existing products
- Image upload
- Form validation

### Cart Component
- View cart items
- Update quantities
- Remove items
- Checkout form
- Order placement

### Orders Component
- View order history
- Order details
- Customer information
- Item breakdown

## Styling

The application uses:
- CSS Grid for layouts
- CSS Flexbox for component alignment
- Gradient backgrounds
- Responsive media queries
- Modern color scheme

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
