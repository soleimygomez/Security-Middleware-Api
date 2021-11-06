
const dotenv = require("dotenv");
dotenv.config();

const my_secret_key = process.env.MY_SECRET_KEY;

const base_URL = "http://backend.avanzocreditos.com:4000";

const base_URL_test = "http://localhost:4000";

const front_URL = process.env.FRONT_URL;


const excluded_account = 'EFECTY';

module.exports = {
  my_secret_key, base_URL, base_URL_test, front_URL, excluded_account
}