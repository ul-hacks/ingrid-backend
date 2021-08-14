
import { Client } from 'pg';
import { POSTGRES_CONNECTION_STRING } from '../config';

export const postgresClient = new Client({
  connectionString: POSTGRES_CONNECTION_STRING
});

export const postgresConnect = () => {
  postgresClient.connect()
    .then(() => console.log('successfully connected to db'))
    .catch(err => console.error(err));
}

