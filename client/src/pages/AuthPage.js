import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    //import default context
    const auth = useContext(AuthContext)
    //import custom hook for work with messages and create values from it
    const message = useMessage()
    //import custom hook for work with http and create values from it
    const {loading, error, request, clearError} = useHttp()
    // creating default state
    const [form, setForm] = useState({
        email: '', password: ''
    })
    //show errors
    useEffect(() => {
        console.log('Error', error)
        message(error)
        clearError()
    }, [error, message, clearError])
    //reloading fields on startup page, M it is MATERIALIZE thing
    useEffect( () => {
        window.M.updateTextFields()
    },[])
    // method to work with form
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            console.log('Data', data)
            message(data.message)
        } catch (e) {
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            console.log('Data', data)
            auth.login(data.token, data.userId)
            /*message(data.message)*/
        } catch (e) {
        }
    }

    // rendering auth page
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Shortcut Link</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>
                            <div className="input-field">
                                <input placeholder="your email"
                                       id="email"
                                       type="text"
                                       name="email"
                                       className="yellow-input"
                                       onChange={changeHandler}
                                value={form.email}/>
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input placeholder="your password"
                                       id="password"
                                       type="password"
                                       name="password"
                                       className="yellow-input"
                                       onChange={changeHandler}
                                       value={form.password}/>
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn yellow darken-4"
                                style={{margin: 10}}
                                disabled={loading}
                                onClick={loginHandler}>
                            Log in
                        </button>
                        <button className="btn grey lighten-1 black-text"
                                onClick={registerHandler}
                                disabled={loading}>
                            Create user
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}