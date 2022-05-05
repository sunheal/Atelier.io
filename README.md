# Project Atelier | Hack Reactor Front-end Capstone

***Table of Contents***
* Team Members
* Description
* Installation
* LightHouse Audit Results
---
**Team Members**

*Hack Reactor Cohort - RPP34*

Group Name - Peru

* Alan Li - Product Overview Module
* Nicole Qi - Questions & Answers Module
* Kyle Kang - Ratings & Reviews Module
* Nicole Li - Related Products Module
---
**Description**

Our application allows the user to click through products and styles to add to their shopping carts. In addition, users can see the current questions asked for the selected product as well as add their own questions & answers. At the very bottom, users can view reviews written by other customers. There is a star rating for each product. The user can add their own rating and review to the products. Overall, there is a click tracker that logs the users’ click interactions into an API.

*Main Components*
1) Product Overview
* The Overview module is top-most module on the Product Detail page.
* This component will guide the customer through selecting a specific style and size to add to their cart.
2) Related Product
*
*
3) Questions & Answers
* The Questions & Answers module allows asking and answering of questions for the product selected.
* This component extends the ability to view and search questions, ask questions, answer questions and provide feedback on questions about the current product.
4) Ratings & Reviews
* Allowing users to view and submit reviews for the product selected.
* Dynamically rendering components based on contents from RESTful API.
---
**Installation**

Our application uses React, Express, Axios, webpack, and babelrc mainly. The developer needs node installed and would just need to run an npm install and then run the npm commands to start webpack and the server. The developer would also need their own config files such as a GitHub token and an imgBB key, in order to use the image upload function.

1) Install all packages by running the following commands in your terminal.
```
npm install
```
2) Start the server.
```
npm run server-dev
```
3) On a separate terminal, run webpack.
```
npm run react-dev
```

4) Create a file named as `config.js`

5) Insert your own GitHub token and imgBB token into the `config.js` file.

6) Open the project in your web browser.
http://localhost:3111/

---
**LightHouse Audit Results**

These are screenshots of the LightHouse audit results (taken locally) for desktop.

Page performance goals:
* Time to First Paint: 0.3 seconds
* Speed Index: 1.1 seconds
* Time to Interactive: 1.7 seconds

![desktop](https://github.com/rpp34-fec-peru/Project-Atelier/blob/master/screenshots/Screen%20Shot%202022-05-04%20at%206.43.26%20PM.jpg)

---
