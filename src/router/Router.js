import  { Route , Switch } from 'react-router-dom'
import React from 'react'
import ConverterView from '../components/webviews/ConverterView.js'
export default function Router() {
    return (
        <Switch>
            <Route to="/" component={ConverterView} />
        </Switch>
    )
}
