const defaultState = {
    displayName: "",
    email: "",
    phoneNumber: "",
    photoURL: "",
    uuid: "",
    diary: [],
    reminder: [],
    readStory: {
        show: false,
        title: "",
        story: ""
    }
}

const reducer = (state = defaultState, action) => {
    switch(action.type){
        case "SET_USER":
            return {
                ...state,
                ...action.userDetails
            };
        case "ADD_TO_DIARY":
            return {
                ...state,
                diary: [...state.diary, {...action.diaryDetails}]
            };
            case "SET_REMINDER":
            return {
                ...state,
                reminder: [...state.reminder, {...action.reminderDetails}]
            };
            case "READ_STORY":
            return {
                ...state,
                readStory: {
                    show: action.show,
                    title: action.title,
                    story: action.story
                }
            };
        default:
            return state;
    }
}

export default reducer
