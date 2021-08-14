
import { Client } from 'pg';
import { POSTGRES_CONNECTION_STRING } from '../config';

export const postgresClient = new Client({
  connectionString: POSTGRES_CONNECTION_STRING
});

export const postgresConnect = async () =>
  postgresClient.connect()
    .then(() => console.log('successfully connected to db'))
    .catch(err => console.error(err));

// export const dbPurgeAndRenew = async () => {}

// CREATE TABLE Users (
//   id serial primary key,
//   username varchar(64) not null unique,
//   password varchar(128) not null
// );

export const dbRegisterUser = async (username: string, password: string) =>
  postgresClient.query(
    'INSERT INTO Users(username, password) VALUES($1, $2) RETURNING id',
    [username, password]
  )
  .then((res) => [null, res.rows[0].id])
  .catch(err => [err, null])

// export const dbFindUserId = async (username: string) =>
//   postgresClient.query(
//     'SELECT id FROM Users WHERE username = $1',
//     [username]
//   )
//   .then((res) => [null, res.rows[0].id])
//   .catch(err => [err, null])

// export const dbGetUserHashedPass = async (username: string) =>
//   postgresClient.query(
//     'SELECT id, password FROM Users WHERE username = $1',
//     [username]
//   )
//   .then((res) => [null, res.rows[0]])
//   .catch(err => [err, null])

export const dbGetUserByUsername = async (username: string) =>
  postgresClient.query(
    'SELECT * FROM Users WHERE username = $1',
    [username]
  )
  .then((res) => [null, res.rows])
  .catch(err => [err, null])

