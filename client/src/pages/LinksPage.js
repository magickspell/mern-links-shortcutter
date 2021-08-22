import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {LinksList} from "../components/LinksList";

export const LinksPage = () => {
    // the same thing as single link but use array
    const [links, setLinks] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/link', 'GET', null, {Authorization: `Bearer ${token}`})
            setLinks(fetched)
        } catch (e) {}
    }, [token, request])
    //push links in gui
    useEffect( () => {
        fetchLinks()
    }, [fetchLinks])
    // loader
    if (loading) {
        return <Loader />
    }

    return (
        <div>
            <h1>Links Page</h1>
            {!loading && <LinksList links={links} />}
        </div>
    )
}