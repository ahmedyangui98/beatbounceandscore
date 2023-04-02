import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { GET_IMAGE_URL, LOGIN_URL, LOGOUT_URL, REGISTER_URL } from '../../Admin/config/api'


const initialState = {
    activeTab: 'login',
    activeSource: 'webcam',
    cameraStatus: 'closed',
    isFlashing: false,
    request: {
        status: null,
        code: 0,
        msg: null,
        url: null,
        screenshot: null,
        login: {
            password: null
        },
        register: {
            firstname: null,
            lastname: null,
            email: null,
            password: null,
            repeatPassword: null,
            birthdate: null,
            gender: null
        }
    },
    user: {},
    users: [],

    error: {
        login: {
            password: null,
            screenshot: null,
            serverErr: null
        },
        register: {
            firstname: null,
            lastname: null,
            email: null,
            password: null,
            repeatPassword: null,
            screenshot: null,
            birthdate: null,
            gender: null,
            serverErr: null
        }
    }
}

axios.defaults.headers['Accept'] = 'application/json'

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (credentials,{rejectWithValue}) => {
        let response = {}
        await axios.post(REGISTER_URL,
                {...credentials}
            ).then(r => {
                response = {status: r.status, data: r.data}
            }).catch(e => {
                response = rejectWithValue(e)
            })
        return response
    }
)
export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (credentials,{rejectWithValue}) => {
        let response = {}
        await axios.post(LOGOUT_URL,
                {...credentials}
            ).then(r => {
                response = {status: r.status, data: r.data}
            }).catch(e => {
                response = rejectWithValue(e)
            })
        return response
    }
)
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials,{rejectWithValue}) => {
        let response = {}
        await axios.post(LOGIN_URL,
                {...credentials}
            ).then(r => {
                response = {status: r.status, data: r.data.user,token:r.data.token}
                console.log("response login"+JSON.stringify(r.data.token))
               // localStorage.setItem("token", response.token);

            }).catch(e => {
                response = rejectWithValue(e)
            })
        return response
    }
)

