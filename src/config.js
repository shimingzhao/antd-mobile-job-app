import axios from 'axios'
import { Toast } from 'antd-mobile'

// intercept request
axios.interceptors.request.use((config) => {
    Toast.loading('Loading...', 0)
    return config
})

// intercept response
axios.interceptors.response.use((config) => {
    Toast.hide()
    return config
})
