export const IncAction = (value) => async dispatch => {
    dispatch({
        type: "Increment",
        payload: value
    })
} 
export const DecAction = (value) => async dispatch => {
    dispatch({
        type: "Decrement",
        payload: value
    })
} 