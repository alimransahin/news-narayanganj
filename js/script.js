const loadMenu=()=>{
    const url ='https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayMenu(data.data.news_category));
}
const displayMenu=menus=>{
    menus.forEach(menu => {
        // console.log(menu.category_name);
        const menuBar = document.getElementById('menu-bar');
        const li=document.createElement('li');
        li.classList.add("ki");
        li.classList.add('nav-item');
        li.innerHTML =`
        <a class="nav-link" href="#">${menu.category_name}</a>
        `;
        menuBar.appendChild(li);
    });
}
loadMenu();