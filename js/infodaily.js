//category section loaded

try{
    const categoriesLoaded= () =>{
        const url='https://openapi.programming-hero.com/api/news/categories';
        fetch(url)
       .then(res => res.json())
       .then(data => displayCategory(data.data.news_category))
    }
    
    const displayCategory=(categories) =>{
        const ulContainer=document.getElementById('ul-container');
    
        for(const category of categories){
           const List=document.createElement('li');
           List.classList.add('nav-item')
         List.innerHTML=`
        
         <li><a onclick="loadNewsPage('${category.category_id}')" class="nav-link text-black" href="#">${category.category_name}</a></li>
    
         
         `
         
      ulContainer.appendChild(List)
        
        }
        
     }

     categoriesLoaded();  

    
 }
 catch(error){
    console.log(error);
 }
 
 //load news page
 
 const loadNewsPage=(news_id)=>{
    
    const url=`https://openapi.programming-hero.com/api/news/category/${news_id}`;
    toggleSpinner(true) 
    fetch(url)
    
   .then(res => res.json())
   
   .then(data =>displayNewsPage(data.data))

}

//sorting Total view for Listing news page

 const sortingTotalView = (view)=>{
    const sorting = view.sort((a, b) => {
        return view= b.total_view - a.total_view;
    });
    
 }

//display news page
const displayNewsPage=(totalview,newsData)=>{
    
        const newsDetailsContainer = document.getElementById('display-news');
        newsDetailsContainer.innerHTML = ''
        //call sorting Total value
        sortingTotalView(totalview)
        totalview.forEach(news => {
            
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="row g-0 mb-5 mt-5 p-3 border-0 bg-light shadow-sm">
                        <div class="col-md-4 p-3">
                            <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8 mt-4">
                            <div class="card-body">
                                <h5 class="card-title fw-semibold">${news.title}</h5>
                                <p class="card-text">${news.details.slice(0,550)}...</p>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="d-flex">
                                        <img class="pe-2 img-fluid rounded-circle" style="height: 50px; width:50px" src="${news.author.img}" alt="">
                                        <div>
                                        <h6>${news.author.name ? news.author.name :"no name found"}</h6>
                                        <h6 class="d-none d-md-none d-lg-block">${news.author.published_date ?news.author.published_date :"date no found"}</h6>
                                        </div>
                                        </div>
                                        <div class="d-flex align-items-center justify-content-center">
                                           <i class="fa-solid fa-eye mb-2"></i>
                                            <h6>${news.total_view ? news.total_view :"no view"}</h6>
                                        </div>
                                        <div class="d-none d-md-none d-lg-block d-flex ">
                                           <i class="fa-solid fa-star"></i>
                                           <i class="fa-solid fa-star"></i>
                                           <i class="fa-solid fa-star"></i>
                                           <i class="fa-solid fa-star"></i>
                                           <i class="fa-solid fa-star"></i>
                                           
                                        </div>
                                        <div>
                                        <button onclick="loadNewsDetails('${news._id}')" href="#" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                                            
                                        </div>

                                    </div>
    
                            </div>
                        </div>
                    </div>
            
            `;
            
            newsDetailsContainer.appendChild(div);
           
           
        })
        toggleSpinner(false)
        const itemFounded=document.getElementById('item-founded');
        itemFounded.innerHTML=`
         <p>${totalview.length} items found for category</p>
        `
    }
    

    //loader 
    const toggleSpinner = isLoading => {
        const loaderSection = document.getElementById('loader');
        if(isLoading){
            loaderSection.classList.remove('d-none')
        }
        else{
            loaderSection.classList.add('d-none');
        }
    }
  //modal data loaded
    const loadNewsDetails=(news_id)=> {
        
        fetch(`https://openapi.programming-hero.com/api/news/${news_id}`)
        .then(res =>res.json(res))
        .then(data => detailsNewsData(data.data))
}
const detailsNewsData = (news_id) =>{
    const newsDetails = document.getElementById('news-details');
    newsDetails.innerHTML=""
    const div = document.createElement("div")
    div.innerHTML = `
    <div class="text-center mb-4"><img src="${news_id[0].thumbnail_url}"></div>
    <h5><b>Author Name:</b> ${news_id[0].author.name? news_id[0].author.name:"Unknown"}</h5>
    <h5><b>Pulbish Date</b>: ${news_id[0].author.published_date} </h5>
    <h5><b>Title:</b> ${news_id[0].title?news_id[0].title:"Not found"}</h5>
    <p><b>Description:</b>${news_id[0].details}</p>
    <p><b>Total Views: </b>${news_id[0].total_view?news_id[0].total_view:"No Viwes"}</p>
    <p><b>Rating: </b>${news_id[0].rating.number}</p>
    <p><b>remarks: </b>${news_id[0].rating.badge}</p>
    
    `
   newsDetails.appendChild(div)
  
 }

loadNewsPage('01')


 