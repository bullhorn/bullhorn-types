# Bullhorn-Types

<div align="center">
[![Build Status](https://travis-ci.org/bullhorn/bullhorn-types.svg?branch=master)](https://travis-ci.org/bullhorn/bullhorn-types)
[![npm version](https://badge.fury.io/js/%40bullhorn%2Fbullhorn-types.svg)](https://badge.fury.io/js/%40bullhorn%2Fbullhorn-types)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
</div>

Entity Utils and Typescript Interfaces for the Bullhorn REST Api


## Setup

```bash
npm install -g @bullhorn/bullhorn-types
```
## Usage

```typescript
import { EntityTypes, Candidate } from '@bullhorn/bullhorn-types';

console.log(EntityTypes.Candidate === 'Candidate'); // outputs: true

let person:Candidate = { 
    firstName: 'John',
    lastName: 'smith'
};

```

