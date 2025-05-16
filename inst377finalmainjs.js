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


// these aren't all the tags but i'm probably gonna leave some out


// If you click on all-recommendations button, showAllRecommendations function will be called
document.getElementById("all-recommendations").addEventListener("click", () => {
    console.log("clicked testing")
        showAllRecommendations();
    })

function showAllRecommendations() {
    const userName1 = document.createElement("input");
    userName1.type = "text";
    userName1.id = "first-username";

    const genreFilters = document.createElement("input");
    genreFilters.type = "text";
    genreFilters.placeholder = "Genres";
    genreFilters.id = "genre-filters";

    const tagFilters = document.createElement("input");
    tagFilters.type = "text";
    tagFilters.placeholder = "Tags";
    tagFilters.id = "tag-filters";

    const finished_label = document.createElement("label");
    finished_label.htmlFor = "finished";
    finished_label.innerHTML = "Finished";
    const finished = document.createElement("input");
    finished.type = "checkbox";
    finished.id = "finished";

    const releasing_label = document.createElement("label");
    releasing_label.htmlFor = "releasing";
    releasing_label.innerHTML = "Releasing";
    const releasing = document.createElement("input");
    releasing.type = "checkbox";
    releasing.id = "releasing";

    const not_yet_released_label = document.createElement("label");
    not_yet_released_label.htmlFor = "not_yet_released";
    not_yet_released_label.innerHTML = "Not yet released"
    const not_yet_released = document.createElement("input");
    not_yet_released.type = "checkbox";
    not_yet_released.id = "not_yet_released";

    const cancelled_label = document.createElement("label");
    cancelled_label.htmlFor = "cancelled";
    cancelled_label.innerHTML = "Cancelled";
    const cancelled = document.createElement("input");
    cancelled.type = "checkbox";
    cancelled.id = "cancelled";

    const hiatus_label = document.createElement("label");
    hiatus_label.htmlFor = "hiatus";
    hiatus_label.innerHTML = "Hiatus";
    const hiatus = document.createElement("input");
    hiatus.type = "checkbox";
    hiatus.id = "hiatus";

    const submit_for_all_recommendations = document.createElement("button");
    submit_for_all_recommendations.innerHTML = "Submit";
    submit_for_all_recommendations.onclick = filterFunction;
    
    document.getElementById("show-all-recommendations").append(userName1, genreFilters, tagFilters, finished, finished_label,
        releasing, releasing_label, not_yet_released, not_yet_released_label, cancelled, cancelled_label, hiatus, hiatus_label, submit_for_all_recommendations);

    const inputGenre = genreFilters;
        genreWhitelist = ["action", "adventure", "comedy", "drama", "ecchi", "fantasy", "horror", "mahou shoujo", "mecha", "music", "mystery", "psychological", "romance", "sci-fi", "slice of life",
            "sports", "supernatural", "thriller"];

        new Tagify(inputGenre, {
            // Only allow tags from whitelist
            enforceWhitelist: true,
            // Use whitelist tags
            whitelist: genreWhitelist,
            // From genres, use map to go through every index and get the value of each index
            originalInputValueFormat: genres => genres.map(index => index.value)
    });
    
    const inputTag = tagFilters;
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

    new Tagify(inputTag, {
    // Only allow tags from whitelist
    enforceWhitelist: true,
    // Use whitelist tags
    whitelist: genreWhitelist,
    originalInputValueFormat: tags => tags.map(index => index.value)
});
}

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

    const userName1 = document.getElementById("first-username").value;
    // const userName2 = document.getElementById("second-username").value;
    const userName2 = "username";

    console.log("THIS IS USERNAME1", userName1);
    console.log(userName2);

    userList1(userName1);
    anime(genreFilters, tagFilters, statusList);

    }

// If you click on compare-list button, compareList function will be called
document.getElementById("compare-list").addEventListener("click", () => {
    console.log("clicked testing")
        compareList();
    })

function compareList() {
    const userName1 = document.createElement("input");
    userName1.type = "text";
    userName1.id = "first-username";

    const userName2 = document.createElement("input");
    userName2.type = "text";
    userName2.id = "second-username";

    const current_label = document.createElement("label");
    current_label.htmlFor = "current";
    current_label.innerHTML = "Current";
    const current = document.createElement("input");
    current.type = "checkbox";
    current.id = "current";

    const planning_label = document.createElement("label");
    planning_label.htmlFor = "planning";
    planning_label.innerHTML = "Planning";
    const planning = document.createElement("input");
    planning.type = "checkbox";
    planning.id = "planning";

    const completed_label = document.createElement("label");
    completed_label.htmlFor = "completed";
    completed_label.innerHTML = "Completed";
    const completed = document.createElement("input");
    completed.type = "checkbox";
    completed.id = "completed";

    const dropped_label = document.createElement("label");
    dropped_label.htmlFor = "dropped";
    dropped_label.innerHTML = "Dropped";
    const dropped = document.createElement("input");
    dropped.type = "checkbox";
    dropped.id = "dropped";

    const paused_label = document.createElement("label");
    paused_label.htmlFor = "paused";
    paused_label.innerHTML = "Paused";
    const paused = document.createElement("input");
    paused.type = "checkbox";
    paused.id = "paused";

    const repeating_label = document.createElement("label");
    repeating_label.htmlFor = "repeating";
    repeating_label.innerHTML = "Repeating";
    const repeating = document.createElement("input");
    repeating.type = "checkbox";
    repeating.id = "repeating";

    const submit_for_compare_list = document.createElement("button");
    submit_for_compare_list.innerHTML = "Submit!!!!!";
    submit_for_compare_list.onclick = compareListFunctionality;

    document.getElementById("show-compare-list").append(userName1, userName2, current, current_label, planning, planning_label,
        completed, completed_label, dropped, dropped_label, paused, paused_label, repeating, repeating_label, submit_for_compare_list);
}

function compareListFunctionality() {
    const userName1 = document.getElementById("first-username").value;
    const userName2 = document.getElementById("second-username").value;

    const statusList = [];
    console.log("statusList before",statusList);
    if (document.getElementById("current").checked == false) {
        console.log("current is unchecked");
    }
    else {
        console.log("current is checked");
        statusList.push("CURRENT");
    }

    if (document.getElementById("planning").checked == false) {
        console.log("planning is unchecked");
    }
    else {
        console.log("planning is checked");
        statusList.push("PLANNING");
    }

    if (document.getElementById("completed").checked == false) {
        console.log("completed is unchecked");
    }
    else {
        console.log("completed is checked");
        statusList.push("COMPLETED");
    }

    if (document.getElementById("dropped").checked == false) {
        console.log("dropped is unchecked");
    }
    else {
        console.log("dropped is checked");
        statusList.push("DROPPED");
    }

    if (document.getElementById("paused").checked == false) {
        console.log("paused is unchecked");
    }
    else {
        console.log("paused is checked");
        statusList.push("PAUSED");
    }

    if (document.getElementById("repeating").checked == false) {
        console.log("repeating is unchecked");
    }
    else {
        console.log("repeating is checked");
        statusList.push("REPEATING");
    }
    userList1(userName1);
    userList2(userName2);
}

function userList1(userName1) {
    console.log("this is userList1 receiving userName1", userName1);
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
	"userName": userName1,
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

function userList2(userName2) {
    console.log("this is userList2 receiving userName2", userName2);
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
    "userName": userName2,
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

function anime(genreFilters, tagFilters, statusList) {
    console.log("this is anime receiving genreFilters, tagFilters, statusList", genreFilters, tagFilters, statusList);
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

}

