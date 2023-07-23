const NUMBER_OF_JOKES = 100;

function loadSpinner(show){
    show ? $('#Loading-Spinner').show() : $('#Loading-Spinner').hide();
}

function boxTheJokes(jokes){
    let jokeBox = `<div class="joke-box">`;
    for (let joke of jokes){
        let className = 'joke';
        className += ` ${joke.category}`;
        if(!joke.safe){
            className += ' unsafe';
        }
        if(joke.type === 'twopart'){
            className += ' twopart';
        }
        jokeBox += `<div class="${className}"> ${joke.type === 'twopart'? joke.setup + " " + 
        joke.delivery : joke.joke} </div>`
    }
    jokeBox +=  '</div>';
    return jokeBox;
}

async function getJokes(number = 10){
    let jokes = [];
    loadSpinner(true);
    for(let count = 1; count * 10 < number; count++){
        const response = await axios.get('https://v2.jokeapi.dev/joke/Any?amount=10');
        jokes = [...jokes,...response.data.jokes];
    }
    const remain = number % 10;
    if(!!remain){
        const response = await axios.get(`https://v2.jokeapi.dev/joke/Any?amount=${remain}`);
        jokes = [...jokes,...response.data.jokes];
    }
    loadSpinner(false);
    return jokes;
}

$("#show-nsfw").change(function() {
    if(this.checked) {
        $(".unsafe").show();
    } else {
        $(".unsafe").hide();
    }
});

$(".category").change(function(){
    if(this.checked){
        $(`.${this.id}`).show();
    } else {
        $(`.${this.id}`).hide();
    }
    checkNSFW();
});

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