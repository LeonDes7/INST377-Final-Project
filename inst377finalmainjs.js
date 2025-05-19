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

const user1IdList = [];
const user1StatusList = {};

const statusList = [];

window.addEventListener("DOMContentLoaded", () => {
  showAllRecommendations();
  compareList();
});

async function showAllRecommendations() {
  console.log("Running showAllRecommendations()");
  const container = document.getElementById("show-all-recommendations");
  container.replaceChildren(); // Clear old form

  // Helper to create left-aligned rows
  function createLeftAlignedRow(...elements) {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.justifyContent = "flex-start";
    row.style.alignItems = "center";
    row.style.gap = "10px";
    row.style.margin = "10px 0";
    elements.forEach((el) => row.appendChild(el));
    return row;
  }

  // Username Input
  const userName1 = document.createElement("input");
  userName1.type = "text";
  userName1.id = "first-username";
  userName1.placeholder = "Your AniList Username";

  const userRow = createLeftAlignedRow(userName1);

  // Genre & Tag Filters
  const genreFilters = document.createElement("input");
  genreFilters.type = "text";
  genreFilters.placeholder = "Genres";
  genreFilters.id = "genre-filters";

  const tagFilters = document.createElement("input");
  tagFilters.type = "text";
  tagFilters.placeholder = "Tags";
  tagFilters.id = "tag-filters";

  const filterRow = createLeftAlignedRow(genreFilters, tagFilters);

  // Status Checkboxes
  const statuses = [
    { id: "finished", label: "Finished" },
    { id: "releasing", label: "Releasing" },
    { id: "not_yet_released", label: "Not Yet Released" },
    { id: "cancelled", label: "Cancelled" },
    { id: "hiatus", label: "Hiatus" },
  ];

  const statusElements = statuses.map(({ id, label }) => {
    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "center";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = id;
    const checkboxLabel = document.createElement("label");
    checkboxLabel.htmlFor = id;
    checkboxLabel.textContent = label;
    wrapper.append(checkbox, checkboxLabel);
    return wrapper;
  });

  const statusRow = createLeftAlignedRow(...statusElements);

  // Submit Button
  const submitBtn = document.createElement("button");
  submitBtn.innerText = "Submit";
  submitBtn.onclick = showAllRecommendationsFunctionality;
  const buttonRow = createLeftAlignedRow(submitBtn);

  // Append all to container
  container.append(userRow, filterRow, statusRow, buttonRow);

  // Tagify setup
  const genreWhitelist = [
    "action",
    "adventure",
    "comedy",
    "drama",
    "ecchi",
    "fantasy",
    "horror",
    "mahou shoujo",
    "mecha",
    "music",
    "mystery",
    "psychological",
    "romance",
    "sci-fi",
    "slice of life",
    "sports",
    "supernatural",
    "thriller",
  ];

  new Tagify(genreFilters, {
    enforceWhitelist: true,
    whitelist: genreWhitelist,
    originalInputValueFormat: (genres) => genres.map((index) => index.value),
  });

  const tagWhitelist = [
    "4-koma",
    "acting",
    "adoption",
    "afterlife",
    "alchemy",
    "aliens",
    "alternate universe",
    "angels",
    "animals",
    "anti-hero",
    "assassins",
    "augmented reality",
    "aviation",
    "badminton",
    "band",
    "bar",
    "baseball",
    "basketball",
    "biographical",
    "bullying",
    "butler",
    "calligraphy",
    "camping",
    "card battle",
    "cars",
    "cheerleading",
    "circus",
    "college",
    "coming of age",
    "conspiracy",
    "cosplay",
    "crime",
    "crossdressing",
    "cyberpunk",
    "cyborg",
    "dancing",
    "detective",
    "dragons",
    "dystopian",
    "education",
    "elf",
    "family life",
    "fashion",
    "female harem",
    "firefighters",
    "fishing",
  ];

  new Tagify(tagFilters, {
    enforceWhitelist: true,
    whitelist: tagWhitelist,
    originalInputValueFormat: (tags) => tags.map((index) => index.value),
  });
}

