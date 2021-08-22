import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from 'react-router-dom'

export const CreatePage = () => {
    //making default state
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [link, setLink] = useState('')
    useEffect( () => {
        window.M.updateTextFields()
    }, [])
    //if enter is pressed then do request
    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link},
                    {Authorization: `Bearer ${auth.token}`})
                console.log(data)
                history.push(`/detail/${data.link._id}`)
            } catch (e) {}
        }
    }
    //rendering page
    return (
        <div className="row">
            <h1>Create Page</h1>
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input placeholder="your link"
                           id="link"
                           type="text"
                           value={link}
                           onChange={e => setLink(e.target.value)}
                           onKeyPress={pressHandler}
                           />
                    <label htmlFor="link">Insert Link</label>
                </div>
            </div>
        </div>
    )
}