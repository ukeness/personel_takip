
const path = require("path");
const {getTests} = require("../models/getTestData");
const {response} = require("express");

const testController = async () => {
    return await getTests();
}

module.exports = {testController}






