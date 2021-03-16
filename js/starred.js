function getStarred() {
    clearStarredModal();

    const username = getUsername();
    if (!username) {
        return;
    }

    const apiReponse = callAPI(API_URL_STARRED(username));
    if (!apiReponse) {
        return;
    }

    apiReponse.then(function (response) {
        if (!response.ok) {
            if (r.status === 404) {
                toggleModal(ERROR_STARRED_NOT_FOUND);
                return;
            }
            throw Error(response.status);
        }
        return response.json();
    }).then(function (starredData) {
        fillStarredTable(starredData, username);
        toggleUserModal();
        toggleStarredModal();
    }).catch(function (error) {
        console.log(error);
    });
}

function clearStarredModal() {
    $("#starred-modal-header").html("");

    $("#starred-modal-body-table tr").remove();

    const starredThead = $('#starred-modal-body-table thead');
    const header = $('<tr>');
    $('<th>').html('Name').appendTo(header);
    $('<th>').html('Language').appendTo(header);
    $('<th>').html('Forks Count').appendTo(header);
    $('<th>').html('Stargazers Count').appendTo(header);
    $('<th>').html('Watchers Count').appendTo(header);
    $('<th>').html('Link').appendTo(header);
    starredThead.append(header);
}

function fillStarredTable(reposData, username) {
    $("#starred-modal-header").html(username + "'s Starred Repositories");

    var reposTbody = $('#starred-modal-body-table tbody');
    const props = ["name", "language", "forks_count", "stargazers_count", "watchers_count", "html_url"];
    $.each(reposData, function (i, data) {
        const tr = $('<tr>');
        $.each(props, function (i, prop) {
            if (prop === "html_url") {
                const urlButton = "<button class=\"btn btn-info\" onclick=\" window.open('" + data[prop] + "','_blank')\">More</button>";
                $('<td>').html(urlButton).appendTo(tr);
            } else {
                $('<td>').html(data[prop]).appendTo(tr);
            }
        });
        reposTbody.append(tr);
    });
}
