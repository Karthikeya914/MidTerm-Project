this project allows you to fetch songs across all genres by artist name, song name or movie name using spotify's user search api
to make use of this you should run the following command in your terminal
the command which needs to be run  in the terminal:
     curl -X POST "https://accounts.spotify.com/api/token" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -u "SPOTIFY_CLIENTID:SPOTIFY_CLIENT_SECRET" \
     -d "grant_type=client_credentials" 
To test the project you can use these credentials which are from an unused account
SPOTIFY_CLIENT_ID: a23f8505075f458284c5c073706f7d4f
SPOTIFY_CLIENT_SECRET: 1b64abd76e054ce4995d91cc8a25cca9
make sure you replace the client id an client secret in this line of command : -u "SPOTIFY_CLIENTID:SPOTIFY_CLIENT_SECRET" \
after running this code in the terminal you will get an access token from spotify which u need to paste in the script code 
after pasting, run the html code you will be able to fetch songs using this project.
