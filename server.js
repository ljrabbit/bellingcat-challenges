const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Serve static files (like images, CSS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Read the posts.json file
const getPosts = () => {
  const data = fs.readFileSync(path.join(__dirname, 'posts.json'), 'utf8');
  return JSON.parse(data);
};

// Home page - Load the 3 most recent posts
app.get('/', (req, res) => {
  const posts = getPosts();
  const recentPosts = posts.slice(0, 3);  // Get the first 3 posts
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OSINT Challenges</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <header>
            <h1>OSINT Challenges</h1>
            <p class="subheading">Tracking my progress through Bellingcat challenges</p>
        </header>
        <main>
            <section class="blog-preview">
                ${recentPosts.map(post => `
                  <article>
                      <img src="${post.image}" alt="${post.title}">
                      <h2><a href="${post.link}">${post.title}</a></h2>
                      <p>${post.snippet}</p>
                  </article>
                `).join('')}
            </section>
        </main>
    </body>
    </html>
  `);
});

// Challenges page - Load all posts
app.get('/challenges', (req, res) => {
  const posts = getPosts();
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OSINT Challenges - All Posts</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <header>
            <h1>OSINT Challenges</h1>
            <p class="subheading">All the challenges I've completed, in date order (newest first).</p>
        </header>
        <main>
            <section class="blog-preview">
                ${posts.map(post => `
                  <article>
                      <img src="${post.image}" alt="${post.title}">
                      <h2><a href="${post.link}">${post.title}</a></h2>
                      <p>${post.snippet}</p>
                  </article>
                `).join('')}
            </section>
        </main>
    </body>
    </html>
  `);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
