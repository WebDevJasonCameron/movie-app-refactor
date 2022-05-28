// VARS, ARRAY, AND OBJ
const url = 'https://spangled-checkered-opera.glitch.me/movies';
let movieList = []

/**
 * MOVIE CARD CONTAINER
 */
// function movieCard(movie) {                                              //   <--ORIGINAL
//     return `
//         <div class="movie-card card border-0 bg-light shadow">
//             <div class="card-body m-3">
//                 <div class="card-img-top">
//                     <img src="${movie.poster}" alt="Movie Poster" class="img-thumbnail">
//                 </div>
//                 <ul class="list-group">
//                     <li class="list-group-item">Title: ${movie.title}</li>
//                     <li class="list-group-item">Rating: ${movie.rating}</li>
//                     <li class="list-group-item">Description: ${movie.plot}</li>
//                     <li class="list-group-item">Genre: ${movie.genre}</li>
//                     <li class="list-group-item">Year: ${movie.year}</li>
//                     <li class="list-group-item">Director: ${movie.director}</li>
//                     <li class="list-group-item">Actors/Actresses: ${movie.actors}</li>
//                     <li class="list-group-item">ID: ${movie.id}</li>
//                 </ul>
//             </div>
//             <div class="card-footer">
//                 <button
//                     id="mod-btn-${movie.id}"
//                     class="edit-btn btn-warning w-100"
//                     aria-label="Button to edit movie"
//                     onclick="getModal(${movie.id})">
//                         Edit
//                 </button>
//                 <button
//                     type="button"
//                     id="del-btn-${movie.id}"
//                     class="delete-btn btn-danger w-100 my-1"
//                     aria-label="Button to delete movie"
//                     onclick="deleteAction(${movie.id})">
//                         Delete
//                 </button>
//             </div>
//         </div>
//     `
// }
function movieCard(movie) {
    return `
        <div class="movie-card mx-3">
            <div class="flip-card" >
                <div class="flip-card-inner">
                    <div class="front-card">
                        <img src="${movie.poster}" alt="${movie.plot}">
                    </div>
                    <div class="back-card">
                        <section class="movie-stats">
                            <div class="movie-stat">Title: ${movie.title}</div> 
                            <div class="movie-stat">Rating: ${movie.rating}</div> 
                            <div class="movie-stat">Description: ${movie.plot}</div> 
                            <div class="movie-stat">Genre: ${movie.genre}</div>
                            <div class="movie-stat">Year: ${movie.year}</div>
                            <div class="movie-stat">Director: ${movie.director}</div>
                            <div class="movie-stat">Actors/Actresses: ${movie.actors}</div>
                            <div class="movie-stat">ID: ${movie.id}</div>
                        </section>
                    </div>
                </div>
            </div>
            <div class="movie-card-footer">
                <button 
                    id="mod-btn-${movie.id}" 
                    class="edit-btn btn-warning round-btn" 
                    aria-label="Button to edit movie"
                    onclick="getModal(${movie.id})"> 
                        <i class="fa-solid fa-pen fa-xlg btn-icon"></i>                         
                </button>
                <button 
                    type="button" 
                    id="del-btn-${movie.id}" 
                    class="delete-btn btn-danger my-1 round-btn"
                    aria-label="Button to delete movie"
                    onclick="deleteAction(${movie.id})">                           
                        <i class="fa-solid fa-trash fa-xlg btn-icon"></i>
                </button>
                <div id="star-rating" class="stars">Stars here</div>
            </div>
        </div>
    `
}
function movieCards(mList){
    return  '<div class="container d-flex justify-content-center flex-wrap">' +
                mList.map(movieCard).join('') +
            '</div>'
}


/**
 * MODAL
 */
