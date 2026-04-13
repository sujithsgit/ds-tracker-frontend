// src/store/reducers/resolutionReducer.js

const initialState = {
    resolutions: [],
    loading: false,
    error: null,
};

const resolutionReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_RESOLUTION_REQUEST':
            return { ...state, loading: true, error: null };
        case 'CREATE_RESOLUTION_SUCCESS':
            return { ...state, loading: false, resolutions: [...state.resolutions, action.payload] };
        case 'CREATE_RESOLUTION_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default resolutionReducer;