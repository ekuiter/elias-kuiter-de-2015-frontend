# elias-kuiter-de

My website as of 2015, built with Meteor.

It is divided into 3 parts:
- the [frontend](http://ekuiter-www.herokuapp.com)
- the [backend](http://ekuiter-admin.herokuapp.com)
- and some code shared across front- and backend ([ekuiter:elias-kuiter-de-shared](https://atmospherejs.com/ekuiter/elias-kuiter-de-shared))

## Frontend

The frontend is mainly hosted on Heroku (ekuiter-www.herokuapp.com). A second installation on OpenShift exists
(http://www-ekuiter.rhcloud.com) which is active at night, when the Heroku app needs to recharge.

To deploy on Heroku, run:

    git push heroku master
   
As for OpenShift:

    ./release

Set the following environment variables:

    heroku config:set MONGO_URL=... ROOT_URL=http://ekuiter-www.herokuapp.com/ ERROR_PAGE_URL=http://elias-kuiter.de/redirect.html
    rhc env set MONGODB_URL=... REDIRECT_URL=http://ekuiter-www.herokuapp.com TIME_FRAME=6-23 --app www

Whenever the Heroku app is inactive, it uses ERROR_PAGE_URL to redirect the user to the OpenShift app (which is slower,
but does not idle).

The OpenShift redirects the user in the given `TIME_FRAME` back to Heroku. This ensures that the user always sticks to
Heroku when possible.

## Backend

The backend is hosted on Heroku (ekuiter-admin.herokuapp.com). The database is a free MongoLab sandbox provided
by Heroku. To deploy, run:

    git push heroku master
    
When setting up, remember to set `MONGO_URL` and `ROOT_URL`:

    heroku config:set MONGO_URL=... ROOT_URL=http://ekuiter-admin.herokuapp.com/

Follow the instructions on ekuiter-admin.herokuapp.com to configure GitHub OAuth. Login is restricted to my
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

Create two cronjobs that keep Heroku from idling, pointing to ekuiter-www.herokuapp.com and ekuiter-admin.herokuapp.com
(every 30 minutes).

I use [kasapi-auto-cronjobs](https://github.com/ekuiter/kasapi-auto-cronjobs) to deactivate these cronjobs at night:

    $additionalCronjobs = array(
      array(6, 24, array('cronjob_comment' => 'wakeup', 'http_url' => 'ekuiter-www.herokuapp.com')),
      array(9, 22, array('cronjob_comment' => 'wakeup', 'http_url' => 'ekuiter-admin.herokuapp.com')),
    );
    
### Disable Heroku

Point a cronjob to `elias-kuiter.de/scale.php?quantity=1&pass=...` to enable and one to `?quantity=0&pass=...`
to disable the Heroku app. Adjust the points of time to those in `TIME_FRAME` and `$additionalCronjobs` above.
When disabled, Heroku will redirect to OpenShift.

### More

Make sure elias-kuiter.de/redirect.html and elias-kuiter.de/i/favicon.ico exist. 