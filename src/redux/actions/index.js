//Action Creator

export const setUser = (token) => {
    console.log("SET USER CALLED");
    console.log(token);
    //Returns an Action
    return {
        type: "SET_CURRENT_USER",
        payload: token
    };
};

export const delUser = () => {
    //Returns an Action
    return {
        type: "DEL_CURRENT_USER"
    };
};