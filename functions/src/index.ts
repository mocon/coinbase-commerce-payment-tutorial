import * as functions from 'firebase-functions'
import { Client, Webhook, resources } from 'coinbase-commerce-node'
const cors = require('cors')({ origin: '*' })

const coinbaseSecret: string = functions.config().coinbase_commerce.key
const signingSecret: string = functions.config().coinbase_commerce.secret
Client.init(coinbaseSecret)
const { Charge } = resources

type ChargeData = {
  name: string
  description: string
  local_price: {
    amount: number
    currency: string
  }
  pricing_type: 'no_price' | 'fixed_price'
  metadata: {
    user: string
  }
}

// Endpoint to create cryptocurrency charge
exports.createCharge = functions.https.onRequest(
  (req: functions.https.Request, res: functions.Response) => {
    cors(req, res, async () => {
      // TODO: Get real product data from database
      const chargeData: ChargeData = {
        name: 'Widget',
        description: 'Useless widget',
        local_price: {
          amount: 0.99,
          currency: 'USD',
        },
        pricing_type: 'fixed_price',
        metadata: {
          user: 'myles',
        },
      }

      // @ts-expect-error
      const charge = await Charge.create(chargeData)
      console.log(charge)

      res.send(charge)
    })
  }
)

// Handle webhooks to check payment status
exports.webhookHandler = functions.https.onRequest(
  async (req: functions.https.Request, res: functions.Response) => {
    const rawBody = req.rawBody.toString()
    const signature = req.headers['x-cc-webhook-signature']

    try {
      // @ts-expect-error
      const event = Webhook.verifyEventBody(rawBody, signature, signingSecret)
      functions.logger.info(event)

      if (event.type === 'charge:pending') {
        // TODO
        // user paid, but transaction not confirm on blockchain yet
      }

      if (event.type === 'charge:confirmed') {
        // TODO
        // all good, charge confirmed
      }

      if (event.type === 'charge:failed') {
        // TODO
        // charge failed or expired
      }

      res.send(`success ${event.id}`)
    } catch (error) {
      functions.logger.error(error)
      res.status(400).send('failure!')
    }
  }
)
