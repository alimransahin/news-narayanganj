// menu load

const loadMenu=()=>{
    const url ='https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayMenu(data.data.news_category))
    .catch(error=>console.log(error));
}
const displayMenu=menus=>{
    const menuBar = document.getElementById('menu-bar');
    menus.forEach(menu => {
        const li=document.createElement('li');
        li.classList.add("ki");
        li.classList.add('nav-item');
        li.innerHTML =`
        <a onclick="loadNews('${menu.category_id}'),toggleLoader(true)" class="nav-link" href="#">${menu.category_name}</a>
        `;
        menuBar.appendChild(li);
    });
    ;
}
loadMenu();



// all news load
const loadNews =async(id)=>{
    const url=(`https://openapi.programming-hero.com/api/news/category/${id}`);
    // console.log(url);
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayNews(data.data);
    }
    catch (error) {
        console.log(error);
    }
    // console.log(data.data);
}
const displayNews=allNews=>{
    const allNewsDiv= document.getElementById('all-news');
    allNewsDiv.innerHTML="";
    const newsStatus = document.getElementById('news-status');
    if (allNews.length === 0) {
        newsStatus.innerText = "No news Found. Please try again another category";
        newsStatus.classList.remove('d-none');

    }
    else {
        newsStatus.innerText = `${allNews.length} news Found.`;
        newsStatus.classList.remove('d-none');
    }
    allNews.forEach(news=> {
        // console.log(news);
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML =
            `
    <div class="card mb-3">
        <div class="row g-0">
            <div class="col-md-auto my-auto">
                <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col ">
                <div class="card-body">
                    <h5 class="card-title mb-3">${news.title}</h5>
                    <p class="card-text text-muted mb-5">${news.details.slice(0, 250)}...<span onclick="loadDetailsNews('${news._id}')" class="text-primary pointer" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> see more</span></p>
                    <div class="d-flex flex-row justify-content-between">
                        <div class="author col-lg-4">
                            <div class="card mb-3 border-0">
                                <div class="row g-0">
                                    <div class="col-md-3">
                                        <img src="${news.author ? news.author.img:"image not found"}" class="img-fluid rounded-circle" style="max-width:50px" alt="...">
                                    </div>
                                    <div class="col-md-9 d-flex align-items-center">
                                        <div class="card-body py-0 my-auto">
                                            <h5 class="card-title m-0" >${(news.author.name != "") && (news.author.name != "system") && (news.author.name != null) ? news.author.name : "author not found"}</h5>
                                            <p class="card-text"><small class="text-muted">${news.author ? news.author.published_date: "published time not found"}</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <p class="card-text text-muted fs-5"><i class="fa-solid fa-eye"></i> ${news.total_view != null ? news.total_view: '0'}</p>
                    <p class="card-text text-muted">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    </p>
                    <span onclick="loadDetailsNews('${news._id}')" class="text-primary pointer fs-1" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="fa-solid fa-arrow-right"></i></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
        allNewsDiv.appendChild(newsDiv);
    });
    toggleLoader(false);

}
// loadNews("01");
// loader
const loader = document.getElementById('loader');
const toggleLoader = isLoading => {
    if (isLoading) {
        loader.classList.remove('d-none');
    }
    else {
        loader.classList.add('d-none');
    }
}
// modal load
const loadDetailsNews=async (id)=>{
    const url = (`https://openapi.programming-hero.com/api/news/${id}`);
    // console.log(url);
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayDetailsNews(data.data[0]);
    }
    catch(error){
        console.log(error);
    }
    // console.log(data.data[0]);
}
const displayDetailsNews=news=>{
    // console.log(news);
    // const modalTitle = document.getElementById('staticBackdropLabel');
    // modalTitle.innerText=news.title;
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML=
    `
    <img src="${news.image_url}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title mb-3">${news.title}</h5>
        <p class="card-text">${news.details}</p>
        <div class="d-flex justify-content-between align-item-center">
            <div>
            <img style="max-width:50px" class="rounded-circle me-2" src="${news.author ? news.author.img : "image not found"}">
            <span class="my-auto">${(news.author.name != "") && (news.author.name != "system") && (news.author.name != null) ? news.author.name : "author not found"}</</span>
            </div>
            <p class="card-text my-auto"><small class="text-muted">Last updated: ${news.author ? news.author.published_date : "published time not found"}</small></p>
        </div>

    </div>
    `
}