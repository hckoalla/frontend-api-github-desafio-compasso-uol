// MESSAGE
function toggleModal(message) {
    $("#message-modal-body-label").text(message ? message : ERROR_GENERAL);
    toggleMessageModal();
}

function toggleMessageModal() {
    $('#message-modal').modal('toggle');
}

// USER
function toggleUserModal() {
    $('#user-modal').modal('toggle');
}

// REPOS
function toggleReposModal() {
    $('#repos-modal').modal('toggle');
}

// STARRED
function toggleStarredModal() {
    $('#starred-modal').modal('toggle');
}
