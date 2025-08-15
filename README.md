# BhutanWanderLuxe
this is the tourism website for bhutan wanderluxe
![Natours](https://github.com/Saurabhchaudhary9799/TourWebsite/assets/98949780/45a311a1-f1ba-4c5c-8d83-1ee5eb94aa02)

Here is the Demo Link https://natour-web-app.netlify.app/



## 💥 Introduction

 your ultimate guide to discovering the world's most breathtaking destinations. Explore, plan, and book your next adventure seamlessly with our intuitive, MERN stack-powered platform and a payment option made with Stripe and keeping in Security Principles in mind.

Wanna check the weather of the place you are visiting, it already integrated in.

## 💡 Why did I build this?

I aimed to build an intuitive, user-friendly platform that simplifies trip planning. This project combines my passion for travel with my technical skills, aiming to inspire others to explore the world effortlessly. And may be someday have my own travel agency.

## 🛠️ Local development

That's pretty easy. To ensure that you are able to install everything properly, we would recommend you to have <b>Git</b>, <b>NPM</b> and <b>Node.js</b> installed.

We will first start with setting up the Local Project Environment:

```sh
git clone https://github.com/Saurabhchaudhary9799/TourWebsite.git
cd TourWebsite
npm run dev:install
```
Now we will add the environment variables in the client/ and server/

 - Create a .env file in both client and server folder according to .example.env given in both the folders respectively.

 - For creating and adding GOOGLE_CONFIG_BASE64 in server, checkout this [link](https://newbedev.com/deploying-firebase-app-with-service-account-to-heroku-environment-variables-with-dotenv)

Once you run the Commands and get environment variables and everything fine, we are all set to run the app ✔️

On the root level run the following command:

```sh
npm run dev
```

To lint the code files, run the following command on root level:

```sh
npm run lint
```

## 🥁 Features

- Authentication and Authorization
  - Sign up, Log in, Logout, Update, and reset password.
- User profile
  - Update username, photo, email, password, and other information
  - A user can be either a regular user or an admin or a lead guide or a guide.
  - When a user signs up, that user by default regular user.
- Tour
  - Manage booking, check tour map, check users' reviews and rating
  - Tours can be created by an admin user or a lead-guide.
  - Tours can be seen by every user.
  - Tours can be updated by an admin user or a lead guide.
  - Tours can be deleted by an admin user or a lead-guide.
- Bookings
  - Only regular users can book tours (make a payment).
  - Regular users can not book the same tour twice.
  - Regular users can see all the tours they have booked.
  - An admin user or a lead guide can see every booking on the app.
  - An admin user or a lead guide can delete any booking.
  - An admin user or a lead guide can create a booking (manually, without payment).
  - An admin user or a lead guide can not create a booking for the same user twice.
  - An admin user or a lead guide can edit any booking.
- Reviews
  - Only regular users can write reviews for tours that they have booked.
  - All users can see the reviews of each tour.
  - Regular users can edit and delete their own reviews.
  - Regular users can not review the same tour twice.
  - An admin can delete any review.
- Favorite Tours
  - A regular user can add any of their booked tours to their list of favorite tours.
  - A regular user can remove a tour from their list of favorite tours.
  - A regular user can not add a tour to their list of favorite tours when it is already a favorite.
- Credit card Payment

![Natours](https://github.com/Saurabhchaudhary9799/TourWebsite/blob/master/Client/public/img/Screenshot%20from%202024-05-24%2012-39-56.png)
![Natours](https://github.com/Saurabhchaudhary9799/TourWebsite/blob/master/Client/public/img/Screenshot%20from%202024-05-24%2012-40-12.png)
![Natours](https://github.com/Saurabhchaudhary9799/TourWebsite/blob/master/Client/public/img/Screenshot%20from%202024-05-24%2012-41-09.png)
![Natours](https://github.com/Saurabhchaudhary9799/TourWebsite/blob/master/Client/public/img/Screenshot%20from%202024-05-24%2012-41-48.png)


## How To Use 🤔

### Book a tour

- Login to the site
- Search for tours that you want to book
- Book a tour
- Proceed to the payment checkout page
- Enter the card details (Test Mood):
  ```
  - Card No. : 4242 4242 4242 4242
  - Expiry date: 02 / 22
  - CVV: 222
  ```
- Finished!

### Manage your booking

- Check the tour you have booked on the "Manage Booking" page in your user settings. You'll be automatically redirected to this
  page after you have completed the booking.

### Update your profile

- You can update your own username, profile photo, email, and password.



## Build With 🏗️

- [NodeJS](https://nodejs.org/en/) - JS runtime environment
- [Express](http://expressjs.com/) - The web framework used
- [Mongoose](https://mongoosejs.com/) - Object Data Modelling (ODM) library
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud database service
- [Pug](https://pugjs.org/api/getting-started.html) - High performance template engine
- [JSON Web Token](https://jwt.io/) - Security token
- [ParcelJS](https://parceljs.org/) - Blazing fast, zero configuration web application bundler
- [Stripe](https://stripe.com/) - Online payment API and Making payments on the app.
- [Postman](https://www.getpostman.com/) - API testing
- [Mailtrap](https://mailtrap.io/) & [Sendgrid](https://sendgrid.com/) - Email delivery platform
- [Netlify](https://www.netlify.com/) - Cloud platform
- [Mapbox](https://www.mapbox.com/) - Displaying the different locations of each tour.

## To-do 🗒️

-  Sending Emails
  - Send Email to the user of the booking confirmation, and the password reset link.
- Booking
  - Prevent duplicate bookings after a user has booked that exact tour, implement favorite tours
- And More! There's always room for improvement!
