function getUsername() {
    const username = $('#input-username').val();
    if (username === "") {
        toggleModal(VALIDATION_EMPTY_USERNAME);
        return;
    }
    return username;
}

function setUsername(username) {
    $('#input-username').val(username);
}

function findUser() {
    clearUserModal();

    const username = getUsername();
    if (!username) {
        return;
    }

    const apiReponse = callAPI(API_URL_USER(username));
    if (!apiReponse) {
        return;
    }

    apiReponse.then(function (response) {
        if (!response.ok) {
            if (response.status === 404) {
                toggleModal(ERROR_USER_NOT_FOUND);
            }
            throw Error(response.status);
        }
        return response.json();
    }).then(function (userData) {
        fillUserModal(userData);
        toggleUserModal();
    }).catch(function (error) {
        console.log(error);
    });

}

function clearUserModal() {
    $('#user-modal-header').html("");
    $('#user-modal-button-details').click(() => { });
    $('#user-modal-profile-image').attr("src", "");
    $('#user-modal-body-name').html("");
    $('#user-modal-body-company').html("");
    $('#user-modal-body-email').html("");
    $('#user-modal-body-hirable').html("");
    $('#user-modal-body-public_repos').html("");
}

function fillUserModal(userData) {
    $("#user-modal-header").html(userData.login + "'s Details");
    $('#user-modal-button-details').click(() => window.open(userData.html_url, '_blank'));
    $('#user-modal-profile-image').attr("src", userData.avatar_url);
    $('#user-modal-body-name').html(userData.name);
    $('#user-modal-body-company').html(userData.company);
    $('#user-modal-body-email').html(userData.email);
    $('#user-modal-body-hirable').html(userData.hirable ? "Yes" : "No");
    $('#user-modal-body-public_repos').html(userData.public_repos);
}

function hasUsernameOnPath() {
    // unsupported
    // const pathname = window.location.pathname;
    // const username = pathname.substring(pathname.lastIndexOf('/') + 1);

    if (!window.location.query) {
        window.location.query = Object.fromEntries(window.location.search.substr(1).split("&").map(group => group.split("=")));
    }

    const username = window.location.query.q;
    if (username) {
        setUsername(username);
        findUser();
    }
}
