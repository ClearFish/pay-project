import axios from "axios";

export const service = axios.create({
    baseURL:''
})

service.interceptors.request.use(
	function(error) {
		// 对请求错误做些什么
		console.log(error)
		console.log('这里是请求错误')
		return Promise.reject(error)
	}
)
//响应拦截器
service.interceptors.response.use(
	res => {
		// 在请求成功后的数据处理
		if (res.status === 200) {
			console.log(res.status)
			console.log('这里是请求成功后')
 
			return res;
		} else {
			console.log(res.status)
			console.log('这里是请求失败后')
			return res;
		}
 
	},
	err => {
		// 在响应错误的时候的逻辑处理
		console.log('这里是响应错误')
 
		return Promise.reject(err)
    }
)