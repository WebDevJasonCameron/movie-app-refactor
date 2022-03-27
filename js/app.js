// VARS, ARRAY, AND OBJ
const url = 'https://spangled-checkered-opera.glitch.me/movies';

/**
 * MOVIE CARD CONTAINER
 */
const movieCard = (movie) => {
    return `
         <div class="movie-card card border-0 bg-light shadow">
            <div class="card-body m-3">
                <div class="card-img-top">
                    <img src="${movie.poster}" alt="Movie Poster" class="img-thumbnail">
                </div>
                <ul class="list-group">
                    <li class="list-group-item">Title: ${movie.title}</li> 
                    <li class="list-group-item">Rating: ${movie.rating}</li> 
                    <li class="list-group-item">Description: ${movie.plot}</li> 
                    <li class="list-group-item">Genre: ${movie.genre}</li>
                    <li class="list-group-item">Year: ${movie.year}</li>
                    <li class="list-group-item">Director: ${movie.director}</li>
                    <li class="list-group-item">Actors/Actresses: ${movie.actors}</li>
                    <li class="list-group-item">ID: ${movie.id}</li>
                </ul>
            </div>
            <div class="card-footer">
                <button 
                    id="mod-btn-${movie.id}" 
                    class="edit-btn btn-warning w-100" 
                    onclick="getModal()">                           <!--Function HERE-->
                        Edit
                </button>
                <button 
                    type="button" 
                    id="del-btn-${movie.id}" 
                    class="delete-btn btn-danger w-100 my-1"
                    onclick="deleteAction(${movie.id})">                           <!--Function HERE-->
                        Delete
                </button>
            </div>
        </div>
    `
}
function movieCards(mList){
    return  '<div class="container d-flex justify-content-center flex-wrap">' +
                mList.map(movieCard) +
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
                    onclick="edit-movie(arrayVarHere[withNum])">            <!--Function HERE-->
                        MODIFY
                    </button>
                <button 
                    id="close-modal-btn" 
                    class="btn btn-danger mx-3 my-3"
                    onclick="closeModal()">                                 <!--Function HERE-->
                        CLOSE
                    </button>
            </div>
        </div>
    `
}
function closeModal(){
    $('#close-modal-btn').click(()=> {
        $('#edit-modal').css('display', 'none')
    })
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
        poster: $('#poster-input').val()
    }
}
function loader(){
    return `
        <div id="loader" class="container d-flex justify-content-center ">
            <img src="../img/movie-loading.gif" alt="loading movies" width="900px">
        </div>
    `
}


/**
 * ACTIONS
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
            console.log("loading")
            output += movieCards(mList);
            $('#movie-container').html(output);

        })
        .catch((er) => {
            console.log('You received an error during loading: ' + er)
        })
}

// UPDATE

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
 * EVENT LISTENERS
 */
$('#add-movie-btn').on('click', function (){
    const movie = buildMovie();
    createAction(movie)
})


/**
 * INITIALIZE
 */
readAction();

