Meteor.startup(function() {
    const prerenderio = Npm.require('prerender-node');
    var token = process.env.PRERENDER_TOKEN, host = process.env.PRERENDER_HOST;

    if (token && host) {
        prerenderio.set('prerenderToken', token);
        prerenderio.set('host', host);
        prerenderio.set('protocol', 'http');
        WebApp.rawConnectHandlers.use(prerenderio);
    }
});