function movieModal(movie){
    return `
        <div class="modal-content">
                <h3 class="text-center h3 mt-4">EDIT MOVIE</h3>
            <div id="mod-menu-container">
                <input 
                    id="mod-title-input" 
                    type="text" 
                    class="form-input mx-3 my-3" 
                    placeholder="${movie.title}">
                <input 
                    id="mod-year-input" 
                    type="text" 
                    class="form-input mx-3 my-3" 
                    placeholder="${movie.year}">
                <input 
                    id="mod-genre-input" 
                    type="text" 
                    class="form-input mx-3 my-3" 
                    placeholder="${movie.genre}">
                <input 
                    id="mod-actors-input" 
                    type="text" 
                    class="form-input mx-3 my-3" 
                    placeholder="${movie.actors}">
                <input 
                    id="mod-director-input" 
                    type="text" 
                    class="form-input mx-3 my-3" 
                    placeholder="${movie.director}">
                <input 
                    id="mod-plot-input" 
                    type="text" 
                    class="form-input mx-3 my-3" 
                    placeholder="${movie.plot}">
                <input 
                    id="mod-rating-input" 
                    type="text" 
                    class="form-input mx-3 my-3" 
                    placeholder="${movie.rating}">
                <input 
                    id="mod-poster-input" 
                    type="text" 
                    class="form-input mx-3 my-3" 
                    placeholder="Different Poster URL">
                <button 
                    id="edit-btn" 
                    class="btn btn-primary mx-3 my-3"
                    onclick="updateAction(${movie.id})">                 
                        MODIFY
                    </button>
                <button 
                    id="close-modal-btn" 
                    class="btn btn-danger mx-3 my-3"
                    onclick="closeModal()">                              
                        CLOSE
                    </button>
            </div>
        </div>
    `
}
function getModal(mID){
    $('#edit-modal').css('display', 'block')
        .html(movieModal(movieList[mID]))
}
function closeModal(){
    $('#edit-modal').css('display', 'none')
        .html(movieModal(''))
}


/**
 *  HELPER FUNCTIONS
 */
function buildMovie () {
    return {
        title: $('#title-input').val(),
        director: $('#director-input').val(),
        year: $('#year-input').val(),
        genre: $('#genre-input').val(),
        actors: $('#actors-input').val(),
        plot: $('#plot-input').val(),
        rating: $('#rating-input').val(),
        poster: checkURLInput($('#poster-input').val())
    }
}
function buildModMovie (movie) {
    return {
        title: checkModN($('#mod-title-input').val(), movie.title),
        director: checkModN($('#mod-director-input').val(), movie.director),
        year: checkModN($('#mod-year-input').val(), movie.year),
        genre: checkModN($('#mod-genre-input').val(), movie.genre),
        actors: checkModN($('#mod-actors-input').val(), movie.actors),
        plot: checkModN($('#mod-plot-input').val(), movie.plot),
        rating: checkModN($('#mod-rating-input').val(), movie.rating),
        poster: checkModN($('#mod-poster-input').val(), movie.poster)
    }
}

function loader(){
    return `
        <div id="loader" class="container d-flex justify-content-center ">
            <img src="../img/movie-loading.gif" alt="loading movies" width="900px">
        </div>
    `
}
function checkModN(modN, orN){
    if(modN === '' || modN === null || typeof modN === 'undefined'){
        return orN;
    } else {
        return modN;
    }
}

function checkURLInput(modN){                                                   // <--2
    if( modN === ''){
        return 'https://ih1.redbubble.net/image.3059832781.3922/poster,504x498,f8f8f8-pad,600x600,f8f8f8.jpg'
    } else {
        return modN;
    }
}


/**
 * GLITCH API: ACTIONS
 */
// CREATE
function createAction(m){
    const addOption = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(m),
    };
    fetch(url, addOption)
        .then(() => {
            movieList = []
            $('#movie-container').html(loader());
            readAction();

        })
        .then( (r)=> {
            console.log('added Movie' + r)

        })
        .catch((er) => {
            console.log('Error occurred in adding movie: ' + er)

        })
}
// READ
function readAction(){
    let output = '';
    fetch(url)
        .then((r) => r.json())
        .then((mList) => {
            output += movieCards(mList);
            $('#movie-container').html(output);
            movieList = mList;
            console.log(movieList);
        })
        .catch((er) => {
            console.log('You received an error during loading: ' + er)
        })
}
// UPDATE
function updateAction(mID){
    const modMovie = buildModMovie(movieList[mID]);
    console.log(modMovie);
    const modOptions = {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(modMovie)
    };
    fetch(url + '/' + mID, modOptions)
        .then(() => {
            movieList = [];
            $('#movie-container').html(loader());
            readAction();
        });
    closeModal();
}
// DELETE
function deleteAction(movieID) {
    const deleteOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch(url + '/' + movieID, deleteOptions)
        .then(readAction);
}

/**
 * OMDB API: ACTIONS
 */
// READ
function readOMBDAction(m){
    const omdbURL = `http://www.omdbapi.com/?i=tt3896198&apikey=5a824055&t=${m}&plot=full`;
    const readOptions = {
        method: 'GET',
    };

    fetch(omdbURL, readOptions)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            console.log("data.plot: " + data.Plot);
        })
}


/**
 * EVENT LISTENERS
 */
$('#add-movie-btn').on('click', function (){
    const movie = buildMovie();
    createAction(movie)
})
$('#omdb-search-btn').on('click', function (e){
    e.preventDefault();
    let userInput = $('#omdb-search-input').val()
    readOMBDAction(userInput)
})


/**
 * INITIALIZE
 */
readAction();




