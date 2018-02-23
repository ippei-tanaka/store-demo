import 'whatwg-fetch';

let config = null;

export const getApiBase = async () => {
    if (!config) {
        const response = await fetch('/config.json');
        config = await response.json();
    }
    return config.api_base;
};

export const fetchFromPath = async ({path, options}) => {
    const url = (await getApiBase()) + path;
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

    if (token)
    {
        _options.headers['Authorization'] = 'Bearer ' + token;
    }

    const reqponse = await fetchFromPath({
        path,
        options: _options,
    });

    return await reqponse.json();
};

export const uploadFile = async ({path, file, token, options}) =>
{
    const body = await new Promise((resolve, reject) =>
    {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(event.currentTarget.result);
        };
        reader.readAsArrayBuffer(file);
    });

    const _options = Object.assign({
        method: 'POST',
        headers: {
            'content-type': file.type,
            'content-length': file.size,
        },
        body,
    }, options);

    if (token)
    {
        _options.headers['Authorization'] = 'Bearer ' + token;
    }

    const reqponse = await fetchFromPath({
        path,
        options: _options,
    });

    return await reqponse.json();
};
