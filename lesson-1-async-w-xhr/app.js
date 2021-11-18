(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        console.log('click', searchedForText)
        });
    // const searchedForText = 'hippos';
    const unsplashRequest = new XMLHttpRequest();
    unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?query=${searchedForText}&client_id=WYl48orpG-39aMBtEcQxFUU-IVg_ljidN8ul4fFxzhM`);
    unsplashRequest.onload = addImage;
    unsplashRequest.setRequestHeader('Authorization', 'client-ID=WYl48orpG-39aMBtEcQxFUU-IVg_ljidN8ul4fFxzhM');
    unsplashRequest.send();

    function addImage(){
        let htmlContent = '';
        const data = JSON.parse(unsplashRequest.responseText);
        console.log('results', data.results[0]);
        const firstImage = data.results[0];
        htmlContent = ` <figure>
        <img src="${firstImage.urls.regular}" alt="${searchedForText}">
        <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
      </figure> `;
      responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }
})();


