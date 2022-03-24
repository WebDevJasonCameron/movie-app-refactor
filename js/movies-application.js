(function() {
"use strict";

    // VARS, ARRAY, AND OBJ
    const url = 'https://spangled-checkered-opera.glitch.me/movies';
    let movieLib = [];

    /**
     * MOVIE CARD CONTAINER
     */
    function movieCard(movie){
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
                    <button id="mod-${movie.id}" class="edit-btn btn-warning w-100">Edit</button>
                    <button id="${movie.id}" value="${movie.id}" class="delete-btn btn-danger w-100 my-1">Delete</button>
                </div>
            </div> 
        `
    }
    function movieCards(movieList){
        let output = '<div class="container d-flex justify-content-center flex-wrap">';
        for (let i = 0; i < movieList.length; i++) {
            output += movieCard(movieList[i]);
        }
        return output + '</div>';
    }
    function loader(){
        return `
            <div id="loader" class="container d-flex justify-content-center ">
                <img src="../img/movie-loading.gif" alt="loading movies" width="900px">
            </div>

        
        `
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
                    <button id="edit-btn" class="btn btn-primary mx-3 my-3">MODIFY</button>
                    <button id="close-btn" class="btn btn-danger mx-3 my-3">CLOSE</button>
                </div>
            </div>
            
            <script>
                $('#close-btn').click(()=> {
                    $('#edit-modal').css('display', 'none')
                })
            </script>   
        `
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


    /**
     * FETCH ACTIONS
     */
    // CREATE MOVIE ACTION
    function addAction(m){
        const addOption = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(m),
        };
        fetch(url, addOption)
            .then(() =>console.log('Added Movie'))
            .catch((error) => console.log('Failed to Add Movie: ', error))
            .then(() =>{
                $('#movie-container').html(loader());
                setTimeout(() => {
                   getAction()
                }, 3000);

                console.log(m);
            })

    }
    // MODIFY MOVIE ACTION                      <-- prob delete this after it's placed in the RUD ACTION
    // function modAction(movie){
    //     const modOption = {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(movie),
    //     };
    //     fetch(url, modOption)
    //         .then(() =>console.log('Success in Modifying Movie'))
    //         .catch((error) => console.log('Failed to Modify Movie',

    // READ, update, DELETE ACTION
    function getAction() {
        let output = '';
        fetch(url)
            .then((response) => response.json())
            .then((movieList) => {                                      //  SETS CARDS
                output += movieCards(movieList);
                $('#movie-container').html(output)                      //   Add cards to the page
                $('.edit-btn').click((e)=>{                             //   Edit btn Listener Events
                    movieLib = movieList;                               //   Loads movie list for use later
                    let selectMovieToMod = e.target.id;
                    selectMovieToMod = selectMovieToMod.replace('mod-', '');
                    $('#edit-modal').css('display', 'block')
                        .html(movieModal(movieList[0]));
                    console.log(`${movieLib}`)
                    return movieLib;
                });
            })
            .then((x)=>{
                console.log(x)
            })
            .then(() => {
                let delOptions = {                                      //  DELETE
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                $('.delete-btn').click((e) => {                         //   DEL BTN
                    e.preventDefault();
                    const tarID = e.target.id;
                    fetch(`${url}/${tarID}`, delOptions)          //   DEL FETCH
                        .then(()=>{
                            $('#movie-container').html(loader());
                            setTimeout(() => {
                                getAction()
                            }, 2000);
                        })
                })
            })
            .catch((e) => console.log(e));

    }

    /**
     * EVENT LISTENERS
     */
    $('#add-btn').on('click', function (){
        const movie = buildMovie();
        addAction(movie)
    })


    /**
     * INITIALIZE
     */
    getAction();

})();


// ASYNC AWAIT