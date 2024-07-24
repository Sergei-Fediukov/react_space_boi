import { BuildMode, BuildOptions } from '../types/index'

export function buildBabelLoader({ mode }: BuildOptions) {
  // const isDevelopment = mode === BuildMode.DEVELOPMENT
  const plugins = ['babel-plugin-macros']

  return {
    test: /\.m?tsx$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-typescript',
          [
            '@babel/preset-react',
            {
              // runtime: isDevelopment ? 'automatic' : 'classic'
              runtime: 'automatic'
            }
          ]
        ],
        plugins: plugins.length ? plugins : []
      }
    }
  }
}
