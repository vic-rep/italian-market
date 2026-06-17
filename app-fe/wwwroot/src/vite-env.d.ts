/// <reference types="vite/client" />

declare module '*.topo.json' {
  const value: import('topojson-specification').Topology
  export default value
}
