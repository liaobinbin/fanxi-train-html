import Axios from 'axios';

const axios = Axios.create()
axios.interceptors.response.use(res => {
  return res.data
})
export default {
  getNewsList (page = 1, limit = 12) {
    return axios.get('https://61e80b15e32cd90017acbfb7.mockapi.io/enterprise/news', { params: { page, limit } })
  },
  getNewsItem (id) {
    return axios.get(`https://61e80b15e32cd90017acbfb7.mockapi.io/enterprise/news/${id}`)
  },
}