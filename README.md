# Book Store Management System

The project is nodejs backend application for a book store management having 5 major features such as user management, book management, book purchase history, revenue tracking for authors, and book review.

## Logic for  `sellCount`

The `sellCount` attribute for a book is dynamically calculated by aggregating the purchase history. It reflects the cumulative count of how many times a particular book has been purchased. This computation involves summing the `quantity` field across all entries in the `PurchaseHistory` collection associated with that specific book. Consequently, the `sellCount` provides an accurate representation of the total number of copies sold for each book.

## Mechanism for Sending Email Notifications

The system utilizes a background job or message queue to manage email notifications asynchronously. Upon the recording of a purchase in the `PurchaseHistory` collection, an automatic email notification is initiated to inform the author. This notification encompasses essential information, including the current month, current year, and the overall revenue. By employing asynchronous processing, the email notification mechanism ensures that the sending of emails operates independently of the main application thread, enhancing overall system responsiveness for users.

## Database Design and Implementation

### Users

- The `Users` collection includes different roles such as Author, Admin, and Retail Users. User authentication and authorization are implemented to ensure secure access to various endpoints using bcrypt and JWT respectively.

### Books

The `Books` collection serves as the repository for comprehensive book information, encompassing distinctive identifiers such as `bookId`, author details, `sellCount` records, title, description, and pricing. To guarantee uniqueness, a unique index is established on both `bookId` and `title` fields within the collection. This index imposition ensures that each book is distinctly identified by its assigned `bookId` and title, preventing duplication.

### Purchase History

The `PurchaseHistory` collection meticulously logs individual book transactions, documenting essential details such as a distinct `purchaseId`, corresponding `bookId`, associated `userId`, purchase date (`purchaseDate`), pricing information (`price`), and the quantity of items purchased. An exclusive index is applied to the `purchaseId` attribute, guaranteeing the singular and distinct identification of each purchase record within the collection. This unique index configuration ensures that no two purchase entries share the same `purchaseId`, maintaining data integrity.

### Revenue Tracking for Authors

The `sellCount` serves as a metric to monitor the quantity of book copies that have been successfully sold. Author revenue computation hinges on the cumulative sales figure derived from the total sales of their respective books. This metric provides a quantitative measure of the popularity and commercial success of an author's literary works.

### Additional Features

- The application supports search and filtering options for books based on various criteria, such as author, price range, and sellCount.

- Dummy Secure payment processing is implemented for book purchases.

- Users can review and rate books, with reviews stored in the `Review` collection.

## Installation and Usage

To run the application locally:

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Run the application with `npm start`.
