import axios from 'axios';
import Swal from 'sweetalert2';

export const getAllPosts = async () => {

    const res = await axios.get('/posts')
    
    if(res.status !== 200){
        return console.log("There is some error");
    }

    const data = res.data;
    return data;
}

export const sendLogin = async (signup,data) => {

    const res = await axios.post(`/user/${signup ? 'signup' : 'login'}/`,{
        name : data.name ? data.name : "",
        email : data.email,
        password : data.password
    }).catch((err) => console.log(err));

    if(res.status !== 200 && res.status !==201 ){
        return console.log('error')
    }else{
        Swal.fire({
            title:'success! Welcome',
            icon:'success',
            toast:true,
            timer:3000,
            position:'bottom-left',
            timerProgressBar: true,
            showConfirmButton: false
        });
    }

    const resData = await res.data;
    return resData;

}

export const addPost = async (data) => {
    const res = await axios.post("/posts/",{
        title : data.title,
        description : data.description,
        location : data.location,
        image : data.image,
        date : data.date,
        user : localStorage.getItem("userId")
    }).catch((er) => console.log(er))

    if (res.status !== 201){
        return console.log("Error occured")
    }

    const resData = await res.data
    return resData;
}

export const getPostDetails = async (id) => {
    const res = await axios.get(`/posts/${id}`)
    .catch((er) => console.log(er))
    if(res.status !== 200){
        return console.log("unable to fetch post");
    }

    const resData = await res.data;
    return resData;
}

export const postUpdate = async (data,id) => {

    const res = await axios.put(`/posts/${id}`,{
        title:data.title,
        description:data.description,
        location:data.location,
        image:data.image
    })
    .catch((err) => {
        console.log(err);
    })

    if(res.status!==200){
        return console.log("Unable to update the post");
    }

    const resData = await res.data;
    return resData;

}

export const postDelete = async (id) => {
    const res = await axios.delete(`/posts/${id}`)
    .catch((err) => console.log(err))

    if (res.status!==201){
        return console.log('Unable to delete the post');
    }

    const resData = await res.data;
    return resData;
}

export const getUserDetails = async () => {

    const id = localStorage.getItem('userId')
    const res = await axios.get(`/user/${id}`)
    .catch((err) => console.log(err))

    if(res.status !== 200){
        return console.log('no user found')
    }

    const resData = await res.data;
    return resData;
    
};