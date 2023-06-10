import { mockData } from "../../pages/UserPage/UserPage";

const infoReducer = (state = mockData, action) => {
    switch (action.type){
        default:
            return state;
    }
}

export default infoReducer;