function showAllRecommendationsFunctionality() {
  const genreFilters = document
    .getElementById("genre-filters")
    .value.split(",")
    .filter((g) => g.trim() !== "");
  const tagFilters = document
    .getElementById("tag-filters")
    .value.split(",")
    .filter((t) => t.trim() !== "");

  if (document.getElementById("finished").checked) statusList.push("FINISHED");
  if (document.getElementById("releasing").checked)
    statusList.push("RELEASING");
  if (document.getElementById("not_yet_released").checked)
    statusList.push("NOT_YET_RELEASED");
  if (document.getElementById("cancelled").checked)
    statusList.push("CANCELLED");
  if (document.getElementById("hiatus").checked) statusList.push("HIATUS");

  const userName1 = document.getElementById("first-username").value;

  if (!genreFilters.length && !tagFilters.length && !statusList.length) {
    Swal.fire({
      icon: "warning",
      title: "Missing Filters",
      text: "Only user name has been entered, please enter all categories.",
    });
    return;
  }

  if (
    (genreFilters.length > 0 && tagFilters.length === 0) ||
    (tagFilters.length > 0 && genreFilters.length === 0)
  ) {
    Swal.fire({
      icon: "warning",
      title: "Incomplete Filters",
      text: "Please enter both genres and tags, not just one.",
    });
    return;
  }

  console.log("THIS IS USERNAME1", userName1);
  userList1(userName1);
  anime(genreFilters, tagFilters, statusList);

  if (!genreFilters.length && !tagFilters.length && !statusList.length) {
    Swal.fire({
      icon: "warning",
      title: "No Filters Selected",
      text: "You’ve entered your username, but you must also select at least one genre, tag, or status to get recommendations.",
    });
    return;
  }

  if (!genreFilters.length && !tagFilters.length && statusList.length > 0) {
    Swal.fire({
      icon: "warning",
      title: "Missing Genre and Tag",
      text: "You selected status filters, but you must also select at least one genre and one tag.",
    });
    return;
  }
}

function compareList() {
  const container = document.getElementById("show-compare-list");
  container.replaceChildren(); // Clear previous content

  // Helper to create left-aligned rows
  function createLeftAlignedRow(...elements) {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.justifyContent = "flex-start"; // Align left
    row.style.alignItems = "center";
    row.style.gap = "10px";
    row.style.margin = "10px 0";
    elements.forEach((el) => row.appendChild(el));
    return row;
  }

  // Username Inputs
  const userName1 = document.createElement("input");
  userName1.type = "text";
  userName1.id = "first-username";
  userName1.placeholder = "Your AniList Username";

  const userName2 = document.createElement("input");
  userName2.type = "text";
  userName2.id = "second-username";
  userName2.placeholder = "Other User's Username";

  const userRow = createLeftAlignedRow(userName1, userName2);

  // Status Checkboxes
  const statuses = [
    { id: "current", label: "Current" },
    { id: "planning", label: "Planning" },
    { id: "completed", label: "Completed" },
    { id: "dropped", label: "Dropped" },
    { id: "paused", label: "Paused" },
    { id: "repeating", label: "Repeating" },
  ];

  const checkboxElements = statuses.map(({ id, label }) => {
    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "center";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = id;
    const checkboxLabel = document.createElement("label");
    checkboxLabel.htmlFor = id;
    checkboxLabel.textContent = label;
    wrapper.append(checkbox, checkboxLabel);
    return wrapper;
  });

  const checkboxRow = createLeftAlignedRow(...checkboxElements);

  // Submit Button
  const submitBtn = document.createElement("button");
  submitBtn.innerText = "Submit";
  submitBtn.onclick = compareListFunctionality;
  const buttonRow = createLeftAlignedRow(submitBtn);

  // Append all to container
  container.append(userRow, checkboxRow, buttonRow);
}

document.getElementById("compare-table").replaceChildren();

