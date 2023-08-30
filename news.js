const handelCategory = async() =>{
  const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
  const data = await res.json();
  const newsCategory = data.data.news_category;
  console.log(newsCategory);
  const tabContainer = document.getElementById('tab-container');
    newsCategory.forEach((newsCat) => {
    const div = document.createElement('div')
    div.className = `tabs p-6 mx-auto text-center flex flex-row justify-start font-bold text-xl`;
    div.innerHTML =`
                    <a onclick ="handelLoadNews('${newsCat.category_id}')" class="tab tab-bordered">${newsCat.category_name}</a> 
    
    `
    tabContainer.appendChild(div)

  });

}

const handelLoadNews = async(categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
    const loadNews = await res.json();
    const newsCard = loadNews.data;
    // console.log(newsCard);
    const cardNews = document.getElementById('cardNews');
    cardNews.innerHTML ="";
    newsCard?.forEach((cardshow)=> {
        console.log(cardshow);
    const div = document.createElement('div');
    div.className = `card w-auto bg-gray-100 shadow-xl`;
    div.innerHTML = `
                <figure><img src="${cardshow?.image_url}" alt="Shoes" /></figure>
                <div class="card-body">
                <h2 class="card-title">${cardshow?.title.slice(0,50)}</h2>
                <div class="avatar online">
                <div class="w-14 rounded-full">
                    <img src="${cardshow.author?.img}" />
                </div>
                </div>
                <p>${cardshow.author?.name || "No author Name"}, ${cardshow.author?.published_date}</p>
                <h2>Views: ${cardshow.total_view? cardshow.total_view : "No views"}</h2>
                <div class="card-actions justify-end">
                    <button onclick ="newsDetails('${cardshow?._id}')" class="btn btn-primary">Details</button>
                </div>
                </div>
    `
    cardNews.appendChild(div)
    });
}

const newsDetails = async(id)=>{
     const res = await fetch(`https://openapi.programming-hero.com/api/news/${id}`);
     const data = await res.json();
     const dataDetais = data.data
     console.log(dataDetais);
     const NewsPera= document.getElementById('NewsPera')
     dataDetais.forEach((news)=>{
        // console.log(news);
      const div = document.createElement('div');
      div.innerHTML=`
      <div class="w-auto mx-32">
      <img src="${news.thumbnail_url}">
      </div>
      

      <p class="py-4">${news.details}</p>
      `
      NewsPera.appendChild(div)
     })
     ModalBtn();
}

const ModalBtn = ()=>{

    newsModal.showModal()
}

handelCategory();
handelLoadNews('08')