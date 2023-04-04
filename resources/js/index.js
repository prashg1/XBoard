// console.log(magazines)

async function init() {
  
    let data = await fetchData();
     console.log(data)
    //Updates the DOM with the data
      addToDOM(data);
      addnextTODOM(data)
  
  }
  
  //Fetches list of all data 
  async function fetchData(){
  
    let arr = []
      for(let i = 0; i < magazines.length; i++)
      {
           
            const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${magazines[i]}`)
            const data = await res.json();
            arr.push(data)
          
      }
      return arr
  } 
  
  // Populate the fetched data details and insert those details into the DOM
  function addToDOM(datafetched){
  
  /**Accordion */  
         let get = document.getElementById("addAccordion")
            get.innerHTML =`
        <div class="accordion" id="accordionInsert">
    
            </div>`
         for(let i = 0; i < datafetched.length; i++)
          { 
  
             let accordianDiv = document.createElement("div")
             accordianDiv.className ="accordion-item"
             accordianDiv.id = "item"+`${i+1}`
  
            if(i===0)
            {
              accordianDiv.innerHTML =`
     
              <button class="accordion-button" data-bs-toggle="collapse" data-bs-target="#collapse${i+1}">
                ${datafetched[i].feed.title}
              </button>
    
              <div id= "collapse${i+1}" class="accordion-collapse collapse show">
              <div class="accordion-body" id="body${i+1}">
         
              </div>
           </div>
                    `
             }
  
           else{ 
                accordianDiv.innerHTML =`
    
            <button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapse${i+1}">
             ${datafetched[i].feed.title}
           </button>
  
           <div id="collapse${i+1}" class="accordion-collapse collapse">
             <div class="accordion-body" id="body${i+1}">
       
            </div>
          </div>
                `
             }
  
            get.appendChild(accordianDiv)
  
    /** Carousel */       
            let carousel = document.getElementById(`body${i+1}`)
            carousel.innerHTML =`
            <div id="carouselControl${i+1}" class="carousel slide" data-bs-ride="carousel">
            <div id ="Images${i+1}">
                 
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselControl${i+1}" data-bs-slide="prev">
              <div class="carousel-bttn">  
               <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
              </div>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselControl${i+1}" data-bs-slide="next">
              <div class="carousel-bttn">   
               <span class="carousel-control-next-icon" aria-hidden="true"></span>
               <span class="visually-hidden">Next</span>
               </div>
            </button>
          </div>
         `
  
  /*Display carasoul image with 3 card at a time */  
          let addImg = document.getElementById(`Images${i+1}`)
          let insert = document.createElement("div")
          insert.className = "carousel-inner"
           for(let j = 0 ; j < 10; j++)
       {
         
           let fetchedDate = datafetched[i].items[j].pubDate
           let date = new Date(fetchedDate);
           let imageDiv = document.createElement("div")
           
           if(j===0)
            {
             imageDiv.className = "carousel-item active"
             imageDiv.innerHTML = `
             <div class="container">
               <div class="row">
                 
               <div class="col-6 col-md-4">
                 <a href="${datafetched[i].items[j].link}">
                 <img class="d-block w-100 activity-img" src="${datafetched[i].items[j].enclosure.link}"></a>
                 <div class="container d-flex flex-column flex-wrap mt-3">
                  <h5>${datafetched[i].items[j].title}</h5>
                  <p class="pubDate">${datafetched[i].items[j].author}-${date.toLocaleDateString("en-IN")}</p>
                  <hr>
                  <p>${datafetched[i].items[j].description}</p>
                 </div> 
              </div>
            
              <div class="col-6 col-md-4">
                 <a href="${datafetched[i].items[j+1].link}">
                 <img class="d-block w-100 activity-img" src="${datafetched[i].items[j+1].enclosure.link}"></a>
                 <div class="container d-flex flex-column flex-wrap mt-3">
                  <h5>${datafetched[i].items[j+1].title}</h5>
                  <p class="pubDate">${datafetched[i].items[j+1].author}-${date.toLocaleDateString("en-IN")}</p>
                  <hr>
                  <p>${datafetched[i].items[j+1].description}</p>
                 </div> 
               </div>
                 
            <div class="col-6 col-md-4">
               <a href="${datafetched[i].items[j+2].link}">
               <img class="d-block w-100 activity-img" src="${datafetched[i].items[j+2].enclosure.link}"></a>
               <div class="container d-flex flex-column flex-wrap mt-3">
                <h5>${datafetched[i].items[j+2].title}</h5>
                <p class="pubDate">${datafetched[i].items[j+2].author}-${date.toLocaleDateString("en-IN")}</p>
                <hr>
                <p>${datafetched[i].items[j+2].description}</p>
               </div> 
            </div>
               
            </div>
        </div>
           
             `
             }
  
       else if( j > 2 && j < 4) 
         {
           
           imageDiv.className = "carousel-item"
             imageDiv.innerHTML = `
             <div class="container">
             <div class="row">
               
             <div class="col-6 col-md-4">
               <a href="${datafetched[i].items[j].link}">
               <img class="d-block w-100 activity-img" src="${datafetched[i].items[j].enclosure.link}"></a>
               <div class="container d-flex flex-column flex-wrap mt-3">
                <h5>${datafetched[i].items[j].title}</h5>
                <p class="pubDate">${datafetched[i].items[j].author}-${date.toLocaleDateString("en-IN")}</p>
                <hr>
                <p>${datafetched[i].items[j].description}</p>
               </div> 
            </div>
            
            <div class="col-6 col-md-4">
              <a href="${datafetched[i].items[j+1].link}">
               <img class="d-block w-100 activity-img" src="${datafetched[i].items[j+1].enclosure.link}"></a>
               <div class="container d-flex flex-column flex-wrap mt-3">
                <h5>${datafetched[i].items[j+1].title}</h5>
                <p class="pubDate">${datafetched[i].items[j+1].author}-${date.toLocaleDateString("en-IN")}</p>
                <hr>
                <p>${datafetched[i].items[j+1].description}</p>
               </div> 
            </div>
  
         <div class="col-6 col-md-4">
               <a href="${datafetched[i].items[j+2].link}">
               <img class="d-block w-100 activity-img" src="${datafetched[i].items[j+2].enclosure.link}"></a>
               <div class="container d-flex flex-column flex-wrap mt-3">
                <h5>${datafetched[i].items[j+2].title}</h5>
                <p class="pubDate">${datafetched[i].items[j+2].author}-${date.toLocaleDateString("en-IN")}</p>
                <hr>
                <p>${datafetched[i].items[j+2].description}</p>
               </div> 
         </div>
  
          </div>
      </div> 
           `
  
             } 
            else if(j > 5 && j < 7){
              imageDiv.className = "carousel-item"
              imageDiv.innerHTML = `
              <div class="container">
              <div class="row">
                 
              <div class="col-6 col-md-4">
                <a href="${datafetched[i].items[j].link}">
                <img class="d-block w-100 activity-img" src="${datafetched[i].items[j].enclosure.link}"></a>
                <div class="container d-flex flex-column flex-wrap mt-3">
                 <h5>${datafetched[i].items[j].title}</h5>
                 <p class="pubDate">${datafetched[i].items[j].author}-${date.toLocaleDateString("en-IN")}</p>
                 <p>${datafetched[i].items[j].description}</p>
                </div> 
             </div>
             
             <div class="col-6 col-md-4">
               <a href="${datafetched[i].items[j+1].link}">
                <img class="d-block w-100 activity-img" src="${datafetched[i].items[j+1].enclosure.link}"></a>
                <div class="container d-flex flex-column flex-wrap mt-3">
                 <h5>${datafetched[i].items[j+1].title}</h5>
                 <p class="pubDate">${datafetched[i].items[j+1].author}-${date.toLocaleDateString("en-IN")}</p>
                 <p>${datafetched[i].items[j+1].description}</p>
                </div> 
             </div>
   
          <div class="col-6 col-md-4">
                <a href="${datafetched[i].items[j+2].link}">
                <img class="d-block w-100 activity-img" src="${datafetched[i].items[j+2].enclosure.link}"></a>
                <div class="container d-flex flex-column flex-wrap mt-3">
                 <h5>${datafetched[i].items[j+2].title}</h5>
                 <p class="pubDate">${datafetched[i].items[j+2].author}-${date.toLocaleDateString("en-IN")}</p>
                 <p>${datafetched[i].items[j+2].description}</p>
                </div> 
          </div>
   
           </div>
       </div> 
            `
             
             }
             insert.append(imageDiv)
         }
  
         addImg.append(insert)
      
  
    }
  
  }
  
  
  /**  Second Carousel Display    */
  
  function addnextTODOM(datafetched)
  {
  
  /**Accordion */  
      let get = document.getElementById("addAccordion2")
      get.innerHTML =`
      <div class="accordion" id="accordionInsert2">
  
       </div>`
        for(let i = 0; i < datafetched.length; i++)
        { 
  
          let accordianDiv = document.createElement("div")
          accordianDiv.className ="accordion-item"
          accordianDiv.id = "item-"+`${i+1}`
  
       if(i===0)
       {
             accordianDiv.innerHTML =`
  
             <button class="accordion-button" data-bs-toggle="collapse" data-bs-target="#coll${i+1}">
                 ${datafetched[i].feed.title}
             </button>
  
            <div id= "coll${i+1}" class="accordion-collapse collapse show">
               <div class="accordion-body" id="body-${i+1}">
  
               </div>
           </div>
           `
         }
  
      else{ 
             accordianDiv.innerHTML =`
  
                <button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#coll${i+1}">
                     ${datafetched[i].feed.title}
                </button>
  
               <div id="coll${i+1}" class="accordion-collapse collapse">
                 <div class="accordion-body" id="body-${i+1}">
  
                  </div>
              </div>
                    `
            }
  
              get.appendChild(accordianDiv)
  
  
    /** Carousel */       
            let carousel = document.getElementById(`body-${i+1}`)
            carousel.innerHTML =`
            <div id="carouselControl-${i+1}" class="carousel slide" data-bs-ride="carousel">
            <div id ="Images-${i+1}">
                 
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselControl-${i+1}" data-bs-slide="prev">
              <div class="carousel-bttn">  
               <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
              </div>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselControl-${i+1}" data-bs-slide="next">
              <div class="carousel-bttn">   
               <span class="carousel-control-next-icon" aria-hidden="true"></span>
               <span class="visually-hidden">Next</span>
               </div>
            </button>
          </div>
         `
  
  /*Display carasoul image with 1 card at a time */
            
  
        let getCarousel =  document.getElementById(`Images-${i+1}`)
         let insertCarousel = document.createElement("div")
          insertCarousel.className = "carousel-inner"
     
           
       for(let k = 0 ; k < 10; k++)
       {
        let fetchedDate = datafetched[i].items[k].pubDate
        let date = new Date(fetchedDate);
        let imgDiv = document.createElement("div")
        
        if(k===0)
         {
          imgDiv.className = "carousel-item active"
          imgDiv.innerHTML = `
          <a href="${datafetched[i].items[k].link}">
          <img class="d-block w-100 activity-img" src="${datafetched[i].items[k].enclosure.link}"></a>
          <div class="container d-flex flex-column flex-wrap mt-3">
           <h5>${datafetched[i].items[k].title}</h5>
           <p class="pubDate">${datafetched[i].items[k].author}-${date.toLocaleDateString("en-IN")}</p>
           <hr>
           <p>${datafetched[i].items[k].description}</p>
          </div> 
        `
        
        }
        
        else{
          imgDiv.className = "carousel-item"
          imgDiv.innerHTML = `
          <a href="${datafetched[i].items[k].link}">
          <img class="d-block w-100 activity-img" src="${datafetched[i].items[k].enclosure.link}"></a>
  <div class="container d-flex flex-column flex-wrap mt-3">
           <h5>${datafetched[i].items[k].title}</h5>
           <p class="pubDate">${datafetched[i].items[k].author}-${date.toLocaleDateString("en-IN")}</p>
           <hr>
           <p>${datafetched[i].items[k].description}</p>
          </div> 
        `
        }
           
        insertCarousel.append(imgDiv)
      }
  
      getCarousel.append(insertCarousel)
  
      /** */      
    
  
    }
  }