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

        $.ajax({
            url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=${searchedForText}&api-key=58zmgc43dfEYuhFKMAnc3SVKYdq4qP72`,
    }).done(addArticle);

    function addImage(images){
        const firstImage = images.results[0];
        let htmlContent = '';
        htmlContent = ` <figure>
        <img src="${firstImage.urls.regular}" alt="${searchedForText}">
        <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
      </figure> `;
      responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }

    // Add article to the page
    function addArticle(articles){
        let htmlContent = '';
        if(articles.response && articles.response.docs && articles.response.docs.length > 1){
            const articleData = articles.response.docs;
            htmlContent = '<ul>' + articleData.map(article => `<li class='article'>
                <h2><a href='${article.web_url}'>${article.headline.main}</a></h2>
                <p>${article.snippet}</p>
                </li>`
                ).join('') + '</ul>'
            responseContainer.insertAdjacentHTML('beforeend', htmlContent);
        }else {
            console.log('no data found')
        }
    }
    });
})();
