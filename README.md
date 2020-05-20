# Bullhorn-Types

<div align="center">

[![Build Status](https://travis-ci.org/bullhorn/bullhorn-types.svg?branch=master)](https://travis-ci.org/bullhorn/bullhorn-types)
[![npm version](https://badge.fury.io/js/%40bullhorn%2Fbullhorn-types.svg)](https://badge.fury.io/js/%40bullhorn%2Fbullhorn-types)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

</div>

Entity Utils and Typescript Interfaces for the Bullhorn REST Api

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

## Build & Deploy

```bash
# Clone this repo
git clone git@github.com:bullhorn/bullhorn-types.git
cd bullhorn-types

# Install the Bullhorn CLI tool globally
npm install -g @bullhorn/bullhorn-cli

# Login into the Bullhorn Environment
bullhorn config set environment http://qabox-backend:8182
bullhorn auth login

# Generate the typings file
bullhorn typings generate
```

Travis will build a deploy to NPM when you push to master with appropriate [Semantice Release](https://github.com/semantic-release/semantic-release) messages.
