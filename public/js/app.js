console.log('Client side javascript file is loaded!')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = "Javascript code"

weatherForm.addEventListener('submit', (e)=>{

    // Keep input form value 
    e.preventDefault()

    const location = search.value

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            // console.log(data.error)
            messageOne.textContent = data.error
        } else {
            messageTwo.textContent = "Weather forecast for " + data.location + " is " + data.forecast
            // console.log(data.location)
            // console.log(data.forecast)
        }
    })
})

})