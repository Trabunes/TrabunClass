import React from 'react'
import {View} from 'react-native'

import {Provider} from 'react-redux'
import {createStore} from 'redux'
import { create } from 'istanbul-reports'

const App = () => (
    <Provider store={createStore}>
        <View></View>
    </Provider>
)

export default App