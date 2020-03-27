/* global __SERVER_APP_CODE__, __SERVER_APP_KEY__ */
export const getAuth = () => {
  let sha256 = require("js-sha256");
  let paymentez_server_application_code = __SERVER_APP_CODE__ !== "undefined" ? __SERVER_APP_CODE__ : null;
  let paymentez_server_app_key = __SERVER_APP_KEY__ !== "undefined" ? __SERVER_APP_KEY__ : null;

  let d = new Date();
  let unix_timestamp = String(d.getTime());
  // unix_timestamp = String("1546543146");
  //console.log("UNIX TIMESTAMP:", unix_timestamp);
  let uniq_token_string = paymentez_server_app_key + unix_timestamp;
  //console.log('UNIQ STRING:', uniq_token_string);
  let uniq_token_hash = sha256(uniq_token_string);
  //console.log('UNIQ STRING:', uniq_token_hash);
  let string_auth_token = btoa(
    paymentez_server_application_code +
      ";" +
      unix_timestamp +
      ";" +
      uniq_token_hash
  );
  //console.log('AUTH TOKEN:', string_auth_token);
  return string_auth_token;
};
