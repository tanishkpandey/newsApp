const apikey = `2e6d61b6cab84906bb7f16b984b91007`;
const nav = document.querySelector(`nav`);
const main = document.querySelector('main')
const options = [
    "General",
    "Entertainment",
    "Health",
    "Science",
    "Sports",
    "Technology",
];

// To prepare the categories of navbar
function showOptions() {
    options.forEach((i) => {
        nav.innerHTML += `<a 
        class="link ${i == "General" ? "active" : ""}"
        onClick="setCatagory(event, '${i}')"
        >${i}</a>`;
    });
}

// To set category when option are clicked
function setCatagory(e, category){
    let links = document.querySelectorAll('.link')
    links.forEach((link)=>{
        link.classList.remove('active')
        main.innerHTML=""
    })
    requestURL = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=2e6d61b6cab84906bb7f16b984b91007`;
    e.target.classList.add("active");
    getNews(requestURL)
}

// function to get news
async function getNews(geturl){
    let responce = await fetch(geturl);
    let data = await responce.json()
    console.log(data)
    genUI(data.articles)
}

// function to create news cards

function genUI(allnews) {
    allnews.forEach((news) => {
        if (!news.urlToImage || !news.content || !news.description || !news.url || !news.publishedAt) {
            return; 
        }

        let card = document.createElement("div");
        card.classList.add("card-grid");

        const publishedDate = new Date(news.publishedAt);

        main.innerHTML += `<article>
            <img src="${news.urlToImage}" alt="Sample Image">
            <div class="content">
                <h2>${news.content}</h2>
                <p>${news.description}</p>
                <a href="${news.url}" class="button">Read More</a>
                <p><strong>Author:</strong> ${news.author || 'Unknown'}</p>
            </div>
        </article>`;
    });
}

window.onload = () => {
    requestURL= `https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=2e6d61b6cab84906bb7f16b984b91007`
    showOptions()
    getNews(requestURL)
}