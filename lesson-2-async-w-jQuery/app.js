/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        $.ajax({
            url: `https://api.unsplash.com/search/photos?query=${searchedForText}`,
            headers: { 
                Authorization: 'Client-ID WYl48orpG-39aMBtEcQxFUU-IVg_ljidN8ul4fFxzhM'
            }

    }).done(addImage);

    function addImage(images){
        const firstImage = images.results[0];
        let htmlContent = '';
        htmlContent = ` <figure>
        <img src="${firstImage.urls.regular}" alt="${searchedForText}">
        <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
      </figure> `;
      responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }
    });
})();
