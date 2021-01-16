'use strict';

document.addEventListener('DOMContentLoaded', () =>{
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    const adv = document.querySelectorAll('.promo__adv img'),
        poster = document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre'),
        movieList = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'),
        getinput = addForm.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type="checkbox"]');
    
    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let newFilm = getinput.value;
        const favorite = checkbox.checked;

        if (newFilm) {

            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }

            if (favorite) {
                console.log('Add favorite film');
            }

            movieDB.movies.push(newFilm);
            sortArray(movieDB.movies);
    
            createMovieList(movieDB.movies, movieList);
        }

        event.target.reset();

    });

    const deleteAdv = (arg) => {
        arg.forEach(item => {
            item.remove();
        });
    };

    const makeChanges = (changeGenre, changeBackground) => {
        changeGenre.textContent = 'драма';
    
        changeBackground.style.backgroundImage = 'url(img/bg.jpg)';
    };
    
    function sortArray(arr) {
        arr.sort();
    }
        
    function createMovieList(films, parent) {
        parent.innerHTML = '';
        sortArray(films);
    
        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i+1}. ${film}
                    <div class="delete"></div>
                </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                createMovieList(films, parent);
            });
        });
    }
    
    deleteAdv(adv);
    makeChanges(genre, poster);
    createMovieList(movieDB.movies, movieList);
});
