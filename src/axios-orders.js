import axios from 'axios'

const instance = axios.create({
    baseURL : 'https://react-burger-builder-8ad5c.firebaseio.com/'
})

export default instance