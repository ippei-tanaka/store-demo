import 'whatwg-fetch';

let config = null;

// export default fetch;

export const fetchFromPath = async ({path, options}) => {
    if (!config) {
        const response = await fetch('/config.json');
        config = await response.json();
    }

    const url = config.fetch_base + path;

    return fetch(url, options);
};

export const fetchDataFromGraphQlPath = async ({path, query, token, options}) => {
    const isMutation = /^\s*mutation/.test(query);

    const _options = Object.assign({
        method: isMutation ? 'POST' : 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({query}),
    }, options);

    const reqponse = fetchFromPath({
        path,
        options: _options,
    });

    return await reqponse.json();
};