async function compareListFunctionality() {
  document.getElementById("compare-table").replaceChildren();

  const userName1 = document.getElementById("first-username").value;
  const userName2 = document.getElementById("second-username").value;

  const userStatusList = [];

  if (document.getElementById("current").checked)
    userStatusList.push("CURRENT");
  if (document.getElementById("planning").checked)
    userStatusList.push("PLANNING");
  if (document.getElementById("completed").checked)
    userStatusList.push("COMPLETED");
  if (document.getElementById("dropped").checked)
    userStatusList.push("DROPPED");
  if (document.getElementById("paused").checked) userStatusList.push("PAUSED");
  if (document.getElementById("repeating").checked)
    userStatusList.push("REPEATING");

  await userList1(userName1);
  userList2(userName2, userStatusList);
}

async function userList1(userName1) {
  console.log("this is userList1 receiving userName1", userName1);
  user1IdList.length = 0;
  Object.keys(user1StatusList).forEach((key) => delete user1StatusList[key]);
  var query = `
    query ($type: MediaType, $userName: String, $status_in: [MediaListStatus]) {
        MediaListCollection(type: $type, userName: $userName, status_in: $status_in) {
            lists {
                entries {
                    status
                    media {
                        id
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
    userName: userName1,
    type: "ANIME",
    status_in: ["CURRENT", "COMPLETED", "DROPPED", "PAUSED", "REPEATING"],
  };

  console.log("Sending query variables:", variables);

  var url = "https://graphql.anilist.co",
    options = {
      method: "POST", //send data to API
      headers: {
        "Content-Type": "application/json", //data being sent is JSON
        Accept: "application/json", //expect JSON response
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    };

  // Make the HTTP Api request
  await fetch(url, options)
    .then(handleResponse)
    .then(handleData)
    .catch(handleError); // <-- only run on failure

  function handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json);
    });
  }

  function handleData(userData1) {
    // your existing logic...
  }

  function handleError(error) {
    console.error(error); // helpful for debugging
    Swal.fire({
      icon: "error",
      title: "Compare Failed",
      text: "Could not fetch user 1 list.",
    });
  }

  function handleError(error) {
    Swal.fire({
      icon: "check",
      title: "Loading compare list",
      text: "Comparison has been found.",
    });
  }
}

userName2CompareList = [];
function userList2(userName2, userStatusList) {
  console.log(
    "this is userList2 receiving userName2 and userStatusList",
    userName2,
    userStatusList
  );
  var query = `
    query ($type: MediaType, $userName: String, $status_in: [MediaListStatus]) {
        MediaListCollection(type: $type, userName: $userName, status_in: $status_in) {
            lists {
                entries {
                    status
                    media {
                        id
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
    userName: userName2,
    type: "ANIME",
    status_in: userStatusList,
  };

  var url = "https://graphql.anilist.co",
    options = {
      method: "POST", //send data to API
      headers: {
        "Content-Type": "application/json", //data being sent is JSON
        Accept: "application/json", //expect JSON response
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    };

  // Make the HTTP Api request
  fetch(url, options).then(handleResponse).then(handleData).catch(handleError);

  function handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json);
    });
  }

  function handleData(userData2) {
    console.log("this is userData2", userData2);

    const compareTable = document.getElementById("compare-table");
    compareTable.replaceChildren(); // Clear the entire table

    // Create table head
    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");

    const animeHeader = document.createElement("th");
    animeHeader.textContent = "Anime";

    const user2Header = document.createElement("th");
    user2Header.textContent = `${
      userData2.data.MediaListCollection.lists[0]?.entries[0]?.media.title
        .english
        ? "User 2 Status"
        : "User 2"
    }`;

    const user1Header = document.createElement("th");
    user1Header.textContent = "User 1 Status";

    headRow.append(animeHeader, user2Header, user1Header);
    thead.append(headRow);
    compareTable.append(thead);

    // Create table body
    const tbody = document.createElement("tbody");

    userData2.data.MediaListCollection.lists.forEach((list) => {
      list.entries.forEach((entry) => {
        const tableRow = document.createElement("tr");

        const animeName = document.createElement("td");
        animeName.textContent =
          entry.media.title.english || entry.media.title.romaji;

        const animeStatus2 = document.createElement("td");
        animeStatus2.textContent = entry.status;

        const animeStatus1 = document.createElement("td");
        animeStatus1.textContent =
          user1StatusList[entry.media.id] ?? "haven't watched";

        tableRow.append(animeName, animeStatus2, animeStatus1);
        tbody.append(tableRow);
      });
    });

    compareTable.append(tbody);
  }

  function handleError(error) {
    Swal.fire({
      icon: "error",
      title: "Failed to Load Recommendations",
      text: "There was an issue fetching anime suggestions.",
    });
    console.error(error);
  }
}
const recommendationsList = [];
function anime(genreFilters, tagFilters, statusList) {
  console.log("Final statusList going to anime():", statusList);

  console.log(
    "this is anime receiving genreFilters, tagFilters, statusList",
    genreFilters,
    tagFilters,
    statusList
  );
  var query = `
query ($type: MediaType, $perPage: Int, $page: Int, $genre: [String], $tag: [String], $status: [MediaStatus]) {
  Page(perPage: $perPage, page: $page) {
    media(type: $type, genre_in: $genre, tag_in: $tag, status_in: $status) {
      id
      title {
        romaji
        english
      }
      status
      genres
      tags {
        name
      }
    }
  }
}
`;
  console.log("statusList being passed:", statusList);

  // Define our query variables and values that will be used in the query request
  var variables = {
    type: "ANIME",
    perPage: 50,
    page: 1,
    genre: genreFilters,
    tag: tagFilters,
    status: statusList,
  };

  console.log("Query variables being sent to AniList:", variables);

  if (statusList > 0) {
    variables.status = statusList;
  }

  // Define the config we'll need for our Api request
  var url = "https://graphql.anilist.co",
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    };

  // Make the HTTP Api request
  fetch(url, options).then(handleResponse).then(handleData).catch(handleError);

  function handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json);
    });
  }

  function handleData(animeData) {
    document.getElementById("all-recommendations-div").replaceChildren();

    animeData.data.Page.media.forEach((media1) => {
      console.log("this is media1", media1);
      if (!user1IdList.includes(media1.id)) {
        recommendationsList.push(media1);
        const recommendations = document.createElement("p");
        recommendations.innerHTML = media1.title.english || media1.title.romaji;

        const saveBtn = document.createElement("button");
        saveBtn.innerText = "Save to Favorites";
        saveBtn.onclick = () =>
          saveRecommendation(
            media1.title.english || media1.title.romaji,
            media1.id
          );

        const container = document.createElement("div");
        container.append(recommendations);
        container.append(saveBtn);

        document.getElementById("all-recommendations-div").append(container);
      }
    });
    console.log(animeData);
    console.log("this is recommendations", recommendationsList);
  }

  function handleError(error) {
    Swal.fire({
      icon: "error",
      title: "Failed to Load Recommendations",
      text: "There was an issue fetching anime suggestions.",
    });
    console.error(error);
  }
}

async function getSavedRecommendations() {
  const username = document.getElementById("first-username").value;

  const response = await fetch(
    `http://127.0.0.1:3001/api/favorites/${username}`
  );
  const data = await response.json();

  const container = document.getElementById("saved-recommendations");
  container.innerHTML = "";
  data.forEach((item) => {
    const entry = document.createElement("p");
    entry.innerText = `${item.anime_title} (ID: ${item.anime_id})`;
    container.append(entry);
  });
}

async function saveRecommendation(animeTitle, animeId) {
  const username = document.getElementById("first-username").value;

  const response = await fetch("http://127.0.0.1:3001/api/favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      anime_id: animeId,
      anime_title: animeTitle,
    }),
  });

  const result = await response.json();
  console.log("Saved to Supabase:", result);
}

window.addEventListener("DOMContentLoaded", () => {
  showAllRecommendations();
  compareList();
});
