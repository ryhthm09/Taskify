# Taskify

Taskify is a to-do list application built using HTML, CSS, Bootstrap, Node.js, Express.js, and MongoDB. The main feature of Taskify is that it allows users to create custom to-do lists. Each user can access their own to-do list via a unique URL pattern, e.g., `https://taskify-uwi4.onrender.com/<username>`.

## Live Website

Visit the live version of Taskify here: [Taskify Live Website](https://taskify-uwi4.onrender.com/)

## Features

- **Custom To-Do Lists:** Users can create and access custom to-do lists via unique URLs.
- **Responsive Design:** Built with Bootstrap, Taskify offers a responsive and user-friendly interface.
- **Real-Time Updates:** Users can add, update, and delete tasks in real time.

## Screenshot

![image](https://github.com/user-attachments/assets/a788e185-af01-4dfa-838b-0f0a0e92f858)

## Technologies Used

- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) - Markup language for structuring the application
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) - Styling the application
- [Bootstrap](https://getbootstrap.com/) - Responsive design framework
- [Node.js](https://nodejs.org/en/) - Backend runtime environment
- [Express.js](https://expressjs.com/) - Web framework for Node.js
- [MongoDB](https://www.mongodb.com/) - NoSQL database for storing to-do lists

## Installation

To get started with Taskify, follow these steps:

1.**Clone the repository:**

   ```bash
   git clone https://github.com/ryhthm09/Taskify.git
   ```

2.**Navigate to Project Directory:**
 ```bash
 cd Taskify
```
3.**Install the dependencies:**
```bash
npm install
```
4.**Setup a database**
Make sure MongoDB is running.
Create a .env file in the root directory with your MongoDB connection string:
```
URI=your_mongodb_connection_string
```

Also add PORT in your .env
```
PORT=3000
```
5.**Start the application:**
```bash
node app.js
```
6.**Open your browser and go to:**
```
http://localhost:3000
```
**Usage**
Once the application is running, users can access their to-do list by navigating to a URL with their username, e.g., http://localhost:3000/johndoe. Users can add, update, and delete tasks on their custom to-do list.

**Contributing**
Contributions are welcome! Please feel free to submit a pull request or issue to enhance the project.

**Contact**
For any questions or feedback, please reach out at:

Email:anandsharma1123@gmail.com

GitHub: @ryhthm09


