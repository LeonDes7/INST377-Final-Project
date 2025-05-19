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
  container.replaceChildren();

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

  const userName1 = document.createElement("input");
  userName1.type = "text";
  userName1.id = "first-username";
  userName1.placeholder = "Your AniList Username";

  const userRow = createLeftAlignedRow(userName1);

  const genreFilters = document.createElement("input");
  genreFilters.type = "text";
  genreFilters.placeholder = "Genres";
  genreFilters.id = "genre-filters";

  const tagFilters = document.createElement("input");
  tagFilters.type = "text";
  tagFilters.placeholder = "Tags";
  tagFilters.id = "tag-filters";

  const filterRow = createLeftAlignedRow(genreFilters, tagFilters);

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

  const submitBtn = document.createElement("button");
  submitBtn.innerText = "Submit";
  submitBtn.onclick = showAllRecommendationsFunctionality;
  const buttonRow = createLeftAlignedRow(submitBtn);

  container.append(userRow, filterRow, statusRow, buttonRow);

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
    "achromatic",
    "achronological order",
    "acrobatics",
    "acting",
    "adoption",
    "advertisement",
    "afterlife",
    "age gap",
    "age regression",
    "agender",
    "agriculture",
    "airsoft",
    "alchemy",
    "aliens",
    "alternate universe",
    "american football",
    "amnesia",
    "anachronism",
    "ancient china",
    "angels",
    "animals",
    "anthology",
    "anthropomorphism",
    "anti-hero",
    "archery",
    "aromantic",
    "arranged marriage",
    "artificial intelligence",
    "asexual",
    "assassins",
    "astronomy",
    "athletics",
    "augmented reality",
    "autobiographical",
    "aviation",
    "badminton",
    "band",
    "bar",
    "baseball",
    "basketball",
    "battle royale",
    "biographical",
    "bisexual",
    "blackmail",
    "board game",
    "boarding school",
    "body horror",
    "body image",
    "body swapping",
    "bowling",
    "boxing",
    "boys' love",
    "bullying",
    "butler",
    "calligraphy",
    "camping",
    "cannibalism",
    "card battle",
    "cars",
    "centaur",
    "cgi",
    "cheerleading",
    "chibi",
    "chimera",
    "chuunibyou",
    "circus",
    "class struggle",
    "classic literature",
    "classical music",
    "clone",
    "coastal",
    "cohabitation",
    "college",
    "coming of age",
    "conspiracy",
    "cosmic horror",
    "cosplay",
    "cowboys",
    "creature taming",
    "crime",
    "criminal organization",
    "crossdressing",
    "crossover",
    "cult",
    "cultivation",
    "curses",
    "cute boys doing cute things",
    "cute girls doing cute things",
    "cyberpunk",
    "cyborg",
    "cycling",
    "dancing",
    "death game",
    "delinquents",
    "demons",
    "denpa",
    "desert",
    "detective",
    "dinosaurs",
    "disability",
    "dissociative identities",
    "dragons",
    "drawing",
    "drugs",
    "dullahan",
    "dungeon",
    "dystopian",
    "e-sports",
    "eco-horror",
    "economics",
    "educational",
    "elderly protagonist",
    "elf",
    "ensemble cast",
    "environmental",
    "episodic",
    "ero guro",
    "espionage",
    "estranged family",
    "exorcism",
    "fairy",
    "fairy tale",
    "fake relationship",
    "family life",
    "fashion",
    "female harem",
    "female protagonist",
    "femboy",
    "fencing",
    "filmmaking",
    "firefighters",
    "fishing",
    "fitness",
    "flash",
    "food",
    "football",
    "foreign",
    "found family",
    "fugitive",
    "full cgi",
    "full color",
    "gambling",
    "gangs",
    "gender bending",
    "ghost",
    "go",
    "goblin",
    "gods",
    "golf",
    "gore",
    "guns",
    "gyaru",
    "handball",
    "henshin",
    "heterosexual",
    "hikikomori",
    "hip-hop music",
    "historical",
    "homeless",
    "horticulture",
    "ice skating",
    "idol",
    "indigenous cultures",
    "inn",
    "isekai",
    "iyashikei",
    "jazz music",
    "josei",
    "judo",
    "kaiju",
    "karuta",
    "kemonomimi",
    "kids",
    "kingdom management",
    "konbini",
    "kuudere",
    "lacrosse",
    "language barrier",
    "lgbtq+ themes",
    "long strip",
    "lost civilization",
    "love triangle",
    "mafia",
    "magic",
    "mahjong",
    "maids",
    "makeup",
    "male harem",
    "male protagonist",
    "marriage",
    "martial arts",
    "matchmaking",
    "matriarchy",
    "medicine",
    "medieval",
    "memory manipulation",
    "mermaid",
    "meta",
    "metal music",
    "military",
    "mixed gender harem",
    "mixed media",
    "monster boy",
    "monster girl",
    "mopeds",
    "motorcycles",
    "mountaineering",
    "musical theater",
    "mythology",
    "natural disaster",
    "necromancy",
    "nekomimi",
    "ninja",
    "no dialogue",
    "noir",
    "non-fiction",
    "nudity",
    "nun",
    "office",
    "office lady",
    "oiran",
    "ojou-sama",
    "orphan",
    "otaku culture",
    "outdoor activities",
    "pandemic",
    "parenthood",
    "parkour",
    "parody",
    "philosophy",
    "photography",
    "pirates",
    "poker",
    "police",
    "politics",
    "polyamorous",
    "post-apocalyptic",
    "pov",
    "pregnancy",
    "primarily adult cast",
    "primarily animal cast",
    "primarily child cast",
    "primarily female cast",
    "primarily male cast",
    "primarily teen cast",
    "prison",
    "proxy battle",
    "psychosexual",
    "puppetry",
    "rakugo",
    "real robot",
    "rehabilitation",
    "reincarnation",
    "religion",
    "rescue",
    "restaurant",
    "revenge",
    "robots",
    "rock music",
    "rotoscoping",
    "royal affairs",
    "rugby",
    "rural",
    "samurai",
    "satire",
    "school",
    "school club",
    "scuba diving",
    "seinen",
    "shapeshifting",
    "ships",
    "shogi",
    "shoujo",
    "shounen",
    "shrine maiden",
    "skateboarding",
    "skeleton",
    "slapstick",
    "slavery",
    "snowscape",
    "software development",
    "space",
    "space opera",
    "spearplay",
    "steampunk",
    "stop motion",
    "succubus",
    "suicide",
    "sumo",
    "super power",
    "super robot",
    "superhero",
    "surfing",
    "surreal comedy",
    "survival",
    "swimming",
    "swordplay",
    "table tennis",
    "tanks",
    "tanned skin",
    "teacher",
    "teens' love",
    "tennis",
    "terrorism",
    "time loop",
    "time manipulation",
    "time skip",
    "tokusatsu",
    "tomboy",
    "torture",
    "tragedy",
    "trains",
    "transgender",
    "travel",
    "triads",
    "tsundere",
    "twins",
    "unrequited love",
    "urban",
    "urban fantasy",
    "vampire",
    "vertical video",
    "veterinarian",
    "video games",
    "vikings",
    "villainess",
    "virtual world",
    "vocal synth",
    "volleyball",
    "vtuber",
    "war",
    "werewolf",
    "wilderness",
    "witch",
    "work",
    "wrestling",
    "writing",
    "wuxia",
    "yakuza",
    "yandere",
    "youkai",
    "yuri",
    "zombie",
  ];

  new Tagify(tagFilters, {
    enforceWhitelist: true,
    whitelist: tagWhitelist,
    originalInputValueFormat: (tags) => tags.map((index) => index.value),
  });
}

