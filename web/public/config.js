const fetchConfigs = () => {
    const fetchConfigRequest = new XMLHttpRequest();
    const hostUrl = window.location.hostname === 'localhost' ? 'http://localhost:9002' : window.location.origin;

    fetchConfigRequest.open('GET', `${hostUrl}/api/v2/sonic/public/config`, false);
    fetchConfigRequest.send(null);

    if (fetchConfigRequest.status === 200) {
        window.env = JSON.parse(fetchConfigRequest.responseText);
    }
}

fetchConfigs();
