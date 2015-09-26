function redirect(res, url, details) {
  console.log("Redirecting to " + url + (details ? ", " + details : ""));
  res.writeHead(302, { Location: url });
  res.end();
}

Meteor.startup(function() {
  var redirectUrl = process.env.REDIRECT_URL, timeFrame = process.env.TIME_FRAME;

  if (redirectUrl && timeFrame) {
    var hours = timeFrame.split("-");
    var startHour = parseInt(hours[0]);
    var endHour = parseInt(hours[1]);

    WebApp.connectHandlers.use(function(req, res, next) {
      var currentHour = Timezone.getHour();
      if (currentHour >= startHour && currentHour <= endHour)
        redirect(res, redirectUrl + req.url, "currentHour (" + currentHour + ") is in TIME_FRAME=" + timeFrame);
      else
        next();
    });
  }

  WebApp.connectHandlers.use(function(req, res, next) {
    var link = Links.findOne({ slug: req.url });
    if (link)
      redirect(res, link.url, "requested: " + link.slug);
    else
      next();
  });
});