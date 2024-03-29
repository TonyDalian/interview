<script>
    var posts = [
        {title: 'Post One', body: 'This is post one' },
        {title: 'Post two', body: 'This is post two' }
    ]
    function getPosts() {
        setTimeout(()=> {
            let output = '';
            posts.forEach((post, index) => {
                output += `<li>${post.title}</li>`;
            });
            document.body.innerHTML = output;
        },0);
    }
</script>
# 1. Callback
<script>
    function createPost(post, callback) {
        setTimeout(()=> {
            posts.push(post);
            callback();
        },1000);
    }

    createPost({ title: 'Post Three', body: 'This is post three'}, getPosts);
</script>  
# 2. Promise
<script>
    function createPost(post) {
        return new Promise((resolve, reject) => {
            setTimeout(()=> {
                posts.push(post);

                const error = false;
                if(!error) {
                    resolve("123");
                } else {
                    reject('Error Something went wrong');
                }
            },0);
        });
    }
    createPost({ title: 'Post Three', body: 'This is post three'})
    .then(data=> {
        console.log(data);
        getPosts();
    })
    .catch(err => console.log(err));

    function fetchData() {
        return fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json());
    }

    fetchData().then(data => console.log('Promise fetchData', data));
</script>  
# 3. Async / Await
<script>  
    async function init() {
        await createPost({ title: 'Post Three', body: 'This is post three'});
        getPosts();
        console.log('Async / Await');
    }

    init();

    async function fetchUsers() {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        console.log('await fetch user' , await res.json());
    }

    fetchUsers();
</script>  
# async await with promise
<script>  
    return new Promise(async (resolve, reject) => {
        try{
            const res = await axios.get(url);
            resolve(res.data)
        }catch(err){

        }
    });
 </script>    
# Promise.all
<script> 
    const promise1 = Promise.resolve('Hello World');
    const promise2 = 10;
    const promise3 = new Promise((resolve, reject) => setTimeout(resolve('Goodbye'), 2000));
    const promise4 = fetch('https://jsonplaceholder.typicode.com/users')
                     .then(res => res.json());
    
    Promise.all([promise1, promise2, promise3, promise4])
    .then(values => console.log(values));
</script>

## refresh token
https://medium.com/swlh/handling-access-and-refresh-tokens-using-axios-interceptors-3970b601a5da
```js
import axios from "axios";
import LocalStorageService from "./services/storage/localstorageservice";
import router from "./router/router";

// LocalstorageService
const localStorageService = LocalStorageService.getService();

// Add a request interceptor
axios.interceptors.request.use(
   config => {
       const token = localStorageService.getAccessToken();
       if (token) {
           config.headers['Authorization'] = 'Bearer ' + token;
       }
       // config.headers['Content-Type'] = 'application/json';
       return config;
   },
   error => {
       Promise.reject(error)
   });

//Add a response interceptor

axios.interceptors.response.use((response) => {
   return response
}, function (error) {
   const originalRequest = error.config;

   if (error.response.status === 401 && originalRequest.url === 
'http://13.232.130.60:8081/v1/auth/token) {
       router.push('/login');
       return Promise.reject(error);
   }

   if (error.response.status === 401 && !originalRequest._retry) {

       originalRequest._retry = true;
       const refreshToken = localStorageService.getRefreshToken();
       return axios.post('/auth/token',
           {
               "refresh_token": refreshToken
           })
           .then(res => {
               if (res.status === 201) {
                   localStorageService.setToken(res.data);
                   axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();
                   return axios(originalRequest);
               }
           })
   }
   return Promise.reject(error);
});
```
