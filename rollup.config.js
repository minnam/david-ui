import uglify from 'rollup-plugin-uglify-es'
import babel from 'rollup-plugin-babel' 
import commonjs from 'rollup-plugin-commonjs'
import flow from 'rollup-plugin-flow'


const config = {
  entry: './src/index.js',
  external: ['react'],
  output: {
      format: 'umd',
      name: 'david-ui',
      globals: {
          react: "React"
      }
  },
  plugins: [
    flow(),
    babel({
        exclude: "node_modules/**"
    }),
    uglify()
  ],
}
export default config