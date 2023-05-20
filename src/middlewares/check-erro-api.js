export default (erro, req, res, next) => {

  if (erro) {
    return res.status(503).json(
      {
        success: false,
        message: 'We were unable to complete your request'
      }
    )
  }

  next()

}
