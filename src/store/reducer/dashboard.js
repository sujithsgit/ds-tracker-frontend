const initialState = {
    data: null,
    loading: false,
    error: null,
};

const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_DASHBOARD_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_DASHBOARD_SUCCESS':
            console.log("data is comming from reducer",action.payload)
            return { ...state, loading: false, data: action.payload };
        case 'FETCH_DASHBOARD_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default dashboardReducer;