function showAllRecommendationsFunctionality() {
  document.getElementById("all-recommendations-div").replaceChildren();
  recommendationsList.length = 0;
  statusList.length = 0;

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

  if (!userName1) {
    Swal.fire({
      icon: "warning",
      title: "Missing Username",
      text: "Please enter your AniList username.",
    });
    return;
  }

  if (!genreFilters.length && !tagFilters.length && !statusList.length) {
    Swal.fire({
      icon: "warning",
      title: "Missing Filters",
      text: "Please select at least one genre, tag, and status.",
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
}

function compareList() {
  const container = document.getElementById("show-compare-list");
  container.replaceChildren();

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

  const userName1 = document.createElement("input");
  userName1.type = "text";
  userName1.id = "first-username";
  userName1.placeholder = "Your AniList Username";

  const userName2 = document.createElement("input");
  userName2.type = "text";
  userName2.id = "second-username";
  userName2.placeholder = "Other User's Username";

  const userRow = createLeftAlignedRow(userName1, userName2);

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

  const submitBtn = document.createElement("button");
  submitBtn.innerText = "Submit";
  submitBtn.onclick = compareListFunctionality;
  const buttonRow = createLeftAlignedRow(submitBtn);

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

  var variables = {
    userName: userName1,
    type: "ANIME",
    status_in: ["CURRENT", "COMPLETED", "DROPPED", "PAUSED", "REPEATING"],
  };

  console.log("Sending query variables:", variables);

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

  await fetch(url, options)
    .then(handleResponse)
    .then(handleData)
    .catch(handleError);

  function handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json);
    });
  }

  function handleData(userData1) {}

  function handleError(error) {
    console.error(error);
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

  var variables = {
    userName: userName2,
    type: "ANIME",
    status_in: userStatusList,
  };

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

  fetch(url, options).then(handleResponse).then(handleData).catch(handleError);

  function handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json);
    });
  }

  function handleData(userData2) {
    console.log("this is userData2", userData2);

    const compareTable = document.getElementById("compare-table");
    compareTable.replaceChildren();

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

  fetch(url, options).then(handleResponse).then(handleData).catch(handleError);

  function handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json);
    });
  }

  function handleData(animeData) {
    const container = document.getElementById("all-recommendations-div");
    container.replaceChildren();

    const mediaList = animeData.data.Page.media;
    let hasMatch = false;

    mediaList.forEach((media1) => {
      if (!user1IdList.includes(media1.id)) {
        hasMatch = true;

        const recommendations = document.createElement("p");
        recommendations.innerHTML = media1.title.english || media1.title.romaji;

        const saveBtn = document.createElement("button");
        saveBtn.innerText = "Save to Favorites";
        saveBtn.onclick = () =>
          saveRecommendation(
            media1.title.english || media1.title.romaji,
            media1.id
          );

        const item = document.createElement("div");
        item.append(recommendations, saveBtn);
        container.append(item);
      }
    });

    if (!hasMatch) {
      const noMatchMessage = document.createElement("p");
      noMatchMessage.textContent =
        "It doesn't seem like there's any anime that matches your filters.";
      noMatchMessage.style.fontStyle = "italic";
      noMatchMessage.style.color = "#888";
      container.appendChild(noMatchMessage);
    }
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
    `https://inst-377-final-project-lac.vercel.app/api/favorites?username=${username}`
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
