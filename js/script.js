const stopwatch = document.querySelector('.stopwatch__btn'),
    hoursTimer = document.body.querySelector('.stopwatch__hours'),
    minutesTimer = document.body.querySelector('.stopwatch__minutes'),
    secondsTimer = document.body.querySelector('.stopwatch__seconds'),
    stopWatchEL = document.querySelector('.tabsLink__span')

let sound = new Audio()
sound.src = 'zvuk.mp3'

hoursTimer.addEventListener("input", checkInput)
minutesTimer.addEventListener("input", checkInput)
secondsTimer.addEventListener("input", checkInput)

hoursTimer.addEventListener('focus', removeZeroOnFocus)
minutesTimer.addEventListener('focus', removeZeroOnFocus)
secondsTimer.addEventListener('focus', removeZeroOnFocus)

hoursTimer.addEventListener('blur', addZeroOnBlur)
minutesTimer.addEventListener('blur', addZeroOnBlur)
secondsTimer.addEventListener('blur', addZeroOnBlur)

function removeZeroOnFocus(e) {
    let element = e.target
    let text = element.textContent
    if (text == '0') {
        element.textContent = ""
    }
}

function addZeroOnBlur(e) {
    let element = e.target
    let text = element.textContent
    if (text == '') {
        element.textContent = '0'
    }
}

function checkInput(e) {
    let element = e.target
    let text = element.textContent
    let number = parseInt(text, 10)
    if (isNaN(number) || number < 0 || (element != hoursTimer && number > 59) || (element == hoursTimer && number > 24)) {
        element.textContent = ""
    } else {
        element.textContent = number.toString()
    }
}

stopwatch.addEventListener('click', function () {
    const btnSpan = stopwatch.querySelector('span')
    if (btnSpan.innerHTML == 'start') {
        if (hoursTimer.textContent != 0 || minutesTimer.textContent != 0 || secondsTimer.textContent != 0) {
            btnSpan.innerHTML = 'stop'
            btnSpan.style.color = 'white'
            this.style.background = 'red'
            let time = Number(hoursTimer.textContent) * 3600 + Number(minutesTimer.textContent) * 60 + Number(secondsTimer.textContent)
            timer = setTimeout( () => {
                timerTimer(btnSpan, time)
            }, 1000)
            stopWatchEL.classList.add('active')
        } else {
            alert('Введите данные для таймера')
        }
    } else if (btnSpan.innerHTML == 'stop') {
        btnSpan.innerHTML = 'clear'
        btnSpan.style.color = 'black'
        this.style.background = 'yellow'
    } else {
        hoursTimer.textContent = '0'
        minutesTimer.textContent = '0'
        secondsTimer.textContent = '0'
        btnSpan.innerHTML = 'start'
        btnSpan.style.color = 'black'
        this.style.background = 'white'
        clearTimeout(timer)
        stopWatchEL.classList.remove('active')
    }
})

async function playSound() {
    sound.play()
    await new Promise(resolve => setTimeout(resolve, 1000))
    alert('Твое время вышло. (Your soul is mine now)')
}

function timerTimer(el, time) {
    if (el.innerHTML == 'stop' && time != 0) {
        time--
        hoursTimer.textContent = Math.floor(time / 3600)
        minutesTimer.textContent = Math.floor(time % 3600 / 60)
        secondsTimer.textContent = Math.floor(time % 60)
        timer = setTimeout( () => {
            timerTimer(el, time)
        }, 1000)
    } else if (el.innerHTML == 'stop') {
        playSound()
        stopwatch.querySelector('span').click()
        stopwatch.querySelector('span').click()
    }
}


document.querySelectorAll('.tabsItem').forEach(function(element) {
    element.addEventListener('click', function() {
        document.querySelectorAll('.tabsItem').forEach(function(item) {
            item.classList.remove('active')
        })
        this.classList.add('active')
        const tabText = this.textContent.toLowerCase().trim()
        document.querySelector('.clock').classList.toggle('active', tabText == 'часы')
        document.querySelector('.stopwatch').classList.toggle('active', tabText == 'таймер')
    })
})

const hour = document.querySelector('.h'),
    min = document.querySelector('.m'),
    sec = document.querySelector('.s')
let f = true

function formatTime(time) {
    return time < 10 ? `0${time}` : time
}

function clock() {
    const time = new Date()
    const hours = time.getHours()
    const minutes = time.getMinutes() + (time.getHours() * 60)
    const seconds = time.getSeconds() + (time.getMinutes() * 60) + (time.getHours() * 3600)
    const transitionStyle = f ? '' : 'transition: 1s linear;'
    hour.style = `transform: rotate(${hours * 30}deg); ${transitionStyle}`
    min.style = `transform: rotate(${minutes * 6}deg); ${transitionStyle}`
    sec.style = `transform: rotate(${seconds * 6}deg); ${transitionStyle}`
    document.querySelector('.hours').textContent = formatTime(hours)
    document.querySelector('.minutes').textContent = formatTime(minutes % 60)
    f = false
    setTimeout(clock, 1000)
}

clock()


