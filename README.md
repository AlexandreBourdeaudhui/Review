# Review

A serverless [Slack Slash Commands](https://api.slack.com/slash-commands) to get pull-requests from your repositories, that need to be reviewed. Using [AWS Lambda](https://aws.amazon.com/fr/lambda/), and [DynamoDB](https://aws.amazon.com/fr/dynamodb/).

## Getting Started

### Prerequisites

- Lastest [Node.js](https://nodejs.org) LTS
- Install [Serverless framework](https://www.serverless.com/framework/docs/getting-started/).
- Have an AWS account, and add the [AWS credentials](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/) on `~/.aws/credentials` file.
- Follow next steps

### Create GitHub token

- Create a [personnel access token](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token) with `repo` permission.
- View and copy the token to a temporary place. You'll need it later.

### Install on Slack

- Go to https://api.slack.com/apps/
- Click on `Create New App`
- Click on `From an app manifest`
- Select the workspace
- Choose `JSON` tab, and copy data from the `./manifest.json` file
- Review summary and create the app
- Install to Workspace
- Click on `OAuth & Permissions`, view and copy the token (`xoxb-XXXX`) to a temporary place. You'll need it later.

### Deploy

- Create an `.env` file and fill it with the properties of the` .env.example` file.
- `serverless deploy --stage prod`
- Once the deploy is successful, get the `endpoints` and update the `Request URL` of the Slash `/reviews` Command.

## Available commands

See the [help file](./src/commands/help.ts) for all available commands.
