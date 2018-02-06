const productList = (state = [
    {
        name: 'Shampoo',
        id: 0,
        description: 'This product lets you clean your hair.',
        price: 5.77,
    },
    {
        name: 'Cutting Board',
        id: 1,
        description: 'This product lets you cut food with a knife.',
        price: 40.43,
    },
    {
        name: 'Tea',
        id: 2,
        description: 'Something to drink.',
        price: 16.80,
    },
], action) => {
    return state;
};

export default productList;