const NUMBER_OF_JOKES = 100;

loadSpinner(false);

function loadSpinner(show){
    show ? $('#Loading-Spinner').show() : $('#Loading-Spinner').hide();
}

function getJokeClasses(joke){
    const classNames = ['joke', joke.category];
    if(!joke.safe){
        classNames.push('unsafe');
    }
    if(joke.type === 'twopart'){
        classNames.push('twopart');
    }
    return classNames.join(' ');
}

function getJokeText(joke){
    return joke.type === 'twopart' ? `${joke.setup} ${joke.delivery}` : joke.joke;
}

function boxTheJokes(jokes){
    const jokeBox = document.createElement('div');
    jokeBox.className = 'joke-box';
    for (const joke of jokes){
        const jokeElement = document.createElement('div');
        jokeElement.className = getJokeClasses(joke);
        jokeElement.textContent = getJokeText(joke);
        jokeBox.appendChild(jokeElement);
    }
    return jokeBox;
}

async function getJokes(number = 10){
    let jokes = [];
    loadSpinner(true);
    try {
        const fullBatches = Math.floor(number / 10);
        for(let count = 0; count < fullBatches; count++){
            const response = await axios.get('https://v2.jokeapi.dev/joke/Any?amount=10');
            jokes.push(...response.data.jokes);
        }
        const remain = number % 10;
        if(remain > 0){
            const response = await axios.get(`https://v2.jokeapi.dev/joke/Any?amount=${remain}`);
            jokes.push(...response.data.jokes);
        }
        return jokes;
    } finally {
        loadSpinner(false);
    }
}

$(".category").click(function(){
    $(this).toggleClass("category-selected");
    $(this).toggleClass("category-unselected");
    $(this).hasClass("category-selected") ? $(`.${this.id}`).show() : $(`.${this.id}`).hide();
    checkNSFW();
});

function checkNSFW(){
    $("#nsfw").hasClass("category-selected") ? $(".unsafe").show() : $(".unsafe").hide();
}

async function setup(){
    const jokes = await getJokes(NUMBER_OF_JOKES);
    const jokeBox = boxTheJokes(jokes);
    $("#main").append(jokeBox);
    checkNSFW();
}

$(async function() {
    await setup();

});