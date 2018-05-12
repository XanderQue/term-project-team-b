const bcrypt = require('bcrypt');
const db = require('./index');

const CREATE_QUERY =
    'INSERT INTO games (created_by) VALUES (${creatorId}) RETURNING id, created_by, created_at';
const create = creatorId =>
    db
        .one(CREATE_QUERY, { creatorId })
        .then(({ id, created_by, created_at }) =>
            Promise.all([addUser(id, created_by), getOwner(id), { id, created_at }])
        )
        .then(([_, { email }, { id, created_at }]) => ({
            id,
            email,
            created_at
        }));

const GET_OWNER_QUERY =
    'SELECT users.email FROM games, users WHERE games.id=${id} AND users.id=games.created_by';
const getOwner = id => db.one(GET_OWNER_QUERY, { id });

const ADD_USER_QUERY =
    'INSERT INTO game_users VALUES (${gameId}, ${userId}, ${observer}) RETURNING game_id AS id';
const addUser = (gameId, userId, observer = false) =>
    db.one(ADD_USER_QUERY, { gameId, userId, observer });

const addObserver = (gameId, observerId) => addUser(gameId, observerId, true);

const OPEN_GAMES_QUERY =
    'SELECT g.id, g.created_by, g.created_at, u.email FROM games AS g JOIN users AS u ON u.id=g.created_by WHERE g.completed=false AND g.started=false';
const allAvailable = () => db.any(OPEN_GAMES_QUERY);

module.exports = {
    create,
    addUser,
    addObserver,
    allAvailable
};