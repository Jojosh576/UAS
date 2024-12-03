const path = require('path');

exports.renderHomePage = (req, res) => {
    res.sendFile(path.join(__dirname, '../../../views/index.html'));
};
