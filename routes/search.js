const axios = require('axios');
const urlencode = require('urlencode');
const search = (req, res) =>{

    const keyword = urlencode(req.params.keyword);
    axios.get(`https://itunes.apple.com/search?term=${keyword}&limit=25&entity=song`)
        .then((response) => { res.send(response.data) });
};

module.exports.search = search;