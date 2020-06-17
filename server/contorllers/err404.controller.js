const path = require('path');

module.exports = {
// catch 404 and forward to error handler
  errOne (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  },

// error handler
  errTwo (err, req, res, next) {

    // set locals, only providing error in development
    // res.locals.message = err.message;
    // res.locals.error = req.app.get('env') === 'development' ? err : {};
    //
    // // render the error page
    res.status(err.status || 500);
    res.sendFile(path.join(__dirname, '../views/404.html'))
    // res.render('error');

  }
}
