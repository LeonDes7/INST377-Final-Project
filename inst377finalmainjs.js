// user need: find recommended anime
// option 1: find recommended anime based off one's list
// input genres and tags. from this, the program will find NEW anime with those genres and tags that are NOT in the user's anime list.
// therefore, the program will fetch anime from the user's list and use that anime to single out anime they have watched so as to not include it in recommendations (fetch 1)
// users can choose between new anime that are completed, ongoing, or any
// recommendations will generate based off user query (fetch 2)
// users can toggle between romaji and english
// option 2: find recommended anime from another person's list based off one's list
// input genres, tags, status, other username (fetch 3)
// this option exists to achieve the third frontend fetch requirement
// this fetch will be a similar structure as fetch 1, only the userName variable will be different
// users can input status_in and maybe scores. status_in would be easy to put in the query variables but scores cannot.

// therefore this is what's needed on the html
// input optional second username
// might want to move login page to this page
// genres filters - done
// tags filters - done
// status checkboxes - done
const inputGenre = document.getElementById("genre-filters");
    genreWhitelist = ["action", "adventure", "comedy", "drama", "ecchi", "fantasy", "horror", "mahou shoujo", "mecha", "music", "mystery", "psychological", "romance", "sci-fi", "slice of life",
        "sports", "supernatural", "thriller"];

    const tagify = new Tagify(inputGenre, {
        // Only allow tags from whitelist
        enforceWhitelist: true,
        // Use whitelist tags
        whitelist: genreWhitelist,
        // From genres, use map to go through every index and get the value of each index
        originalInputValueFormat: genres => genres.map(index => index.value)
});

// these aren't all the tags but i'm probably gonna leave some out
const inputTag = document.getElementById("tag-filters");
    genreWhitelist = ["4-koma", "achromatic", "achronological order", "acrobatics", "acting", "adoption", "advertisement", "afterlife",
        "age gap", "age regression", "agender", "agriculture", "airsoft", "alchemy", "aliens", "alternate universe", "american football",
        "amnesia", "anachronism", "ancient china", "angels", "animals", "anthology", "anthropomorphism", "anti-hero", "archery", "aromantic",
        "arranged marriage", "artificial intelligence", "asexual", "assassins", "astronomy", "athletics", "augmented reality", "autobiographical",
        "aviation", "badminton", "band", "bar", "baseball", "basketball", "battle royale", "biographical", "bisexual", "blackmail", "board game",
        "boarding school", "body horror", "body image", "body swapping", "bowling", "boxing", "boys' love", "bullying", "butler", "calligraphy",
        "camping", "cannibalism", "card battle", "cars", "centaur", "cgi", "cheerleading", "chibi", "chimera", "chuunibyou", "circus", "class struggle",
        "classic literature", "classical music", "clone", "coastal", "cohabitation", "college", "coming of age", "conspiracy", "cosmic horror",
        "cosplay", "cowboys", "creature training", "crime", "criminal organizion", "crossdressing", "crossover", "cute boys doing cute things",
        "cute girls doing cute things", "cyberpunk", "cyborg", "cycling", "dancing", "delinquents", "desert", "detective", "dinosaurs", "disability",
        "dissociative identities", "dragons", "drawing", "dunegon", "dystopian", "economics", "educational", "elderly protagonist", "elf", "ensemble cast",
        "environmental", "episodic", "fairy", "fairy tale", "fake relationship", "family life", "fashion", "female harem", "female protagonist", "fencing",
        "firefighters", "fishing", "fitness"];

    const tagify2 = new Tagify(inputTag, {
    // Only allow tags from whitelist
    enforceWhitelist: true,
    // Use whitelist tags
    whitelist: genreWhitelist,
    originalInputValueFormat: tags => tags.map(index => index.value)
});



