const id = new URLSearchParams(window.location.search).get("id");
let url = `http://localhost:3000/data/`;
let form = document.querySelector("#form");
let fileInp = document.querySelector("#file");
let imageInp = document.querySelector("#image");
let nameInp = document.querySelector("#name");
let dateInp = document.querySelector("#date");
let descriptionInp = document.querySelector("#description");

axios.get(url + id).then((res) => {
  let data = res.data;
  (imageInp.src = data.image),
    (nameInp.value = data.name),
    (descriptionInp.value = data.description),
    (dateInp.value = data.date);
});

fileInp.addEventListener("input", (e) => {
  let selected = e.target.files[0];
  if (selected) {
    let reader = new FileReader();
    reader.readAsDataURL(selected);
    reader.onload = (e) => {
      imageInp.src = reader.result;
    };
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputs = [nameInp, dateInp, descriptionInp];
  if (
    nameInp.value.trim() &&
    dateInp.value.trim() &&
    descriptionInp.value.trim()
  ) {
    let obj = {
      image: imageInp.src,
      name: nameInp.value,
      description: descriptionInp.value,
      date: dateInp.value,
    };
    axios.put(url+id, obj).then((res) => {
      window.location = `./index.html`;
    });
  } else {
    inputs.forEach((element) => {
      let display = element.value.trim() == "" ? "block" : "none";
      element.nextElementSibling.style.display = display;
    });
  }
});
