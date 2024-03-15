# Skyflow App for Zendesk

Client side app for Ticket view.

## Why?

It is often required to store requester information in regions that correspond to their residency. For instance, a requester might actually reside in EU while the Zendesk tenant and customer could be in US. Skyflow allows to store the requester information in a Vault that resides in EU and lets Zendesk store the tokenized values for reference. This can be detokenized using a client side app. Skyflow will also allow the applcation of governance rules to enforce that only Zendesk agents in EU can access the EU requester details

## The components:

- iframe for app
- detokenize node module to call Skyflow APIs

## Pre-requisites

- Skyflow Vault
- API keys to access Skyflow Vault APIs (Service account with permissions to detokenize in PLAIN_TEXT)

## Steps

### Starting the app

cd assets
npx @zendesk/zcli apps:server

### Starting the detokenize service

cd backend
node detokenize
