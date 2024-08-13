
document.addEventListener('DOMContentLoaded', async () => {
    if (!localStorage.getItem('api_data')) {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const data = await response.json();
        localStorage.setItem('api_data', JSON.stringify(data));
    }
    const pageNumber = Number(document.querySelector('#page-number').value);
    const itensNumber = Number(document.querySelector('#itens-number').value);
    showPosts(pageNumber, itensNumber);
})

const leftArrow = document.querySelector('#left-arrow')
const rigthArrow = document.querySelector('#rigth-arrow')
const selectPageNumber = document.querySelector('#itens-number')

selectPageNumber.addEventListener('change', () => {
    const pageNumber = document.querySelector('#page-number').value;
    const itensNumber = document.querySelector('#itens-number').value;
    showPosts(pageNumber, itensNumber);
})

leftArrow.addEventListener('click', () => {
    const pageNumber = document.querySelector('#page-number');
    pageNumber.value <= 1 ? pageNumber.value = 1 : pageNumber.value--
    const currentPageNumber = document.querySelector('#page-number').value;
    itensNumber = document.querySelector('#itens-number').value;
    showPosts(currentPageNumber, itensNumber);
})

rigthArrow.addEventListener('click', () => {
    const pageNumber = ++document.querySelector('#page-number').value;
    const itensNumber = document.querySelector('#itens-number').value;
    showPosts(pageNumber, itensNumber);
})
    
const showPosts = (pageNumber, itensNumber) => {
    pageNumber = Number(pageNumber);
    itensNumber = Number(itensNumber);
    posts = document.querySelectorAll('.post');
    posts.forEach(post => post.remove());
    const apiData = JSON.parse(localStorage.getItem('api_data'));
    
    const start = (pageNumber - 1) * itensNumber;
    const end = start + itensNumber - 1;
    
    const currentPosts = apiData.filter((post, i) => {
        if (i >= start && i <= end) return post
    });
    const postsContainer = document.getElementById('posts-container');
    currentPosts.forEach((post) => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

        const title = document.createElement('h2');
        title.classList.add('title');
        title.textContent = post.title;

        const body = document.createElement('p');
        body.classList.add('body');
        body.textContent = post.body;

        postDiv.appendChild(title);
        postDiv.appendChild(body);
        postsContainer.appendChild(postDiv);
    })
}
