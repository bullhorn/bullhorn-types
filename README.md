# Bullhorn-Types

[![Build Status](https://github.com/bullhorn/bullhorn-types/workflows/Build/badge.svg?branch=master)](https://github.com/bullhorn/bullhorn-types/actions/)
[![npm version](https://badge.fury.io/js/%40bullhorn%2Fbullhorn-types.svg)](https://badge.fury.io/js/%40bullhorn%2Fbullhorn-types)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

Typescript Interfaces for the Bullhorn REST Api

## Setup

```bash
npm install @bullhorn/bullhorn-types
```

## Usage

```typescript
import { EntityTypes, Candidate } from "@bullhorn/bullhorn-types";

console.log(EntityTypes.Candidate === "Candidate"); // outputs: true

let person: Candidate = {
  firstName: "John",
  lastName: "smith"
};
```

## Build from Meta using the Bullhorn CLI

```bash
# Clone this repo
git clone git@github.com:bullhorn/bullhorn-types.git
cd bullhorn-types
npm install

# create directory where tool will generate file
mkdir typings 

# Login into the Bullhorn Environment
npx bullhorn config set environment http://<qabox>-backend.bh-bos2.bullhorn.com:8182
npx bullhorn auth login

# Generate the typings file
npx bullhorn typings generate
```

## Deploy

GitHub Actions will build a deploy to NPM when you push to master with appropriate [Semantice Release](https://github.com/semantic-release/semantic-release) messages.
