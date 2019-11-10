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

export const register = (username, password) => {
    const attributes = [
        new CognitoUserAttribute({Name: 'email', Value: username})
    ];

    const pool = userPool();

    return new Promise((resolve, reject) => {
        pool.signUp(username, password, attributes, null, (err, result) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log(result);
                resolve(result.user);
            }
        });
    });
};

export const confirmRegistration = (cognitoUser, code) => {
    return new Promise((resolve, reject) => {
        cognitoUser.confirmRegistration(code, true, (err, result) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log(result);
                resolve();
            }
        });
    });
};

export const login = (username, password) => {
    const authenticationDetails = new AuthenticationDetails({
        Username: username,
        Password: password
    });

    const user = cognitoUser(username);

    return new Promise((resolve, reject) => {
        user.authenticateUser(authenticationDetails, {
            onSuccess: result => {
                console.log(result);
                resolve({user, result});
            },
            onFailure: err => {
                console.error(err);
                reject(err);
            }
        });
    });
};

export const logout = username => {
    cognitoUser(username).signOut();
};

export const getSession = () => {
    const pool = userPool();
    const user = pool.getCurrentUser();
    console.log(user);

    return new Promise((resolve, reject) => {
        if (user !== null) {
            user.getSession((err, session) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    console.log(session, session.isValid());
                    resolve(session);
                }
            });
        }
    });
};
