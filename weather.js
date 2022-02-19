const form =document.querySelector(".top-banner form");
console.log(form);
const input =document.querySelector(".top-banner input");
const msg =document.querySelector(".top-banner .msg");
const list =document.querySelector(".ajax-section .cities");

localStorage.setItem("apikey", EncryptStringAES("55a655968325e071837fdf958d641cd1"));

form.addEventListener("submit", e =>{
    e.preventDefault();
    getWeatherDataFromApi();
});


const getWeatherDataFromApi =async()=>{
    let apikey =DecryptStringAES(localStorage.getItem("apikey"));
    let InValue =input.value;
    console.log(apikey)
    console.log(input.value);
    let weatherType ="metric";
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apikey}&units=${weatherType}`
    
   

 try {
    const response = await axios.get(url);
    console.log(response);
    const {main,name,sys,weather} =response.data;
    console.log(weather[0].icon);


    const cityListItems =list.querySelectorAll(".city");
    const cityListItemArray =Array.from(cityListItems);
    console.log(cityListItemArray)

    if(cityListItemArray.length> 0){
         const filteredArray =cityListItemArray.filter(card =>card.querySelector(".city-name span")
         .innerText == name);
        if(filteredArray.length >0){
            msg.innerText =`You already know the weather for ${filteredArray[0].querySelector(".city-name span").innerText},
            Please search for another city :)) `;
            form.reset();
            return;
        }
    } 

    const iconUrl =`https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`
    console.log(iconUrl);

    const createdCityCardLi =document.createElement("li");
    createdCityCardLi.classList.add("city");
    const createdCityCardLiInnerHTML =`
    <h2 class ="city-name" data-name = "${name},${sys.country}">
    <span>${name}</span>
    <sup>${sys.country}</sup>
    </h2>
    <div class ="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
    <figure>
    <img class="city-icon" src ="${iconUrl}">
    <figcaption>${weather[0].description}</figcaption>
    </figure>`;
    
    createdCityCardLi.innerHTML =createdCityCardLiInnerHTML
    list.appendChild(createdCityCardLi);

    msg.innerHTML="";
    // form.reset() ==> input.value ="";
    form.reset();
    input.focus();
  } catch (error) {
     msg.innerText = error;}
}
