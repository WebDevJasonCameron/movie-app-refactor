(function() {
"use strict";

    // VARS, ARRAY, AND OBJ
    const url = 'https://spangled-checkered-opera.glitch.me/movies';
    let idNum = ''

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
        fetch(url).then((response) => response.json())
            .then((r) => console.log(r))
            .catch((e) => console.log(e))
    }


    /**
     * EVENT LISTENERS
     */
    $('#add-btn').on('click', function (){
        const movie = buildMovie();
        addAction(movie)
    })
    $('#del-btn').on('click', function (){
        let num = 7;
        delAction(num)
    })


    /**
     * INITIALIZE
     */
    getAction();


})();


