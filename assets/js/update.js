let form = document.querySelector("#form");
let fileInp = document.querySelector("#file");
let imageInp = document.querySelector("#image");
let nameInp = document.querySelector("#name");
let dateInp = document.querySelector("#date");
let descriptionInp = document.querySelector("#description");
let url = `http://localhost:3000/data/`;
const id = new URLSearchParams(window.location.search).get("id");


axios.get(url+id)
.then(res =>{
    let data = res.data;
    imageInp.src=data.image, 
    nameInp.value = data.name,
    dateInp.value = data.date,
    descriptionInp.value = data.description
})

fileInp.addEventListener("input" , (e)=>{
    let selectedFile  = e.target.files[0];
    if(selectedFile){
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = (e) => {
            imageInp.src = reader.result
        }
    }
})



form.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputs = [nameInp, dateInp, descriptionInp];
  if (
    nameInp.value.trim() &&
    descriptionInp.value.trim() &&
    dateInp.value.trim()
  ) {
      let obj = {
        image: imageInp.src,
        name: nameInp.value,
        date: dateInp.value,
        description: descriptionInp.value,
      };
      axios.put(url+id, obj).then((res) => {
        window.location = `./index.html`;
      });
  }else {
    inputs.forEach((element) => {
      let display = element.value.trim() == "" ? "block" : "none";
      element.nextElementSibling.style.display = display;
    });
  }
});
