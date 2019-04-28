if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test")
  {
    server_ip = ""
    console.log("in production env")
    axios_config = {}
  }
else{
  server_ip = "http://127.0.0.1:3000"
  axios_config = {withCredentials: true} //this is for allowing cookie in CORS, making debugging possible
}

module.exports = {
  server_ip,
  axios_config
}
