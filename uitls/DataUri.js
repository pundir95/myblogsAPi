import DatauriParser from 'datauri/parser';
const path = require("path");

const getDataUri = (file) => {
    const parser = new DatauriParser();
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer)


}

export default getDataUri;
