export const USER_DATA = 'USER_DATA';
export const CHECK_LOGIN = 'CHECK_LOGIN';

export const userDataAction = (data) => ({
    type: USER_DATA,
    payload: data
});

export const checkLoginAction = (value) => ({
    type: CHECK_LOGIN,
    payload: value
});
