(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
    });
const searchedForText = 'hippos';
const unsplashRequest = new XMLHttpRequest();
unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
unsplashRequest.onload = addImage;
unsplashRequest.setRequestHeader('Authorization', 'WYl48orpG-39aMBtEcQxFUU-IVg_ljidN8ul4fFxzhM');
unsplashRequest.send();

function addImage(){
    
}
})();


