import React from 'react'
import Result from './Result'

export default function ResultsShellComp({ results }) {
    return (
            results.map(res => {
                return <Result key={ res.line1 } result={res} />
            })
    )
}