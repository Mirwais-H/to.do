const postBtn = document.getElementById('post-btn');
const commentInput = document.getElementById('comment-input');
const commentsList = document.getElementById('comments-list');

// Function to post a comment
postBtn.addEventListener('click', () => {
    const commentText = commentInput.value.trim();

    if (commentText !== "") {
        // Create a new div for the comment
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerText = commentText;

        // Append the comment to the list
        commentsList.appendChild(commentDiv);

        // Clear the input field
        commentInput.value = "";
        postBtn.disabled = true; // Disable post button again
    }
});

// Enable/Disable post button based on input
commentInput.addEventListener('input', () => {
    if (commentInput.value.trim() !== "") {
        postBtn.disabled = false;
    } else {
        postBtn.disabled = true;
    }
});
