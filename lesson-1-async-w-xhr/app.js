(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword').value;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
    });

    //1- Create an XMLHTTP Request object
    const xhrImage = new XMLHttpRequest();     // for image From unsplash
    const xhrArticle = new XMLHttpRequest();   // for article From nytimes


    //2- Create a callback function.
    xhrImage.onreadystatechange = function () {      // for image From unsplash
        if (xhrImage.readyState === 4) {
            addImage();
        }
    };

    xhrArticle.onreadystatechange = function () {     // for article From nytimes
        if (xhrArticle.readyState === 4) {
            addArticle();
        }
    }

    //3- open request

    // for image From unsplash
    xhrImage.open('GET',
        `https://api.unsplash.com/search/photos?query=${searchField}&client_id=WYl48orpG-39aMBtEcQxFUU-IVg_ljidN8ul4fFxzhM`
    );
    xhrImage.setRequestHeader('Authorization', 'client-ID=WYl48orpG-39aMBtEcQxFUU-IVg_ljidN8ul4fFxzhM');


    // for article From nytimes
    xhrArticle.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=${searchField}&api-key=58zmgc43dfEYuhFKMAnc3SVKYdq4qP72`);



    //4- Send the Request
    xhrImage.send();         // for image From unsplash
    xhrArticle.send();      // for article From nytimes

    //add Image to the Page
    function addImage() {
        let htmlContentImage = '';
        const data = JSON.parse(xhrImage.responseText);
        const firstImage = data.results[0];
        htmlContentImage = ` <figure>
            <img src="${firstImage.urls.regular}" alt="${searchField}">
            <figcaption>${searchField} by ${firstImage.user.name}</figcaption>
          </figure> `;
        responseContainer.insertAdjacentHTML('afterbegin', htmlContentImage);
    }

    // Add article to the page
    function addArticle() {
        let htmlContent = '';
        const articleData = JSON.parse(xhrArticle.responseText);
        if (articleData.response && articleData.response.docs && articleData.response.docs.length > 1) {
            htmlContent = '<ul>' + articleData.response.docs.map(article => `<li class='article'>
                <h2><a href='${article.web_url}'>${article.headline.main}</a></h2>
                <p>${article.snippet}</p>
                </li>`
                ).join('') + '</ul>'
            responseContainer.insertAdjacentHTML('beforeend', htmlContent);
            console.log('results article', article.response);
        } else {
            console.log('no data found');
        }
    }
})();