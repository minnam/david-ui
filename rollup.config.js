import uglify from 'rollup-plugin-uglify-es'
import babel from 'rollup-plugin-babel' 
import commonjs from 'rollup-plugin-commonjs';

const config = {
  input: 'src/index.js',
  external: ['react'],
  output: {
      format: 'umd',
      name: 'david-ui',
      globals: {
          react: "React"
      }
  },
  plugins: [
    babel({
        exclude: "node_modules/**"
    }),
    uglify()
  ],
}
export default config