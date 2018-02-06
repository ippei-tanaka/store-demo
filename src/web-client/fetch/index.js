import 'whatwg-fetch';

let config = null;

// export default fetch;

export const fetchFromPath = async ({path, options}) => {
    if (!config) {
        const response = await fetch('/config.json');
        config = await response.json();
    }

    const url = config.fetch_base + path;

    return await fetch(url, options);
};

export const fetchDataFromGraphQlPath = async ({path, query, token, options}) => {
    const _options = Object.assign({
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({query}),
    }, options);

    const reqponse = await fetchFromPath({
        path,
        options: _options,
    });

    return await reqponse.json();
};
