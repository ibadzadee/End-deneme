let table = document.querySelector(".table tbody");
let url = `http://localhost:3000/data/`;

axios.get(url).then((res) => {
  let data = res.data;
  data.forEach((element) => {
    table.innerHTML += `
    <tr>
    <td>${element.id}</td>
    <td>${element.name}</td>
    <td>${element.date}</td>
    <td>${element.description}</td>
    <td><button onclick ="deleteData(${element.id})">Delete</button></td>
    <td><button onclick ="updateData(${element.id})">Update</button></td>
</tr>
            `;
  });
});

function deleteData(id) {
  axios.delete(url + id).then((res) => {
    window.location.reload();
  });
}

let form = document.querySelector("#form");
let fileInp = document.querySelector("#file");
let nameInp = document.querySelector("#name");
let dateInp = document.querySelector("#date");
let descriptionInp = document.querySelector("#description");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputs = [fileInp, nameInp, dateInp, descriptionInp];
  if (
    nameInp.value.trim() &&
    descriptionInp.value.trim() &&
    dateInp.value.trim()
  ) {
    let src = fileInp.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(src);
    reader.onload = (e) => {
      let obj = {
        image: e.target.result,
        name: nameInp.value,
        date: dateInp.value,
        description: descriptionInp.value,
      };
      axios.post(url, obj).then((res) => {
        window.location = `./index.html`;
      });
    };
  }else {
    inputs.forEach((element) => {
      let display = element.value.trim() == "" ? "block" : "none";
      element.nextElementSibling.style.display = display;
    });
  }
});


function updateData(id){
    window.location = `./update.html?id=${id}`;
}