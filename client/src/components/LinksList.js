import React from 'react'
import {Link} from "react-router-dom";

export const LinksList = ({links}) => {
    // if length of array is 0
    if (!links.length) {
        return <p className="center">No links</p>
    }

    return (
        <table>
            <thead>
            <tr>
                <th>N</th>
                <th>Original link</th>
                <th>Short link</th>
                <th>Open link</th>
            </tr>
            </thead>

            <tbody>
            { links.map((link, index) => {
                return (
                    <tr key={link._id}>
                        <td>{index + 1}</td>
                        <td>{link.from}</td>
                        <td>{link.to}</td>
                        <td><Link to={`/detail/${link._id}`}>open</Link></td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}