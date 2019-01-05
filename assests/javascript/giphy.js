$(document).ready(function () {
    //array to hold initial buttons
    let gameArray = ["God of War", "League of Legends", "Pokemon", "Persona", "Red Dead Redemption", "Detroit Become Human", "Final Fantasy", "Kingdom Hearts"]
    // function to create buttons based on array
    let buttonMaker = function () {
        for (j = 0; j < gameArray.length; j++) {
            //actual button creation with added bootstrap features and a class that differentiates each button
            $("#game-buttons").append(`<button class="btn btn-secondary mr-1 mb-2" data-button="${gameArray[j]}">${gameArray[j]}</button>`)

        }
    }
    //calling the button-making fucntion
    buttonMaker();
    //The logic behind the button whenever it's clicked
    function buttonLogic() {
        //when a button with the secondary class is clicked ajax is initialized
        $(".btn-secondary").on("click", function () {
            $("#giphydiv").empty()
            let button = $(this).attr("data-button")
            let apiKey = "dc6zaTOxFJmzC&limit=15"
            let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + button
            $.ajax({
                    url: queryURL,
                    method: "GET"
                })
                //if the call for ajax is true then
                .then(function (response) {
                    let gifs = response.data;
                    for (i = 0; i < 14; i++) {
                        //a few variables to call certain images within the called ajax
                        let imageUrl = response.data[i].images.original.url
                        let imageStill = response.data[i].images.fixed_height_still.url
                        let rating = response.data[i].rating
                        //creating an image
                        let Image = $("<img>");
                        //appending attributes to the images to allow a seperation of still and animated images
                        Image.attr("src", imageUrl);
                        Image.addClass("gamegiphy");
                        Image.attr("data-state", "still");
                        Image.attr("data-still", imageStill);
                        Image.attr("data-animate", imageUrl);
                        //prepending a rating and a download button
                        $("#giphydiv").prepend(Image, `<p> Rating: ${rating.toUpperCase()}</p>`)
                        $("#giphydiv").prepend(`<button class="btn btn-warning mr-3"><a download href="${imageUrl}" download="game.gif"> Download </button>`)
                    };

                    console.log(response)
                })
        })
    }

    buttonLogic()
    $('.addShow').on('click', function () {
        let newShow = $('.newShowInput').val().trim();
        if ($('.newShowInput').val() == "") {
            return false;
        }
        $("#giphydiv").empty()
        $("#game-buttons").empty()
        gameArray.push(newShow);
        console.log($('.newShowInput').val());
        buttonMaker();
        buttonLogic();

    })
    $(document).on("click", ".gamegiphy", gifAnimation);;

    function gifAnimation() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }
})