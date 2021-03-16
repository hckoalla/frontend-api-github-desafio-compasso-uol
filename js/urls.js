const API_URL_USER = (username) => "https://api.github.com/users/" + username;
const API_URL_REPOS = (username) => "https://api.github.com/users/" + username + "/repos";
const API_URL_STARRED = (username) => "https://api.github.com/users/" + username + "/starred";