import axios from 'axios';

export default class Interceptor {

    setup(changeLoadingState) {

        let count = 0;

        // Add a request interceptor
        axios.interceptors.request.use(function (config) {
            // Do something before request is sent
            changeLoadingState(true);
            count++;
            return config;
        })

        // Add a response interceptor
        axios.interceptors.response.use(function (response) {
            // Do something with response data
            if ((--count) === 0)
                changeLoadingState(false);

            return response;
        }, function (error) {
            // Do something with response error
            if (!(--count))
                changeLoadingState(false);

            return Promise.reject(error);
        })
    }
}