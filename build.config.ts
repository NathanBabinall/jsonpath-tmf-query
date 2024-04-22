import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/JSONPathQuery.ts',
  ],
  rollup: {
    emitCJS: true,
  },
  declaration: true,
})