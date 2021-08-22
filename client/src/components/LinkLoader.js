import React from 'react'

export const LinkCard = ({link}) => {
    return (
        <>
            <h2>Yor link info</h2>
            <p>Your short link: <a href={link.to} target="_blank" rel="noopenner noreferrer">{link.to}</a></p>
            <p>link from: <a href={link.from} target="_blank" rel="noopenner noreferrer">{link.from}</a></p>
            <p>date of creation: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
            <p>clicks: <strong>{link.clicks}</strong></p>
        </>
    )
}