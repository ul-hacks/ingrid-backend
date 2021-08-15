
import { Client } from 'pg';
import format from 'pg-format';

import { POSTGRES_CONNECTION_STRING } from '../config';

import { Extension } from '../types/user.types';

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

export const dbGetUserByUsername = async (username: string) =>
  postgresClient.query(
    'SELECT * FROM Users WHERE username = $1',
    [username]
  )
  .then((res) => [null, res.rows])
  .catch(err => [err, null])

export const dbGetUserById = async (userid: number) =>
  postgresClient.query(
    'SELECT * FROM Users WHERE id = $1',
    [userid]
  )
  .then((res) => [null, res.rows])
  .catch(err => [err, null])

// CREATE TYPE providerenum AS ENUM ('github', 'gitlab');
// CREATE TABLE Extensions (
//   id serial primary key,
//   userid int not null,
//   provider providerenum not null,
//   account varchar(256) not null,
//   CONSTRAINT userid_foreign FOREIGN KEY (userid) REFERENCES Users (id)
// );

export const dbGetUserExtensions = async (username: string) =>
  postgresClient.query(
    `SELECT * FROM Users U INNER JOIN Extensions E ON U.id = E.userid
    WHERE U.username = $1`,
    [username]
  )
  .then((res) => [null, res.rows])
  .catch(err => [err, null])

export const dbWipeUserExtensions = async (userid: number) =>
  postgresClient.query(
    'DELETE FROM Extensions WHERE userid = $1',
    [userid]
  )
  .then((res) => [null, 'OK'])
  .catch(err => [err, null])

export const dbSetUserExtensions = async (userid: number, extensions: Extension[]) => {

  const formattedValues = extensions.map(extension => [userid, extension.provider, extension.account]);

  return postgresClient.query(format(
    'INSERT INTO Extensions (userid, provider, account) VALUES %L',
    formattedValues 
  ))
  .then((res) => [null, 'OK'])
  .catch(err => [err, null])
}

