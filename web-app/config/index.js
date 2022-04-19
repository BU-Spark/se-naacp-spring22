import developmentConfig from './development';
import stagingConfig from './staging';
import productionConfig from './production';

const environment = process.env.NODE_ENV;
const development = process.env.NODE_ENV === 'development';
const production = process.env.NODE_ENV === 'production';

let environmentConfig;
switch (environment) {
  case 'development':
    environmentConfig = developmentConfig;
    break;
  case 'staging':
    environmentConfig = stagingConfig;
    break;
  case 'production':
    environmentConfig = productionConfig;
    break;
  default:
    environmentConfig = developmentConfig;
    break;
}
console.log({ environmentConfig, developmentConfig });
const configuration = { ...environmentConfig, isProduction: production, isDevelopment: development };
export default configuration;
