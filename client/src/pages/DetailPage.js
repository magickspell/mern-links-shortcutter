import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {LinkCard} from "../components/LinkLoader";

export const DetailPage = () => {
    //get token for request link from CONTEXT
    const {token} = useContext(AuthContext)
    //using http hook for getting link
    const {request, loading} = useHttp()
    //make link and setLink null by default
    const [link, setLink] = useState(null)
    //get id key from router
    const linkId = useParams().id

    //getting link from database
    const getLink = useCallback(async () => {
        try {
            const fetched = await request(`/api/link/${linkId}`, 'GET', null, {Authorization: `Bearer ${token}`})
            setLink(fetched)
        } catch (e) {
        }
    }, [token, linkId, request])

    //useEffect to set link in gui
    useEffect(() => {
        getLink()
    }, [getLink])
    // if loading we are get loader, if not get link info
    if (loading) {
        return <Loader/>
    }
    return (
        <>
            <h1>DetailPage</h1>
            {!loading && link && <LinkCard link={link}/>}
        </>
    )
}