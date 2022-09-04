# Vizyod

Get and display data from connected devices.

## Start app

In a terminal, run:
`npm run server`

And in another one:
`npm start`

## Get data from connector

### Config

First, create a `config.json` file:

`cp src/connectors/config-template.json src/connectors/config.json`

Then, edit it with the provider authentification info, e.g:

```
{
  "withings": {
    "client_id": "1234",
    "client_secret": "5678"
  }
}
```

### Get provider token

Run:
`npm run get-token`

This will prompt the provider authentication modal. Once you are authenticated, you should get a token automatically saved.

### Run connector

This command will import all the data:

`node src/connectors/withings/index.js`
