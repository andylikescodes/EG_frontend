import {server_ip, axios_config} from "../configs/web_configs"
import Axios from 'axios'
import vm from "../main"


function login (form) //form should have email and password field
{
  return new Promise((resolve, reject)=>{
    Axios.post(server_ip+'/auth/login', form, axios_config).then((res)=>{
      if(res.data.status=='success'){
        vm.$socket.connect()
        //console.log("emitting auth")
        resolve(res)
      }
      else{
        reject(res)
      }
    }).catch((err)=>{
      reject(err)
    })
  })
};

function logout (){
  return new Promise((resolve, reject) => {
    Axios.get(server_ip+'/auth/logout', axios_config).then((res)=>{
      if(res.data.status=='success'){
        resolve(res)
      }
      else{
        reject(res)
      }
    }).catch((err)=>{
      reject(err)
    })
  })
}

function get_profile(){
  return new Promise((resolve, reject) => {
    Axios.get(server_ip+'/user/user_profile', axios_config).then((res)=>{
      if(res.data){
        resolve(res.data.user_profile)
      }
      else {reject("no data received")}
    }).catch((err)=>{
      reject(err)
    })
  })
}


export {
  login,
  logout,
  get_profile
};
