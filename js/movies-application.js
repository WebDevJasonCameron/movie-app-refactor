"use strict";

// VARS, ARRAY, AND OBJ
const glitchMovies = 'https://future-cloudy-parsnip.glitch.me/movies';
const myMovieAPI = 'https://spangled-checkered-opera.glitch.me';


/**
 * FUNCTIONS
 */
// MOVIE
function getMovies() {
    return fetch(myMovieAPI).then((response) => response.json())
}
function simpleCard(movie){
    let output = `
            <div class="movie-card card">
                <div class="card-body m-3">
                    <div class="card-img-top">
                        <img src="${movie.poster}" alt="Movie Poster">
                    </div>
                    Title: ${movie.title} <br>
                    Rating: ${movie.rating} <br>
                    Description: ${movie.plot} <br>
                    Genre: ${movie.genre}<br>
                    Year: ${movie.year}<br>
                    Director: ${movie.director}<br>
                    Actors/Actresses: ${movie.actors}<br>
                    ID: ${movie.id}<br>
                </div>
                <div class="card-footer">
                    <button>Delete</button>
                    <button class="edit-btn">Edit</button>
                </div>
            </div>
            
            ${addJSButtons()}
    `
    // console.log(output);
    return output;
}

// MODAL
function addJSButtons(){
        return `
        <script>
            $('.edit-btn').click( () => {
                $('#edit-modal').css('display', 'block');
            })
            
            $('.close-btn').click( () => {
                $('#edit-modal').css('display', 'none');
                console.log('click')
            }) 
            
        </script>
    `
}



// FORM



/**
 * ACTIVATE
 */
getMovies().then( (movieList) => {
    let output = ''
    for (let i = 0; i < movieList.length; i++) {
        output += simpleCard(movieList[i]);
    }
    $('#movie-container').html(output);
})


