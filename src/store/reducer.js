const count = 1;

export default function reducer(state =count, action) {
    const {type, payload} = action;
    switch(type){
        case "Increment":
            return state + payload;
        case "Decrement":
            return state - payload;
        default:
            return state;
    }
}