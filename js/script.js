// menu load

const loadMenu=()=>{
    const url ='https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayMenu(data.data.news_category));
}
const displayMenu=menus=>{
    const menuBar = document.getElementById('menu-bar');
    menus.forEach(menu => {
        const li=document.createElement('li');
        li.classList.add("ki");
        li.classList.add('nav-item');
        li.innerHTML =`
        <a onclick="loadNews('${menu.category_id}')" class="nav-link" href="#">${menu.category_name}</a>
        `;
        menuBar.appendChild(li);
    });
}
loadMenu();



// all news load
const loadNews =async(id)=>{
    const url=(`https://openapi.programming-hero.com/api/news/category/${id}`);
    // console.log(url);
    const res=await fetch(url);
    const data=await res.json();
    displayNews(data.data);
    // console.log(data.data);
}
const displayNews=allNews=>{
    const allNewsDiv= document.getElementById('all-news');
    allNewsDiv.innerHTML="";
    allNews.forEach(news=> {
        console.log(news.rating.badge);
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
                                        <img src="${news.author.img}" class="img-fluid rounded-circle" style="max-width:50px" alt="...">
                                    </div>
                                    <div class="col-md-9 d-flex align-items-center">
                                        <div class="card-body py-0 my-auto">
                                            <h5 class="card-title m-0" >${news.author.name}</h5>
                                            <p class="card-text"><small class="text-muted">${news.author.published_date}</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <p class="card-text text-muted fs-5"><i class="fa-solid fa-eye"></i> ${news.total_view}</p>
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
}
const loadDetailsNews=async (id)=>{
    const url = (`https://openapi.programming-hero.com/api/news/${id}`);
    // console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    // displayNews(data.data);
    console.log(data.data[0]);
}