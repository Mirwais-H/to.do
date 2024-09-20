let likeCount = localStorage.getItem('likeCount') ? parseInt(localStorage.getItem('likeCount')) : 0;
let liked = localStorage.getItem('liked') === 'true';

document.getElementById('likeCount').innerText = likeCount;

if (liked) {
    document.getElementById('likeButton').classList.add('liked');
}

document.getElementById('likeButton').addEventListener('click', function() {
    liked = !liked;
    if (liked) {
        likeCount++;
        document.getElementById('likeButton').classList.add('liked');
    } else {
        likeCount--;
        document.getElementById('likeButton').classList.remove('liked');
    }
    document.getElementById('likeCount').innerText = likeCount;

    // Save to local storage
    localStorage.setItem('likeCount', likeCount);
    localStorage.setItem('liked', liked);
});
