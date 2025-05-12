const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

// Tu configuración personalizada (si tienes algo)
const config = {
    // Puedes poner aquí opciones personalizadas de Metro si las necesitas
};

// Combina la config por defecto y personalizada
const mergedConfig = mergeConfig(getDefaultConfig(__dirname), config);

// Envuélvelo con la configuración de Reanimated
module.exports = wrapWithReanimatedMetroConfig(mergedConfig);
