import path from 'path'

import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import webpack, { DefinePlugin, IgnorePlugin } from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

import { BuildMode, BuildOptions } from './types'
import { PUBLIC_ROUTES } from '../../src/consts'

export const buildPlugins = ({ mode, paths, analyzer, platform, url }: BuildOptions): webpack.Configuration['plugins'] => {
  const isDevelopment = mode === BuildMode.DEVELOPMENT
  const isProduction = mode === BuildMode.PRODUCTION

  const plugins: webpack.Configuration['plugins'] = [
    // Use public/index.html as template for build
    new HtmlWebpackPlugin({
      template: paths.html,
      favicon: path.resolve(paths.public, 'favicon.ico')
    }),
    // Replace global env vars into used variables
    new DefinePlugin({
      PLATFORM: JSON.stringify(platform),
      PUBLIC_ROUTES: JSON.stringify(PUBLIC_ROUTES),
      API_BASE_URL: JSON.stringify(url),
      MODE: JSON.stringify(mode)
    }),
    new IgnorePlugin({
      resourceRegExp: /locales/,
      contextRegExp: /public/
    })
  ]
  if (isDevelopment) {
    // Used to display the construction progress as a percentage
    plugins.push(new webpack.ProgressPlugin())
    // Do ts validation as separate process without slowing down the build process
    plugins.push(new ForkTsCheckerWebpackPlugin())
    // Enable hot reloading
    plugins.push(new ReactRefreshWebpackPlugin())
    // Linter
    plugins.push(
      new ESLintPlugin({
        extensions: ['js', 'jsx', 'ts', 'tsx']
      })
    )
  }

  if (isProduction) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css'
      })
    )
    plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(paths.public, 'assets'),
            to: path.resolve(paths.output, 'assets')
          },
          {
            from: path.resolve(paths.public, 'fonts'),
            to: path.resolve(paths.output, 'fonts')
          }
        ]
      })
    )
  }

  if (analyzer) {
    plugins.push(new BundleAnalyzerPlugin())
  }

  return plugins
}
