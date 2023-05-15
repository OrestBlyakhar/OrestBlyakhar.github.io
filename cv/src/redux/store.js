import { combineReducers, createStore } from "redux";
import { composeWithDevToolsDevelopmentOnly } from "@redux-devtools/extension"

const rootReducer = combineReducers({
    
})

const composeEnhancers = composeWithDevToolsDevelopmentOnly({
    trace: true,
    traceLimit: 25,
});

const store = createStore(
    rootReducer,
    composeEnhancers()
);

export default store;