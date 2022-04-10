const Sequelize = require('sequelize');
const db = require('../database');
const User = require('../model/User');

const News = db.define('New', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    texto: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

module.exports = News;