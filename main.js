let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let tmp;

// get total
function getTotal()
{
    if(price.value !==''){
        let result = (+price.value + +taxes.value + +ads.value) 
        - +discount.value;
        total.innerHTML = result;
        total.style.background ="#040"
    }else{
        total.innerHTML = "";
        total.style.background ="red";
    }
}


// create product
// save at local storage
let prodata;
if (localStorage.product != null){
    prodata = JSON.parse(localStorage.product)
}else{
    prodata = [];
}


submit.onclick = function(){
     let newpro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
     }
     if(title.value != "" && price.value != "" && category.value != "" ){
        if(mood === "create"){

            if(newpro.count>1){
                for(let i = 0;i<newpro.count;i++){
                prodata.push(newpro);}
            }else{
                prodata.push(newpro);
            }

        }else{
            prodata[tmp] = newpro;
            mood == "create"
            submit.innerHTML= "<h1>Create</h1>"
            count.style.display = "block"

         }
         clearData()
        } 

    
     localStorage.setItem("product", JSON.stringify(prodata))
     console.log(prodata)
     
     showData()
    
}


// clear inputs
function clearData(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    count.value = "";
    category.value = "";
}
// read
function showData()
{
    getTotal()
    let table = "";
    for(i = 0;i<prodata.length;i++){
        table += `
        <tr>
                            <td>${i+1}</td>
                            <td>${prodata[i].title}</td>
                            <td>${prodata[i].price}</td>
                            <td>${prodata[i].taxes}</td>
                            <td>${prodata[i].ads}</td>
                            <td>${prodata[i].total}</td>
                            <td>${prodata[i].category}</td>
                            <td><button onclick="updateData(${i})" id="update">update</button></td>
                            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                            
                        </tr>
        `
        
    }
    document.getElementById("tbody").innerHTML = table;
    let btnDeleteAll = document.getElementById("deleteAll")
    if(prodata.length>0){
        btnDeleteAll.innerHTML = `<button onclick = "deleteAll()"> <h1>Delete All (${prodata.length})</h1></button>`
    }else{
        btnDeleteAll.innerHTML =``
    }
}
showData()

// count
// delete
function deleteData(i){
    prodata.splice(i,1);
    localStorage.product = JSON.stringify(prodata);
    showData()
}
function deleteAll(){
    localStorage.clear();
    prodata.splice(0);
    showData();
}
// update
function updateData(i){
    title.value = prodata[i].title;
    price.value = prodata[i].price;
    taxes.value = prodata[i].taxes;
    ads.value = prodata[i].ads;
    discount.value = prodata[i].discount;
    getTotal()
    category.value = prodata[i].category;
    count.style.display = "none"
    submit.innerHTML = "<h1>Update</h1>"
    mood = "update";
    tmp = i;
    



    scroll({top: 0 , behavior:"smooth"})
}
// search
let searchMood = "title";

function getSearchMood(id)
{
    let search = document.getElementById("search")
    if(id=="searchByTitle"){
        searchMood = "title";
        
    }else{
        searchMood = "category";

    };
    search.placeholder =`search by ${searchMood}`  ;
    search.focus()
    search.focus();
    search.value = "";
    showData();
}


function searchData(value) {
  value = (value || "").toString().trim().toLowerCase();
  if (value === "") {
    showData();
    return;
  }

  let table = "";
  for (let i = 0; i < prodata.length; i++) {
    const title = (prodata[i].title || "").toString().toLowerCase();
    const category = (prodata[i].category || "").toString().toLowerCase();

    if (
      (searchMood === "title" && title.includes(value)) ||
      (searchMood === "category" && category.includes(value))
    ) {
      table += `
        <tr>
          <td>${i + 1}</td>
          <td>${prodata[i].title}</td>
          <td>${prodata[i].price}</td>
          <td>${prodata[i].taxes}</td>
          <td>${prodata[i].ads}</td>
          <td>${prodata[i].total}</td>
          <td>${prodata[i].category}</td>
          <td><button onclick="updateData(${i})">update</button></td>
          <td><button onclick="deleteData(${i})">delete</button></td>
        </tr>
      `;
    }
  }

  document.getElementById("tbody").innerHTML = table;
}













    
// clean data1