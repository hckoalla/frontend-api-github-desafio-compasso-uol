function getRepos() {
    clearReposModal();

    const username = getUsername();
    if (!username) {
        return;
    }

    const apiReponse = callAPI(API_URL_REPOS(username));
    if (!apiReponse) {
        return;
    }

    apiReponse.then(function (response) {
        if (!response.ok) {
            if (r.status === 404) {
                toggleModal(ERROR_REPOS_NOT_FOUND);
                return;
            }
            throw Error(response.status);
        }
        return response.json();
    }).then(function (reposData) {
        fillReposTable(reposData, username);
        toggleUserModal();
        toggleReposModal();
    }).catch(function (error) {
        console.log(error);
    });
}

function clearReposModal() {
    $("#repos-modal-header").html("");

    $("#repos-modal-body-table tr").remove();
    const reposThead = $('#repos-modal-body-table thead');
    const header = $('<tr>');
    $('<th>').html('Name').appendTo(header);
    $('<th>').html('Language').appendTo(header);
    $('<th>').html('Fork').appendTo(header);
    $('<th>').html('Size').appendTo(header);
    $('<th>').html('Link').appendTo(header);
    reposThead.append(header);
}

function fillReposTable(reposData, username) {
    $("#repos-modal-header").html(username + "'s Repositories");

    var reposTbody = $('#repos-modal-body-table tbody');
    const props = ["name", "language", "fork", "size", "html_url"];
    $.each(reposData, function (i, data) {
        const tr = $('<tr>');
        $.each(props, function (i, prop) {
            if (prop === "html_url") {
                const urlButton = "<button class=\"btn btn-info\" onclick=\" window.open('" + data[prop] + "','_blank')\">More</button>";
                $('<td>').html(urlButton).appendTo(tr);
            } else if (prop === "fork") {
                $('<td>').html(data[prop] ? "Yes" : "").appendTo(tr);
            } else {
                $('<td>').html(data[prop]).appendTo(tr);
            }
        });
        reposTbody.append(tr);
    });
}