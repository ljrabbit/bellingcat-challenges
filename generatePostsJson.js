const fs = require('fs');
const path = require('path');

// Folder containing your post files
const postsDirectory = './';  // Assuming posts are in the root directory
const postsJsonPath = './posts.json';

// Function to extract title and snippet from the HTML file
function extractPostData(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Extracting title from the <h2> tag (e.g., <h2><a href="post1.html">Challenge 1: Investigating a Location</a></h2>)
    const titleMatch = fileContent.match(/<h2><a href="([^"]+)">([^<]+)<\/a><\/h2>/);
    const snippetMatch = fileContent.match(/<p>([^<]+)<\/p>/); // Assuming the snippet is in a <p> tag

    return {
        title: titleMatch ? titleMatch[2] : '',
        snippet: snippetMatch ? snippetMatch[1] : '',
        image: fileContent.match(/<img src="([^"]+)"/) ? fileContent.match(/<img src="([^"]+)"/)[1] : '',
        link: filePath
    };
}

// Function to generate the JSON file
function generatePostsJson() {
    const posts = [];

    // Read all HTML files (assuming they're named like post1.html, post2.html, etc.)
    const files = fs.readdirSync(postsDirectory).filter(file => file.startsWith('post') && file.endsWith('.html'));

    // Extract data for each post and add to the posts array
    files.forEach(file => {
        const postData = extractPostData(path.join(postsDirectory, file));
        posts.push(postData);
    });

    // Write the posts data to posts.json
    fs.writeFileSync(postsJsonPath, JSON.stringify({ posts }, null, 2));
    console.log('posts.json has been generated!');
}

// Run the script
generatePostsJson();
