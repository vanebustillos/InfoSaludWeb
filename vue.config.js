module.exports = {
  transpileDependencies: ["vuetify", "x5-gmaps"],
  chainWebpack: config => {
    config.module.rules.delete('eslint');
  }
};
