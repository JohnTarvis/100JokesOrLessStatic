const NUMBER_OF_JOKES = 100;

loadSpinner(false);

function loadSpinner(show){
    show ? $('#Loading-Spinner').stop(true, true).fadeIn(120) : $('#Loading-Spinner').stop(true, true).fadeOut(120);
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

function createJokeMeta(joke){
    const jokeMeta = document.createElement('div');
    jokeMeta.className = 'joke-meta';

    const categoryBadge = document.createElement('span');
    categoryBadge.className = 'joke-badge';
    categoryBadge.textContent = joke.category;
    jokeMeta.appendChild(categoryBadge);

    if(!joke.safe){
        const warningBadge = document.createElement('span');
        warningBadge.className = 'joke-flag';
        warningBadge.textContent = 'NSFW';
        jokeMeta.appendChild(warningBadge);
    }

    return jokeMeta;
}

function createJokeContent(joke){
    const jokeContent = document.createElement('div');
    jokeContent.className = 'joke-body';

    if(joke.type === 'twopart'){
        const setupText = document.createElement('p');
        setupText.className = 'joke-setup';
        setupText.textContent = joke.setup;

        const deliveryText = document.createElement('p');
        deliveryText.className = 'joke-delivery';
        deliveryText.textContent = joke.delivery;

        jokeContent.append(setupText, deliveryText);
        return jokeContent;
    }

    const jokeLine = document.createElement('p');
    jokeLine.className = 'joke-line';
    jokeLine.textContent = joke.joke;
    jokeContent.appendChild(jokeLine);
    return jokeContent;
}

function boxTheJokes(jokes){
    const jokeBox = document.createElement('div');
    jokeBox.className = 'joke-box';
    for (const joke of jokes){
        const jokeElement = document.createElement('article');
        jokeElement.className = getJokeClasses(joke);
        jokeElement.dataset.category = joke.category;
        jokeElement.append(createJokeMeta(joke), createJokeContent(joke));
        jokeBox.appendChild(jokeElement);
    }
    return jokeBox;
}

async function getJokes(number = 10){
    const jokes = [];
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

function getSelectedCategories(){
    return new Set(
        $('.category-selected')
            .not('#nsfw')
            .map(function(){
                return this.id;
            })
            .get()
    );
}

function syncVisibleJokes(){
    const selectedCategories = getSelectedCategories();
    const showUnsafe = $('#nsfw').hasClass('category-selected');

    $('.joke').each(function(){
        const matchesCategory = selectedCategories.has(this.dataset.category);
        const passesSafetyFilter = showUnsafe || !this.classList.contains('unsafe');
        $(this).toggle(matchesCategory && passesSafetyFilter);
    });
}

$('.category').on('click', function(){
    const isSelected = $(this)
        .toggleClass('category-selected')
        .toggleClass('category-unselected')
        .hasClass('category-selected');

    $(this).attr('aria-pressed', String(isSelected));
    syncVisibleJokes();
});

async function setup(){
    const jokes = await getJokes(NUMBER_OF_JOKES);
    const jokeBox = boxTheJokes(jokes);
    $('#jokes-mount').empty().append(jokeBox);
    syncVisibleJokes();
}

$(async function() {
    await setup();
});