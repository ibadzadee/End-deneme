let menu = document.querySelector("#menu-icon");
function openMenu() {
  let respMenu = document.querySelector(".menu-list");
  respMenu.classList.toggle("respMenu");
}

let url = `http://localhost:3000/data/`;
const section = document.querySelector(".crud-center");
let copyArr = [];
let filterArr = [];
let searchInp = document.querySelector("#search");
let sort = document.querySelector("#sort");

async function getAll() {
  let res = await axios.get(url);
  let data = await res.data;
  copyArr = data;
  section.innerHTML = "";

  filterArr = filterArr.length || searchInp.value ? filterArr : data;

  filterArr.forEach((element) => {
    section.innerHTML += `
        <div class="cards" onclick = "details(${JSON.stringify(element)})">
        <div class="img">
          <img src="${element.image}" alt="" />
        </div>
        <p>${element.date}</p>
        <a href="">${element.name}</a>
        <p>
          ${element.description}
        </p>
        <i class="bi bi-arrow-right-short"></i>
      </div>

        `;
  });
}

getAll();

searchInp.addEventListener("input", (e) => {
  filterArr = copyArr;
  filterArr = filterArr.filter((element) => {
    return element.name.toLowerCase().includes(e.target.value.toLowerCase());
  });
  getAll();
});

sort.addEventListener("change" , (e)=>{
    if(e.target.value ==="asc"){
        filterArr.sort((a , b)=>a.name.localeCompare(b.name))
    }
    else if(e.target.value ==="asc"){
        filterArr.sort((a , b)=>b.name.localeCompare(a.name))
    }
    else{
        filterArr = []
    };
    getAll();
});


function details(id){
    
}