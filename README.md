# Coinbase Commerce payment tutorial

Testing out Coinbase Commerce for ecommerce payments with crypto.

## Serverless endpoints

- `createCharge` - Creates a new charge using hosted checkout form
- `webhookHandler` - Coinbase Commerce will ping this with transaction updates (`charge:pending`, `charge:confirmed`, `charge:failed`)

## Deploy

Deploy cloud functions to Firebase:

```
cd functions
firebase deploy
```
