const student_search = document.querySelector('#student_search'),
    dataWordset = document.querySelectorAll('.tools-list__item'),
    itemsList = document.querySelector('.results-data'),
    links = document.querySelector('a'),
    word = document.querySelector('.word'),
    form = document.querySelector('.student-workspace__search');

function translate(word) {
    fetch("https://google-translate1.p.rapidapi.com/language/translate/v2", {
        "method": "POST",
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "accept-encoding": "application/gzip",
            "x-rapidapi-host": "google-translate1.p.rapidapi.com",
            "x-rapidapi-key": "11663529e0mshbc282d1aba3fde5p14b85djsn921c4024477d"
        },
        "body": {
            "q": "Hello, world!",
            "target": "es",
            "source": "en"
        }
    })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.error(err);
        });
}

const wordsApi = (word, settings) => {
    fetch(`https://wordsapiv1.p.rapidapi.com/words/${word}/${settings}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
            "x-rapidapi-key": "89099092b7msh7487892c260f916p1d1cf2jsnb8013e7e7850"
        }
    })
        .then(response => {
            return response.json()
        })
        .then(data => {
            const {examples, synonyms, antonyms, definitions, similar} = data
            let setting = examples
            if (examples) {
                setting = examples
            }
            if (synonyms) {
                setting = synonyms
            }
            if (antonyms) {
                setting = antonyms
            }
            if (similar) {
                setting = similar
            }


            if (!definitions) {
                setting.map((item, index) => {
                    const newItem = `
                        <div class="results-data__item">
                                <span class="results-data__item_number">${index + 1}</span>
                                <div class="results-data__item_desc">
                                    ${item}
                                </div>
                                <div class="results-data__item_btn">
                                    <div class="results-data__item_btn__item"></div>
                                    <div class="results-data__item_btn__item"></div>
                                </div>
                            </div>
                    `
                    itemsList.innerHTML += newItem
                })
            }


            if (definitions) {
                definitions.map((item, index) => {
                    const newItem = `
                        <div class="results-data__item">
                                <span class="results-data__item_number">${index + 1}</span>
                                <div class="results-data__item_desc">
                                    ${item.definition}
                                </div>
                                <div class="results-data__item_btn">
                                    <div class="results-data__item_btn__item"></div>
                                    <div class="results-data__item_btn__item"></div>
                                </div>
                            </div>
                    `
                    itemsList.innerHTML += newItem
                })
            }

        })
        .catch(err => {
            console.error(err);
        });
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    itemsList.innerHTML = ''
    wordsApi(student_search.value, 'examples');
    translate(student_search.value)
})
links.addEventListener("click", (e) => {
    e.preventDefault()
})

dataWordset.forEach((item) => {
    item.addEventListener("click", () => {
        itemsList.innerHTML = ''
        console.log(item.getAttribute('data-Wordset'))
        wordsApi(student_search.value, item.getAttribute('data-Wordset'))
    })
})

student_search.addEventListener('input',()=>{
    word.value = student_search.value;
    addWord(word.value)
})
function addWord(word) {
    fetch('/addWord', {
        method: 'POST',
        body: JSON.stringify({
            'word': word
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            return response.json();
        })

        .catch(function () {
            console.log('error')
        })
}

