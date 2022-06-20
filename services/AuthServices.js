import axios from "axios";

export function SignIn(user, callback) {
  axios
    .post("https://api.pictsnap.simhive.com/api/login", user)
    .then((res) => {
      localStorage.setItem("token", res.data.access_token);

      GetUser(res.data.access_token, callback);
      callback();
    })
    .catch((err) => {
      console.log(err);
      callback();
    });
}

export function GetUser(token, callback) {
  axios
    .get("https://api.pictsnap.simhive.com/api/user", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
      callback();
    });
}
