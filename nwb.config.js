module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'MyLib',
      externals: {
        react: 'React'
      }
    }
  },
  webpack: {
    html: {
      template: 'demo/src/index.html',
      mountId: 'app',
      title: 'dropdown'
    },
    styles: {
      css: [
        {
          include: /\.css$/,
          exclude: /\.module\.css$/,
          css: {
            modules: false,
          }
        },
        {
          include: /\.module\.css$/,
          css: {
            modules: true,
          }
        },
      ]
    }
  }
}
