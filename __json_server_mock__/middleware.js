module.exports = (req, res, next) =>{
  console.log(req, 'req');
  if(req.method==='POST' && req.url==='/login') {
    if(req.body.username === 'admin' && req.body.password === '123456') {
      return res.status(200).json({
        user: {
          token: '123'
        }
      })
    } else {
      return res.status(400).json({
        message: '用户名或密码错误'
      })
    }
  }
  next()
}