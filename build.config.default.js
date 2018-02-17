const PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
    webpack : {
        devServer: !PRODUCTION && {
            port: 9001,
        }
    }
};