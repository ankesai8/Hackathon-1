//to create Search Box

let container=document.createElement('div');
container.setAttribute('class','boot');

let searchContainer=document.createElement('div');
searchContainer.setAttribute('class','search');
searchContainer.innerHTML=`
<input type="text" class="form-control" id="inputText" placeholder="Search Me as Cute,Marine,Roll ">
<button type="button" onclick="search()" class="btn btn-primary searchBtn">Search</button>`
container.append(searchContainer);

document.body.append(container);

//outer box of each image box
let outerContainer=document.createElement('div');
outerContainer.setAttribute('class','outer')
container.append(outerContainer);

//fetch ID value from cat api
async function displaydata(){
    try{
        const data=await fetch("https://cataas.com/api/cats");
        const result=await data.json();
        catData(result)
    }
    catch{
        console.log("Page Not found")
    }
}
//Creating div elements
async function catData(arr){
    for(var cat of arr){
        let catBox=document.createElement('div');
        catBox.setAttribute('class','catBox');
        let link="https://cataas.com/cat/"+cat.id;
        try{
            const catImage=await fetch(link);
            catBox.innerHTML=`
            <img  class="catimage" src="${catImage.url}" alt="I'm Lost" loading="lazy">
        `
        outerContainer.append(catBox)
        }
        catch{
            console.log("page not found")
        }
    }
}
displaydata();
//Pop up Box
let pop=document.createElement('div');
pop.setAttribute('class','pop');
pop.innerHTML=`
<div class="popTop">
    <button onclick="closeSearch()" class="closebtn" ><span class="material-icons-outlined">
    x
    </span></button>
    <div class="popOuter"><div>
</div>`
document.body.append(pop);

let popTopContainer=document.querySelector('.popTop');
let popContainer=document.querySelector('.popOuter');
//Fetching Images for Pop up using async
async function search(){
    popTopContainer.style.display="block";
    try{
        popContainer.innerHTML=``;
        let searchValue=document.querySelector('#inputText').value;
        const searchCat=await fetch("https://cataas.com/api/cats?tags="+searchValue);
        const searchResult=await searchCat.json();
        displaySearch(searchResult);
    }
    catch{
        console.log("error");
    }
}
//Creating image div for result images
async function displaySearch(array){
    try{
        for(var search of array){
            let resultBox=document.createElement('div');
            resultBox.setAttribute('class','catBox resultBox');
            const searchFetch=await fetch("https://cataas.com/cat/"+search.id);
            resultBox.innerHTML=`
            <img class="catimage" src="${searchFetch.url}" loading="lazy">`
            popContainer.append(resultBox);
        }

    }
    catch{
        console.log("displaying error")
    }
}
//function for closing popup
function closeSearch(){
    popTopContainer.style.display="none";
}
