# TripSelect - Travel Agency Portal

This is a web application for a travel agency portal. The portal displays current travel offers. The web application has the following features:

## User Roles

1. **Admin**: Manages users and advertisements for current travel offers.
   - Can add new users.
   - Can modify user details.
   - Can deactivate users (instead of deleting them).
   - Can add new travel offers.
   - Can modify existing travel offers and delete them.
   - Has access to questions posted on travel offers by users with the user role and can remove them if necessary (e.g., if they contain inappropriate content).

2. **User**:
   - Can register independently.
   - Can view travel offers.
   - Can post questions on published travel offers.
   - Can sign up for a trip.
   - Can view travel history (trips the user has signed up for, with end dates older than the current date).

Only users with an active status can sign up for the system. Other users who are not registered are guests (visitors) and can only view detailed information about travel offers and posted questions. To post a question or sign up for a trip, a user must register and obtain the user role.

## Pages for Login and Registration

The login page allows all registered users, entered into the system by an admin or by a user who independently registered, to log in to the web application. In addition to the login form, the login page includes a link to the registration page, where a visitor (guest) can register. By registering independently, the user obtains the user role.

After successfully logging in, depending on the user's role (admin or user), the system offers appropriate options for their further work (as listed under section 1 of this task).

## Main Page

The main (home) page provides a summary of all travel offers, with an option to view each travel offer in detail, including posted questions, and filter by categories. Travel offers can be categorized as follows: Europe, long-distance trips, beach vacations, etc.

## Getting Started

To run the project:

1. Run `npm install` inside the main folder.
2. Run `npm install` inside the /frontend folder.
3. Add the necessary environment variables inside the .env file.
4. Run `npm run dev` inside the main folder.

## Technologies Used

This website is fully made using the MERN Stack. Here is the list of technologies used:

- HTML/CSS/SCSS
- JavaScript
- React JS
- Redux
- MaterialUI
- MongoDB
- Node.js, Express.js