function filterFunction() {
    const genreFilters = document.getElementById("genre-filters").value.split(',');
    console.log("this is genreFilters",genreFilters)
    const tagFilters = document.getElementById("tag-filters").value.split(',');
    console.log("this is genreFilters",tagFilters)

    const statusList = [];
    console.log("statusList before",statusList);
    if (document.getElementById("finished").checked == false) {
        console.log("finished is unchecked");
    }
    else {
        console.log("finished is checked");
        statusList.push("FINISHED");
    }

    if (document.getElementById("releasing").checked == false) {
        console.log("releasing is unchecked");
    }
    else {
        console.log("releasing is checked");
        statusList.push("RELEASING");
    }

    if (document.getElementById("not_yet_released").checked == false) {
        console.log("not yet released is unchecked");
    }
    else {
        console.log("not_yet_released is checked");
        statusList.push("NOT_YET_RELEASED");
    }

    if (document.getElementById("cancelled").checked == false) {
        console.log("cancelled is unchecked");
    }
    else {
        console.log("cancelled is checked");
        statusList.push("CANCELLED");
    }

    if (document.getElementById("hiatus").checked == false) {
        console.log("hiatus is unchecked");
    }
    else {
        console.log("hiatus is checked");
        statusList.push("HIATUS");
    }
    console.log("statusList after",statusList);



    // Query for anime list
    var query = `
        query ($type: MediaType, $userName: String, $status: [MediaListStatus]) {
        MediaListCollection(type: $type, userName: $userName, status_in: $status) {
        lists {
            entries {
            media {
                title {
                romaji
                english
                }
            }
            }
        }
        }
        }`;

    // Variables for query request
        var variables = {
	"userName": "magkuette",
	"type": "ANIME",
	"status_in": [
		"CURRENT",
		"COMPLETED",
		"DROPPED",
		"PAUSED",
		"REPEATING"
	]
};

        var url = 'https://graphql.anilist.co',
        options = {
            method: 'POST', //send data to API
            headers: {
                'Content-Type': 'application/json', //data being sent is JSON
                'Accept': 'application/json', //expect JSON response
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

        // Make the HTTP Api request
        fetch(url, options)
            .then(handleResponse)
            .then(handleData)
            .catch(handleError);

        function handleResponse(response) {
            return response.json().then(function (json) {
                return response.ok ? json : Promise.reject(json);
            });
        }

        function handleData(data) {
            console.log(data);
        }

        function handleError(error) {
            alert('Error, check console');
            console.error(error);
        }

// Query for getting any anime from the anilist database (this will based off a user's anime list later on)

    var query = `
        query ($type: MediaType, $perPage: Int, $page: Int, $genre: [String], $tag: [String], $status: [MediaStatus]) {
        Page(perPage: $perPage, page: $page) {
            media(type: $type, genre_in: $genre, tag_in: $tag, status_in: $status) {
                title {
                    romaji
                    english
                }
                genres
                tags {
                    name
                }
            }
        }
        }
        `;

    // Define our query variables and values that will be used in the query request
    var variables =
    {
        "type": "ANIME",
        "perPage": 50,
        "page": 1,
        "genre": genreFilters,
        "tag": tagFilters,
        "status": statusList
    };

    // Define the config we'll need for our Api request
    var url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };

    // Make the HTTP Api request
    fetch(url, options)
        .then(handleResponse)
        .then(handleData)
        .catch(handleError);

    function handleResponse(response) {
        return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
        });
        }

    function handleData(data) {
        console.log(data);
        }

    function handleError(error) {
        alert('Error, check console');
        console.error(error);
        }
// Compare with another username
        var query = `
        query ($type: MediaType, $userName: String, $status: [MediaListStatus]) {
        MediaListCollection(type: $type, userName: $userName, status_in: $status) {
        lists {
            entries {
            media {
                title {
                romaji
                english
                }
            }
            }
        }
        }
        }`;

    // Variables for query request
    // make it so that user can input status_in themself
        var variables = {
	"userName": "magkuette",
	"type": "ANIME",
	"status_in": [
		"CURRENT",
		"COMPLETED",
		"DROPPED",
		"PAUSED",
		"REPEATING"
	]
};

        var url = 'https://graphql.anilist.co',
        options = {
            method: 'POST', //send data to API
            headers: {
                'Content-Type': 'application/json', //data being sent is JSON
                'Accept': 'application/json', //expect JSON response
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

        // Make the HTTP Api request
        fetch(url, options)
            .then(handleResponse)
            .then(handleData)
            .catch(handleError);

        function handleResponse(response) {
            return response.json().then(function (json) {
                return response.ok ? json : Promise.reject(json);
            });
        }

        function handleData(data) {
            console.log(data);
        }

        function handleError(error) {
            alert('Error, check console');
            console.error(error);
        }

    }

// var query = `
// query ($type: MediaType!, $status: MediaListStatus!, $userName: String) {
//   MediaListCollection(type: $type, status: $status, userName: $userName) {
//     lists {
//       name
//       entries {
//         id
//         score
//         media {
//           id
//           title {
//             romaji
//           }
//           genres
//           tags {
//             name
//           }
//         }
//       }
//     }
//     user {
//         favourites {
//             anime {
//                 edges {
//                     node {
//                         title {
//                          romaji}}}}
//             }}
//   }
// }


// `;

// // Define our query variables and values that will be used in the query request
// var variables = {
//     userName: 'magkuette',
//     status: 'COMPLETED',
//     type: 'ANIME'
// };

// // Define the config we'll need for our Api request
// var url = 'https://graphql.anilist.co',
//     options = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//         },
//         body: JSON.stringify({
//             query: query,
//             variables: variables
//         })
//     };

// // Make the HTTP Api request
// fetch(url, options).then(handleResponse)
//     .then(handleData)
//     .catch(handleError);

// function handleResponse(response) {
//     return response.json().then(function (json) {
//         return response.ok ? json : Promise.reject(json);
//     });
// }

// function handleData(data) {
//     console.log(data);
// }

// function handleError(error) {
//     alert('Error, check console');
//     console.error(error);
// }


// function testFunction() {
//     // document.getElementById("test").innerHTML = document.getElementById("username").value;
//     console.log(document.getElementById("username").value);
//     document.getElementById("test").innerHTML="hiii";
// }
// testFunction();

// Here we define our query as a multi-line string, we did it
// Storing it in a separate .graphql/.gql file is also possible

