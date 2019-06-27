# elias-kuiter-de

My website as of 2015, built with Meteor.

**Superseded by [ekuiter/elias-kuiter-de-2019](https://github.com/ekuiter/elias-kuiter-de-2019).**

It is divided into 3 parts:
- the [frontend](http://www.elias-kuiter.de) ([repository](https://github.com/ekuiter/elias-kuiter-de-frontend))
- the [backend](http://admin.elias-kuiter.de) ([repository](https://github.com/ekuiter/elias-kuiter-de-backend))
- and some code shared across front- and backend
  ([ekuiter:elias-kuiter-de-shared](https://atmospherejs.com/ekuiter/elias-kuiter-de-shared), [repository](https://github.com/ekuiter/elias-kuiter-de-shared))

## Frontend

The frontend is mainly hosted on Heroku (www.elias-kuiter.de). A second installation on OpenShift exists
(www2.elias-kuiter.de) which is active at night, when the Heroku app needs to recharge.

To deploy on Heroku, run:

    git push heroku master
   
As for OpenShift:

    ./release
    rhc app restart www # if necessary

Set the following environment variables:

    heroku config:set MONGO_URL=... ROOT_URL=http://www.elias-kuiter.de/ ERROR_PAGE_URL=http://elias-kuiter.de/redirect.html
    rhc env set MONGODB_URL=... ROOT_URL=http://www2.elias-kuiter.de/ REDIRECT_URL=http://www.elias-kuiter.de TIME_FRAME=6-23 --app www
    
(Note the (lack of) trailing slashes!)

Whenever the Heroku app is inactive, it uses ERROR_PAGE_URL to redirect the user to the OpenShift app (which is slower,
but does not idle).

The OpenShift app redirects the user in the given `TIME_FRAME` back to Heroku. This ensures that the user always sticks to
Heroku when possible. (When accessing `http://elias-kuiter.de` directly, PHP redirects to the `www` subdomain as well.)

## Backend

The backend is hosted on Heroku (admin.elias-kuiter.de). The database is a free MongoLab sandbox provided
by Heroku. To deploy, run:

    git push heroku master
    
When setting up, remember to set `MONGO_URL` and `ROOT_URL`:

    heroku config:set MONGO_URL=... ROOT_URL=http://admin.elias-kuiter.de/

Follow the instructions on admin.elias-kuiter.de to configure GitHub OAuth. Login is restricted to my
email address. Remember to set the `admin` role after first logging in - open www.mongolab.com/databases >
edit user > insert this:
 
    ...
    ,
        "roles": [
            "admin"
        ]
    }
    
## Further configuration

### Heroku idling

Create two cronjobs that keep Heroku from idling, pointing to www.elias-kuiter.de and admin.elias-kuiter.de
(every 30 minutes).

I use [kasapi-auto-cronjobs](https://github.com/ekuiter/kasapi-auto-cronjobs) to deactivate these cronjobs at night:

    $additionalCronjobs = array(
      array(6, 24, array('cronjob_comment' => 'wakeup', 'http_url' => 'www.elias-kuiter.de')),
      array(9, 22, array('cronjob_comment' => 'wakeup', 'http_url' => 'admin.elias-kuiter.de')),
    );
    
### Disable Heroku

Point a cronjob to `elias-kuiter.de/scale.php?quantity=1&pass=...` to enable and one to `?quantity=0&pass=...`
to disable the Heroku app. Adjust the points of time to those in `TIME_FRAME` and `$additionalCronjobs` above.
When disabled, Heroku will redirect to OpenShift.

### More

Make sure these files exist on `http://elias-kuiter.de`:

    .htaccess
    index.php
    redirect.html
    scale.php
    i/empty.gif
    i/favicon.ico
    i/ich.jpg
