# Repository pattern implementation using Node Express

<p>
by running the app, 
<br>
express web server will be up, also a service (db listener)
will be up,
which will listen to new emails and will try to send them.
</p>

<h4>
in order to run the app in dev env:
</h4>
<ul>
<li>run npm i</li>
<li>run npm start</li>
</ul>

<strong>add .env file with the following keys with your own values</strong>
<pre>
  PORT=3000
  DB_CONNECTION_STRING="mongodb://root:example@localhost:27017/express?authSource=admin"
  ACCESS_TOKEN_SECRET="secret"
  BASICAUTH_USERNAME="admin"
  BASICAUTH_PASSWORD="admin"
  INTERVAL=3000
  SOURCE_EMAIL="email@gmail.com"
  SOURCE_PASSWORD="passw0rd"
</pre>