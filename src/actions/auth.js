import {useHistory} from "react-router-dom";
import {AUTH} from "../constans/actionTypes";
import * as api from '../api'


export const signin = (formData, history) => async (dispatch) => {
    const history = useHistory();
    try {
        const {data} = await api.signIn(formData);
        dispatch({type: AUTH, data})
        history.push('/')
    } catch (error) {
        console.log(error)

    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        const {data} = await api.signUp(formData);
        dispatch({type: AUTH, data})
        history.push('/')
    } catch (error) {
        console.log(error)
    }
}