const bcrypt = require('bcrypt');
const db = require('./index');

const CREATE_QUERY =
    'INSERT INTO users (email, hash, name) VALUES (${email}, ${hash}, ${name}) RETURNING id, email';
const create = (email, password, name) =>
    bcrypt.hash(password, 10).then(hash => db.one(CREATE_QUERY, { email, hash, name }));

const find = email =>
    db.one('SELECT * FROM users WHERE email=${email}', { email });

const serialize = (user, done) => {
    console.log('serialize', user);
    done(null, user);
};

const deserialize = (id, done) => {
    db
        .one('SELECT * FROM users WHERE id=${id}', { id })
        .then(({ id, email }) => done(null, { id, email }))
        .catch(error => done(error));
};

module.exports = {
    create,
    find,
    serialize,
    deserialize
};