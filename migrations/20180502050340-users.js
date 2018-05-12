'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            hash: {
                type: Sequelize.STRING,
                allowNull: false
            },
            wins: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            loses: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            games_played: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users');
    }
};