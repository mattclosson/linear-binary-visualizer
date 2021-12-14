function randomArray(searchType) {
    let array = []
    for(let i = 0; i < 15; i++) {
        let randomInt = Math.floor(Math.random() * 100) + 1;
        array.push(randomInt)
    }
    array.sort(function(a, b){return a - b})
    array.map((arr, i) => {
        document.getElementById(searchType).children[i].innerHTML = arr
    })
    return array
}

let binaryArray = randomArray("main")
let linearArray = randomArray("linear_main")

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const binaryRun = async (sortedArray, key) => {
    let start = 0;
    let end = sortedArray.length - 1;
    sortedArray.map((arr, i) => document.getElementById('main').children[i].style.borderColor = "#b3b3b3")

    while(start <= end) {
        let middle = Math.floor((start + end) / 2);

        if (sortedArray[middle] === key) {
            // found the key
            document.getElementById('main').children[middle].style.borderColor = "#11b711"
            for(let i = 0; i < document.getElementsByClassName('block').length; i++) {
                document.getElementsByClassName('block')[i].style.boxShadow = "none"
            }
            document.getElementById('main').children[middle].style.boxShadow = "rgb(17 183 17 / 86%) 0px 0px 5px"
            return middle;
        } else if (sortedArray[middle] < key) {
            // continue searching to the right
            start = middle + 1;
            document.getElementById('main').children[middle].style.borderColor = "#f34242"
            for(let i = 0; i < document.getElementsByClassName('block').length; i++) {
                document.getElementsByClassName('block')[i].style.boxShadow = "none"
            }
            document.getElementById('main').children[middle].style.boxShadow = "rgb(243 66 66 / 35%) 0px 0px 5px"
        } else {
            // search searching to the left
            end = middle - 1;
            document.getElementById('main').children[middle].style.borderColor = "#f34242"
            for(let i = 0; i < document.getElementsByClassName('block').length; i++) {
                document.getElementsByClassName('block')[i].style.boxShadow = "none"
            }
            document.getElementById('main').children[middle].style.boxShadow = "rgb(243 66 66 / 35%) 0px 0px 5px"
        }
        await sleep(500)
    }

    return -1;
}

const linearRun = async (sortedArray, key) => {
    sortedArray.map((arr, i) => document.getElementById('linear_main').children[i].style.borderColor = "#b3b3b3")
    for(let i = 0; i < sortedArray.length; i++) {
        if(sortedArray[i] === key) {
            document.getElementById('linear_main').children[i].style.borderColor = "green"
            for(let i = 0; i < document.getElementsByClassName('block').length; i++) {
                document.getElementsByClassName('block')[i].style.boxShadow = "none"
            }
            document.getElementById('linear_main').children[i].style.boxShadow = "rgb(17 183 17 / 86%) 0px 0px 5px"
            return i
        } else {
            document.getElementById('linear_main').children[i].style.borderColor = "red"
            for(let i = 0; i < document.getElementsByClassName('block').length; i++) {
                document.getElementsByClassName('block')[i].style.boxShadow = "none"
            }
            document.getElementById('linear_main').children[i].style.boxShadow = "rgb(243 66 66 / 35%) 0px 0px 5px"
        }
        await sleep(500)
    }
}

document.getElementById('number').onsubmit = function(e) {
    e.preventDefault();
    const number = parseInt(e.target.elements.number.value)
    binaryRun(binaryArray, number)
}

document.getElementById('linear_number').onsubmit = function(e) {
    e.preventDefault();
    const number = parseInt(e.target.elements.linearnumber.value)
    linearRun(linearArray, number)
}