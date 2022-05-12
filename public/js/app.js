console.log('Client side javascript file is loaded!')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const imageLocation = document.querySelector('#image')
// messageOne.textContent = "Javascript code"

weatherForm.addEventListener('submit', (e)=>{

    // Keep input form value 
    e.preventDefault()

    const location = search.value

    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            // console.log(data.error)
            messageOne.textContent = data.error
        } else {
            messageTwo.textContent = "Weather forecast for " + data.location + " is " + data.forecast
            imageWeather.innerHTML = '<img src="' + data.image + '">'
            // console.log(data.location)
            // console.log(data.forecast)
        }
    })
})

})