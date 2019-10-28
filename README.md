# PokedexAlexaSkill
PokedexAlexaSkill is an Alexa skill built with Node.js that enables users to look up a Pokédex description for any species of Pokémon.

PokedexAlexaSkill is available for free on the Alexa Skill Store as [Pokedex (Unofficial)](https://www.amazon.com/Matthew-Chartier-Pokedex-Unofficial/dp/B01JVU935W). Try it out on any Alexa-enabled device.

## Setup

### Install Dependencies
Install dependencies before building the project and running tests.

```
yarn install
```

### Build
The 'build' script runs the TypeScript compiles and outputs build artifacts into the 'dist' directory.

```
yarn run build
```

### Test
The 'test' script uses jest to execute a suite of unit tests.

```
yarn run test
```

### Pack
The 'pack' script packages built artifacts and bundled dependencies in a zip file that can be deployed to AWS Lambda.

```
yarn run pack
```