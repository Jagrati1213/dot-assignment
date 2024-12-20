# Product Analytics Dashboard

## Objective

The goal of this project is to create a simple Product Analytics Dashboard that displays a list of products, allows filtering, and shows basic analytics like the total number of products and average price.

## Tech Stack

- **React**: For building the user interface and components.
- **Redux Toolkit**: For managing global state.
- **Ant Design**: For UI components like tables, buttons, and modals.
- **Axios**: For making HTTP requests to the Fake Store API.
- **Recharts**: For displaying charts (pie) for product analytics.

## Data Source

- **Fake Store API**: This API provides product data that can be fetched via the `/products` endpoint.
  - API Endpoint: `https://fakestoreapi.com/products`

## Features

### Product List Page

- **Product Listing**: Fetch and display a list of products from the Fake Store API.
- **Columns**:
  - Product Name
  - Category
  - Price
  - Rating
  - Actions (View Details, Add to Favorites)
- **Search and Filter**:
  - Search by product name or category.
  - Sort products by price.

### Product Details Modal

- **Modal View**: When a product is clicked, show a modal with more product details, including:
  - Product Description
  - Product Image
  - Rating
  - Product Category
- **Add to Favorites**: Users can add products to their favorites from the modal.

### Favorites Feature

- **Mark as Favorite**: Users can mark products as favorites.
- **Favorites List**: View a list of favorite products in a separate section.
- **Local Storage**: The favorites list is persisted in local storage to retain it across sessions.

### Analytics Section

- **Product Analytics**:
  - Total number of products.
  - Average product price.
- **Chart**: Display a small pie chart showing the distribution of products across categories. This will use **Recharts**.

### Error Handling

- **API Error Handling**: Display a user-friendly error message if the API request fails.

### Bonus (Optional)

- **Sorting**: Add the ability to sort products by price (low to high, high to low).
- **Responsive Design**: Make the app responsive for mobile and tablet views.
