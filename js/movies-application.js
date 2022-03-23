(function() {
"use strict";

    // VARS, ARRAY, AND OBJ
    const url = 'https://spangled-checkered-opera.glitch.me/movies';

    /**
     * MOVIE CARD CONTAINER
     */
    function movieCard (movie){
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
                    <button class="edit-btn btn-warning w-100">Edit</button>
                    <button id="${movie.id}" value="${movie.id}" class="delete-btn btn-danger w-100 my-1">Delete</button>
                </div>
            </div> 
        `
    }
    function movieCardsScripts(){
        return `
            <script>
                const innerURL ='https://spangled-checkered-opera.glitch.me/movies';
                
                // DELETE  
                let deleteBtnList = document.getElementsByClassName('delete-btn');
                
                function deleteBtnDist(){
                    for(let i = 0; i < deleteBtnList.length; i++) {
                      deleteBtnList[i].addEventListener('click', deleteMovie(i))
                    }
                }
                
                function deleteMovie(num){
                    fetch(innerURL+'/'+num, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                    .then((r)=> console.log('Success' + r))
                    .catch((e)=> console.log('Error' + e));
                }

                
                

        
        
            </script>
        
        
        
        `
    }
    function movieCards(movieList){
        let output = '';
        for (let i = 0; i < movieList.length; i++) {
            output += movieCard(movieList[i]);
        }
        output += movieCardsScripts();
        return output;
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
            poster: ''
        }
    }


    /**
     * FETCH ACTIONS
     */
    // ADD
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
            .then(function(){
                getAction()
                console.log(m);
            })

    }
    // DEL
    function delAction(num){
        const delOption = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        fetch(`${url}/${num}`, delOption)
            .then(() =>console.log('Success in Deletion'))
            .catch((error) => console.log('Failed to Delete', error))
            .then(function (){
                getAction();
            })
    }
    // MOD
    function modAction(movie){
        const modOption = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie),
        };
        fetch(url, modOption)
            .then(() =>console.log('Success in Modifying Movie'))
            .catch((error) => console.log('Failed to Modify Movie', error))
    }
    // GET
    function getAction() {
        let output = '';
        fetch(url)
            .then((response) => response.json())
            .then((movieList) => {
                output += movieCards(movieList);
                $('#movie-container').html(output);
            })
            .then((e) => {
                let delOptions = {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                $('.delete-btn').click((e) =>{
                    e.preventDefault();
                    const tarID = e.target.id;

                    fetch(`${url}/${tarID}`, delOptions)
                        .then(getAction)
                })
            })
            .catch((e) => console.log(e));

    }


    /**
     * TESTING PREACTION
     */
    // let mList = [];
    // function preAction() {
    //     let output = '';
    //     fetch(url).then((response) => response.json())
    //         .then((movieList) => {
    //             mList = movieList;
    //         })
    //         .catch((e) => console.log(e))
    // }
    // setTimeout(() => {
    //     let output = '';
    //     output += movieCards(mList);
    //     $('#movie-container').html(output);
    // }, 500);
    // preAction();


    /**
     * EVENT LISTENERS
     */
    $('#add-btn').on('click', function (){
        const movie = buildMovie();
        addAction(movie)
    })
    // $('.delete-btn').on('click', function (){
    //     let num = 7;
    //     console.log('click')
    //     delAction(num)
    // })


    /**
     * INITIALIZE
     */
    getAction();


})();


