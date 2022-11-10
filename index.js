const tmi = require('tmi.js')
require('dotenv').config()

const appEnv = process.env.APP_ENV
if (!appEnv) throw new Error('❌ Application environment is not defined.')
const oauthPassword = process.env.OAUTH_PASSWORD
if (!oauthPassword) throw new Error('❌ Twitch OAuth password is not defined.')

const client = new tmi.Client({
	options: { debug: appEnv === 'local' },
	identity: {
		username: 'totti619',
		password: oauthPassword
	},
	channels: [ 'olivernabani' ]
});

let fThrown = false

client.connect();

client.on('message', (channel, tags, message, self) => {
  const author = tags['display-name'].trim().toLowerCase()
  const messageContent = message.trim().toLowerCase()
	const authorIsOli = author === 'olivernabani'
  const authorIsMe = author === 'totti619'
  const hasOliThrownPole = authorIsOli && messageContent === '!pole'
  console.log({authorIsOli, authorIsMe, hasOliThrownPole})

  if (!poleThrown && hasOliThrownPole) {
    client.say(channel, `!pole`);
    console.log('Oli threw pole!')
    process.exit()
  }
});
		