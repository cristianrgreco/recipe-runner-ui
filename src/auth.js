import {AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserAttribute} from 'amazon-cognito-identity-js';

const USER_POOL_ID = process.env.REACT_APP_COGNITO_USER_POOL_ID;
const CLIENT_ID = process.env.REACT_APP_COGNITO_CLIENT_ID;

const userPool = () => {
    return new CognitoUserPool({
        UserPoolId: USER_POOL_ID,
        ClientId: CLIENT_ID,
    });
};

const cognitoUser = username => {
    return new CognitoUser({
        Username: username,
        Pool: userPool()
    });
};

const getCurrentUser = () => {
    const pool = userPool();
    return pool.getCurrentUser();
};

export const getJwtToken = () => new Promise((resolve, reject) => {
    const user = getCurrentUser();

    if (user === null) {
        reject(new Error('Cannot get JWT token as user is not logged in'));
    } else {
        user.getSession((err, session) => {
            if (err) {
                reject(new Error(`Error getting user session: ${err}`));
            } else {
                if (session.isValid()) {
                    resolve(session.getAccessToken().getJwtToken());
                } else {
                    reject(new Error('Session exists but is not valid'));
                }
            }
        });
    }
});

export const isLoggedIn = () => new Promise((resolve, reject) => {
    const user = getCurrentUser();

    if (user === null) {
        resolve(false);
    } else {
        user.getSession((err, session) => {
            if (err) {
                reject(err);
            } else {
                if (session.isValid()) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        });
    }
});

export const login = (username, password) => new Promise((resolve, reject) => {
    const authenticationDetails = new AuthenticationDetails({
        Username: username,
        Password: password
    });

    const user = cognitoUser(username);

    user.authenticateUser(authenticationDetails, {
        onSuccess: () => {
            resolve(user);
        },
        onFailure: err => {
            reject(err);
        }
    });
});

export const logout = () => {
    getCurrentUser().signOut();
};

// const register = (username, password) => {
//     const attributes = [
//         new CognitoUserAttribute({Name: 'email', Value: username})
//     ];
//
//     const pool = userPool();
//
//     return new Promise((resolve, reject) => {
//         pool.signUp(username, password, attributes, null, (err, result) => {
//             if (err) {
//                 console.error(err);
//                 reject(err);
//             } else {
//                 console.log(result);
//                 resolve(result.user);
//             }
//         });
//     });
// };
//
// const confirmRegistration = (cognitoUser, code) => {
//     return new Promise((resolve, reject) => {
//         cognitoUser.confirmRegistration(code, true, (err, result) => {
//             if (err) {
//                 console.error(err);
//                 reject(err);
//             } else {
//                 console.log(result);
//                 resolve();
//             }
//         });
//     });
// };