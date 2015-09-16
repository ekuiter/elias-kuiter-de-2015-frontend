Meteor.startup(function() {
  var redirectUrl = process.env.REDIRECT_URL, timeFrame = process.env.TIME_FRAME;
  if (redirectUrl && timeFrame) {
    var hours = timeFrame.split("-");
    var startHour = parseInt(hours[0]);
    var endHour = parseInt(hours[1]);

    WebApp.connectHandlers.use(function(req, res, next) {
      var currentHour = new Date().getHours();
      if (currentHour >= startHour && currentHour <= endHour) {
        res.writeHead(302, { Location: redirectUrl + req.url });
        res.end();
      } else
        next();
    });
  }
});