export const setScreenshotFromURL = createAsyncThunk(
    'auth/setScreenshotFromURL',
    async (credentials,{rejectWithValue}) => {
        let response = {}
        await axios.post(GET_IMAGE_URL,
                {...credentials}
            ).then(r => {
                response = {status: r.status, data: r.data}
            }).catch(e => {
                response = rejectWithValue(e)
            })
        return response
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setActiveTab: (state, action) => {
            state.activeTab = action.payload
        },
        setActiveSource: (state, action) => {
            state.activeSource = action.payload
        },
        setCameraStatus: (state, action) => {
            state.cameraStatus = action.payload
        },
        setIsFlashing: (state, action) => {
            state.isFlashing = action.payload
        },
        setRegisterFirstname: (state, action) => {
            state.request.register.firstname = action.payload
        },
        setRegisterLastname: (state, action) => {
            state.request.register.lastname = action.payload
        },
        setScreenshot: (state, action) => {
            state.request.screenshot = action.payload
        },
        setRegisterEmail: (state, action) => {
            state.request.register.email = action.payload
        },
        setRegisterPassword: (state, action) => {
            state.request.register.password = action.payload
        },
        setRegisterRepeatPassword: (state, action) => {
            state.request.register.repeatPassword = action.payload
        },
        setLoginEmail: (state, action) => {
            state.request.login.email = action.payload
        },
        setLoginPassword: (state, action) => {
            state.request.login.password = action.payload
        },
        setRegisterGender: (state, action) => {
            state.request.register.gender = action.payload
        },
        setRegisterBirthdate: (state, action) => {
            state.request.register.birthdate = action.payload
        },
        setUser: (state, action) => {
            if(action.payload == null){
                localStorage.removeItem('token')
            } else {
                localStorage.setItem('token', JSON.stringify(action.payload.user))
            }
            state.user = action.payload
        },
        resetAuthState: (state) => {
            state.activeTab = 'login'
            state.activeSource = 'webcam'
            state.request = {
                status: null,
                code: 0,
                msg: null,
                screenshot: null,
                login: {password: null},
                register: {firstname: null,lastname: null,email: null,password: null,repeatPassword: null}
            }
            state.error = {
                login: {password: null,screenshot: null,serverErr: null},
                register: {firstname: null,lastname: null,email: null,password: null,repeatPassword: null,screenshot: null,serverErr: null}
            }
        },
        setAuthError: (state, action) => {
            Object.keys(action.payload).map(s => {
                return Object.keys(action.payload[s]).map(v => {
                    return state.error[s][v] = action.payload[s][v]
                })
            })
        },
        setURL: (state, action) => {
            state.request.url = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state) => {
            state.request.status = 'pending'
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.request.status = 'fulfilled'
            state.request.code = action.payload.status
            state.user = action.payload.data
            localStorage.setItem('token', JSON.stringify(action.payload.data))    
            state.error.register.serverErr = null
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.request.status = 'rejected'
            if (action.payload.response) {
                state.request.code = action.payload.response.status
                state.error.register.serverErr = 'SERVER ERROR: ' + action.payload.response.data
            } else {
                state.request.code = 500
                state.error.register.serverErr = 'SERVER ERROR: ' + action.payload.message
            }
        })
        .addCase(logoutUser.pending, (state) => {
            state.request.status = 'pending'
        })
        .addCase(logoutUser.fulfilled, (state, action) => {
            state.request.status = 'fulfilled'
            state.request.code = action.payload.status
            state.request.msg = action.payload.data
            state.user = null
            localStorage.removeItem('token')
            state.error.login.serverErr = null            
        })
        .addCase(logoutUser.rejected, (state,action) => {
            state.request.status = 'rejected'
            if (action.payload.response) {
                state.request.code = action.payload.response.status
                state.error.login.serverErr = 'SERVER ERROR: ' + action.payload.response.data
            } else {
                state.request.code = 500
                state.error.login.serverErr = 'SERVER ERROR: ' + action.payload.message
            }
            state.user = null
            localStorage.removeItem('token')
        })
        .addCase(loginUser.pending, (state) => {
            state.request.status = 'pending'
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.request.status = 'fulfilled'
            state.request.code = action.payload.status
            state.user = action.payload.data
            localStorage.setItem('token', action.payload.token) 
            console.log("ahawa: "+action.payload.token)
            console.log(state.user)   
            state.error.login.serverErr = null
        })
        .addCase(loginUser.rejected, (state,action) => {
            state.request.status = 'rejected'
            if (action.payload.response) {
                state.request.code = action.payload.response.status
                state.error.login.serverErr = 'SERVER ERROR: ' + action.payload.response.data
            } else {
                state.request.code = 500
                state.error.login.serverErr = 'SERVER ERROR: ' + action.payload.message
            }
        })
        .addCase(setScreenshotFromURL.pending, (state) => {
            state.request.status = 'pending'
        })
        .addCase(setScreenshotFromURL.fulfilled, (state, action) => {
            state.request.status = 'fulfilled'
            state.request.screenshot = action.payload.data.blob
            state.error.login.serverErr = null
            state.error.register.serverErr = null
        })
        .addCase(setScreenshotFromURL.rejected, (state,action) => {
            state.request.status = 'rejected'            
            if (action.payload.response) {
                state.request.code = action.payload.response.status
                state.error.login.serverErr = 'SERVER ERROR: ' + action.payload.response.data
                state.error.register.serverErr = 'SERVER ERROR: ' + action.payload.response.data
            } else {
                state.request.code = 500
                state.error.login.serverErr = 'SERVER ERROR: ' + action.payload.message
                state.error.register.serverErr = 'SERVER ERROR: ' + action.payload.message
            }
        })
    }
})

export const getActiveTab = state => state.auth.activeTab
export const getActiveSource = state => state.auth.activeSource
export const getCameraStatus = state => state.auth.cameraStatus
export const getIsFlashing = state => state.auth.isFlashing
export const getScreenshot = state => state.auth.request.screenshot
export const getRequest = state => state.auth.request
export const getUser = state => (localStorage.getItem('token') != null) ? JSON.parse(localStorage.getItem('token')) : state.auth.user
export const getAuthError = state => state.auth.error
export const getURL = state => state.auth.request.url

export const { setActiveTab, setActiveSource, setCameraStatus, setIsFlashing, setScreenshot, setRegisterFirstname,setRegisterLastname, setRegisterEmail, setRegisterPassword, setRegisterRepeatPassword,setRegisterBirthdate,setRegisterGender, setLoginEmail, setLoginPassword, setUser, resetAuthState, setAuthError, setURL } = authSlice.actions
export default authSlice.reducer