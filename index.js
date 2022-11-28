const tmi = require('tmi.js')
require('dotenv').config()

const HALF_A_SECOND = 500

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
})

const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs))

const sayPole = async () => {
  await sleep(HALF_A_SECOND)
  client.say(channel, `!pole`)
  console.log('Oli threw pole!')
  process.exit()
}

client.connect();

client.on('message', (channel, tags, message, self) => {
  const author = tags['display-name'].trim().toLowerCase()
  const messageContent = message.trim()
  const hasOliThrownPole = author === 'olivernabani' && messageContent === '!pole'

  if (hasOliThrownPole) sayPole()
});
		