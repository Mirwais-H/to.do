// Like Button and Share Button Functionality
const likeButton = document.getElementById('like-button');
const likeCountElement = document.getElementById('like-count');
const shareButton = document.getElementById('share-button');
const commentButton = document.getElementById('comment-button'); // Comment button
const commentSection = document.querySelector('.comment-section'); // Comment section
const commentInput = document.getElementById('comment-input');
const commentSubmitButton = document.getElementById('comment-submit');
const commentsContainer = document.getElementById('comments-container');

let likeCount = localStorage.getItem('likeCount') ? parseInt(localStorage.getItem('likeCount')) : 0;
let comments = JSON.parse(localStorage.getItem('comments')) || [];

// Initialize like count from localStorage if available
likeCountElement.innerText = likeCount;

// Load comments from localStorage
comments.forEach(comment => {
    addCommentToContainer(comment);
});

// Handle Like button click
likeButton.addEventListener('click', () => {
    likeCount++;
    likeCountElement.innerText = likeCount;
    localStorage.setItem('likeCount', likeCount); // Store like count in localStorage
    likeButton.classList.add('active'); // Toggle active state for button
});

// Handle Share button click
shareButton.addEventListener('click', () => {
    const postUrl = window.location.href; // Example: share the current page URL
    navigator.clipboard.writeText(postUrl).then(() => {
        alert('Post URL copied to clipboard! Share it with others.');
    });
});

// Comment Button Functionality
commentButton.addEventListener('click', () => {
    if (commentSection.style.display === 'none' || commentSection.style.display === '') {
        commentSection.style.display = 'block';
    } else {
        commentSection.style.display = 'none';
    }
});

// Function to add comment to the container
function addCommentToContainer(comment) {
    const newComment = document.createElement('div');
    newComment.classList.add('comment');
    newComment.innerHTML = `<p><strong>You</strong>: ${comment}</p>`;
    commentsContainer.appendChild(newComment);
}

// Handle comment submission
commentSubmitButton.addEventListener('click', () => {
    const commentText = commentInput.value.trim();
    
    if (commentText !== "") {
        comments.push(commentText);
        localStorage.setItem('comments', JSON.stringify(comments)); // Save comments to localStorage
        addCommentToContainer(commentText); // Add comment to the container
        
        // Clear the textarea after submitting the comment
        commentInput.value = "";
    } else {
        alert("Please write a comment before submitting!");
    }
});

// Handle Comment button click to toggle the comment section visibility
commentButton.addEventListener('click', () => {
    commentSection.classList.toggle('active');
});
