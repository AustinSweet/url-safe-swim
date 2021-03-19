import React from 'react';

export default function Result({ result }) {
    return (
        <>
            <div>
                <label>
                { result.source }
                </label>
            </div>
        </>
    )
}