import firebase, { database } from "../../Firebase";

export const actionUsername = () => dispatch => {
  setTimeout(() => {
    return dispatch({ type: "CHANGE_USER", value: "AmarKhoirudin" });
  }, 2000);
};

// const actionUsername = () => {
//   return dispatch => {
//     setTimeout(() => {
//       return dispatch({ type: "CHANGE_USER", value: "succes" });
//     }, 2000);
//   };
// };

export const registerUserAPI = data => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({ type: "CHANGE_LOADING", value: true });
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(res => {
        console.log("succes =>", res);
        dispatch({ type: "CHANGE_LOADING", value: false });
        resolve(true);
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        dispatch({ type: "CHANGE_LOADING", value: false });
        reject(false);
      });
  });
};

export const loginUserAPI = data => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({ type: "CHANGE_LOADING", value: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(res => {
        const dataUser = {
          email: res.user.email,
          uid: res.user.uid,
          emailVerified: res.user.emailVerified,
          refreshToken: res.user.refreshToken
        };
        console.log("Login Succes =>", res);
        dispatch({ type: "CHANGE_LOADING", value: false });
        dispatch({ type: "CHANGE_ISLOGIN", value: true });
        dispatch({ type: "CHANGE_USER", value: dataUser });
        resolve(dataUser);
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        dispatch({ type: "CHANGE_LOADING", value: false });
        dispatch({ type: "CHANGE_ISLOGIN", value: false });
        reject(false);
      });
  });
};

export const addDataToApi = data => dispatch => {
  database.ref("notes/" + data.uid).push({
    title: data.title,
    content: data.content,
    date: data.date
  });
};

export const getDataFromApi = userId => dispatch => {
  const ulrnotes = database.ref("notes/" + userId);
  return new Promise((resolve, reject) => {
    ulrnotes.on("value", function(snapshot) {
      console.log("getdata > ", snapshot.val());

      const data = [];
      Object.keys(snapshot.val()).map(key => {
        data.push({
          id: key,
          data: snapshot.val()[key]
        });
      });
      dispatch({ type: "SET_NOTES", value: data });
      resolve(snapshot.val());
    });
  });
};

export const updateDataApi = data => (dispatch) => {
  const ulrnotes = database.ref(`notes/${data.userId}/${data.noteId}`);
  return new Promise((resolve, reject) => {
    ulrnotes.set(
      {
        title: data.title,
        content: data.content,
        date: data.date
      },
      err => {
        if (err) {
          reject(false);
        } else {
          resolve(true);
        }
      }
    );
  });
};
