(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
            headers: {
                Authorization: 'Client-ID WYl48orpG-39aMBtEcQxFUU-IVg_ljidN8ul4fFxzhM'
                }
        }).then(response => response.json())
          .then(addImage)
          .catch(e => requestError(e, 'image'));

        fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=${searchedForText}&api-key=58zmgc43dfEYuhFKMAnc3SVKYdq4qP72`)
        .then(response => response.json())
        .then(addArticle)
        .catch(e => requestError(e, 'articles'))

        function addImage(data) {
            //debugger;
            let htmlContent = '';
            const firstImage = data.results[0];
            if(firstImage) {
                htmlContent = `<figure>
                    <img src='${firstImage.urls.small}' alt='${searchedForText}'>
                    <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
                    </figure>`;
            } else {
                htmlContent = 'Unfortunately, no image was returned for your search.'
            }
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

        function requestError(e, part){
            console.log(e);
            responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`)
        }

    });
})();
