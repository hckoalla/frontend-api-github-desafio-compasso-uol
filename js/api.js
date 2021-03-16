function callAPI(url) {
    if (!configData.enabled) {
        toggleModal(ERROR_CONFIG_DATA);
        console.log('It is necessary to modify the /resource/config.js file with the GitHub API token to proceed!');
        return;
    }
    if (self.fetch) {
        return fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Basic ' + btoa(configData.auth),
                'Content-Type': 'application/vnd.github.v3+json'
            })
        }).then(function (response) {
            return response;
        }).catch(function (error) {
            toggleModal(ERROR_FETCH_GENERAL);
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });
    } else {
        toggleModal(ERROR_FETCH_UNSUPPORTED);
        console.log('Fetch API unsupported on this browser!');
    }
}

if (!self.fetch) {
    toggleModal(ERROR_FETCH_UNSUPPORTED);
    console.log('Fetch API unsupported on this browser!');
}
