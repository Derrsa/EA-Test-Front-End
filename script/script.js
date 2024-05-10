// ===================TIMER====================
const endTime = new Date("2024-07-24 12:00:00").getTime();
let day_block = document.querySelector('.timer__day .day__number')
let hour_block = document.querySelector('.timer__hour .day__number')
let minute_block = document.querySelector('.timer__minute .day__number')
let second_block = document.querySelector('.timer__sec .day__number')



window.onload = function() {
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const remaining = endTime - now;

        const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
        const hours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
        const mins = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
        const secs = Math.floor((remaining % (60 * 1000)) / 1000);

        day_block.textContent = days < 10 ? `0${days}` : String(days)
        hour_block.textContent = hours < 10 ? `0${hours}` : String(hours)
        minute_block.textContent = mins < 10 ? `0${mins}` : String(mins)
        second_block.textContent = secs < 10 ? `0${secs}` : String(secs)




        if (remaining < 0) {
            clearInterval(timer);
            document.getElementById("demo").textContent = "Время истекло";
        }
    }, 1000);
}
// ============================VALIDATION=====================================
function validateEmail(email) {
    let re = /^(([^&lt;&gt;()\[\]\\.,;:\s@"]+(\.[^&lt;&gt;()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


const form = document.querySelector('.footer__form')
let email = document.querySelector('.form__input')
let formBtn = document.querySelector('.form__button')

function postData(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Ошибка:', error);
            throw error;
        });
}
const modal = document.getElementById('modal-success')
const modalFail =document.getElementById('modal-reject')
document.querySelector('.modal__close').addEventListener('click', ()=>{
    modal.close()
})
document.querySelector('.modal__x').addEventListener('click', ()=>{
    modal.close()
})
modal.addEventListener('click', el=>{
    const modal = el.currentTarget
    const isClickBackDrop = el.target === modal
    if(isClickBackDrop){
        modal.close()
    }
})

formBtn.addEventListener('click', (el) => {
    el.preventDefault()
    if(validateEmail(email.value)){
        email.classList.add('error')
    } else {
        email.classList.remove('error')
        const url = 'https://jsonplaceholder.typicode.com/posts';
        const data = {mail:email.value };
        postData(url, data)
            .then(response => {
                console.log('Успешный ответ:', response);
                modal.showModal()

            })
            .catch(error => {

                console.error('Ошибка:', error);
            });

        }

    })

// Меняем буквы в лентах при уменьшении размера экрана
function changeTimerBlockName() {
    if(document.querySelector('body').clientWidth < 1000){
        document.querySelectorAll('.timer__info').forEach(name =>{
            if(name.classList.contains('timer__day')){
                name.querySelector('.day__name').textContent = 'DD'
            } else if (name.classList.contains('timer__hour')) {
                name.querySelector('.day__name').textContent = 'HH'
            } else if (name.classList.contains('timer__minute')) {
                name.querySelector('.day__name').textContent = 'MM'
            } else if (name.classList.contains('timer__sec')) {
                name.querySelector('.day__name').textContent = 'SS'
            }
        })
    }
    if(document.querySelector('body').clientWidth > 1000){
        document.querySelectorAll('.timer__info').forEach(name =>{
            if(name.classList.contains('timer__day')){
                name.querySelector('.day__name').textContent = 'Days'
            } else if (name.classList.contains('timer__hour')) {
                name.querySelector('.day__name').textContent = 'Hours'
            } else if (name.classList.contains('timer__minute')) {
                name.querySelector('.day__name').textContent = 'Minutes'
            } else if (name.classList.contains('timer__sec')) {
                name.querySelector('.day__name').textContent = 'Seconds'
            }
        })
    }
}
changeTimerBlockName()
window.addEventListener('resize', () =>{
    changeTimerBlockName()
})



