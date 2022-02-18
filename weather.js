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
    console.log(apikey)
    console.log(input.value);
    let weatherType ="metric";
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apikey}`

    const response = await axios.get(url);
    console.log(response);
    const { main,name,sys,weather} =response.data;

}