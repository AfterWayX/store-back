import { ConfigService, IEnvConfig } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(() => {
    service = new ConfigService();
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validate input', () => {
    it('should be defined', () => {
      expect(service.validateInput).toBeDefined();
    });

    it('should return valdiatedEnvConfig', () => {
      const schemaSpy = jest.spyOn(service.schema, 'validate').mockReturnValue({
        error: undefined,
        value: 'any',
      });
      const payload: IEnvConfig = {
        PORT: 3,
        NODE_ENV: 'test',
        DOT_DEBUG: true,
        SENTRY_DSN: '4',
        SEARCH_API: 'search',
        PARSERS_API: 'parsers',
        API_URL: 'api',
        DOMAIN_URL: 'https://qorporates.com',
        FILES_URL: 'https://files.qorporates.com',

        POSTGRES_DB: 'gateway',
        POSTGRES_HOST: 'localhost',
        POSTGRES_PASSWORD: 'postgres',
        POSTGRES_PORT: 5432,
        POSTGRES_USER: 'postgres',
        POSTGRES_SYNC: true,

        MINIO_ENDPOINT: 'localhost',
        MINIO_SSL: false,
        MINIO_ACCESS_KEY: '7',
        MINIO_SECRET_KEY: '8',

        SMTP_HOST: 'smtp.yandex.ru',
        SMTP_PORT: 565,
        SMTP_SECURE: true,
        SMTP_AUTH_USER: 'user@qorporates.com',
        SMTP_AUTH_PASS: 'pass',
        SMTP_TLS_REJECT_UNAUTHORIZED: false,

        JWT_ACCESS_TOKEN_SECRET: 'secret',
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: '60s',

        JWT_REFRESH_TOKEN_SECRET: 'secret',
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: '60s',

        JWT_VERIFICATION_TOKEN_SECRET: 'SECRET',
        JWT_VERIFICATION_TOKEN_EXPIRATION_TIME: '60s',

        JWT_FORGOT_PASSWORD_TOKEN_EXPIRATION_TIME: '60s',

        GOOGLE_CLIENT_ID: 'id',
        GOOGLE_CLIENT_SECRET: 'secret',
        GOOGLE_REDIRECT_URI: 'redirect',
        GOOGLE_SCOPES: `["a","b"]`,
        GOOGLE_FRONTEND_REDIRECT_URI: 'google/frontend/redirect',

        GOOGLE_RECAPTCHA_SECRET: 'secret',
        GOOGLE_RECAPTCHA_DISABLED: false,
      };

      const response = service.validateInput(payload);

      expect(response).toEqual('any');
      expect(schemaSpy).toHaveBeenCalledTimes(1);
      expect(schemaSpy).toHaveBeenCalledWith(payload);
    });

    it('should throw error', () => {
      const schemaSpy = jest.spyOn(service.schema, 'validate').mockReturnValue({
        error: { message: 'error' },
        value: 'any',
      } as never);
      const payload: IEnvConfig = {
        PORT: 3,
        NODE_ENV: 'test',
        DOT_DEBUG: true,
        SENTRY_DSN: '4',
        SEARCH_API: 'search',
        PARSERS_API: 'parsers',
        API_URL: 'api',
        DOMAIN_URL: 'https://qorporates.com/',
        FILES_URL: 'https://files.qorporates.com/',

        POSTGRES_DB: 'gateway',
        POSTGRES_HOST: 'localhost',
        POSTGRES_PASSWORD: 'postgres',
        POSTGRES_PORT: 5432,
        POSTGRES_USER: 'postgres',
        POSTGRES_SYNC: true,

        MINIO_ENDPOINT: 'localhost',
        MINIO_SSL: false,
        MINIO_ACCESS_KEY: '7',
        MINIO_SECRET_KEY: '8',

        SMTP_HOST: 'smtp.yandex.ru',
        SMTP_PORT: 565,
        SMTP_SECURE: true,
        SMTP_AUTH_USER: 'user@qorporates.com',
        SMTP_AUTH_PASS: 'pass',
        SMTP_TLS_REJECT_UNAUTHORIZED: false,

        JWT_ACCESS_TOKEN_SECRET: 'SECRET',
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: '60s',

        JWT_REFRESH_TOKEN_SECRET: 'SECRET',
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: '60S',

        JWT_VERIFICATION_TOKEN_SECRET: 'SECRET',
        JWT_VERIFICATION_TOKEN_EXPIRATION_TIME: '60s',

        JWT_FORGOT_PASSWORD_TOKEN_EXPIRATION_TIME: '60s',

        GOOGLE_CLIENT_ID: 'id',
        GOOGLE_CLIENT_SECRET: 'secret',
        GOOGLE_REDIRECT_URI: 'redirect',
        GOOGLE_SCOPES: `["a","b"]`,
        GOOGLE_FRONTEND_REDIRECT_URI: 'google/frontend/redirect',

        GOOGLE_RECAPTCHA_SECRET: 'secret',
        GOOGLE_RECAPTCHA_DISABLED: false,
      };
      const expected = new Error(`Config validation error: error`);

      expect(() => {
        service.validateInput(payload);
      }).toThrow(expected);

      expect(schemaSpy).toHaveBeenCalledTimes(1);
      expect(schemaSpy).toHaveBeenCalledWith(payload);
    });
  });

  it('should return port', () => {
    const response = service.port;

    expect(response).toEqual(6007);
  });

  it('should return search api', () => {
    const response = service.searchApi;

    expect(response).toEqual('https://staging-search.qorporates.com');
  });

  it('should return parsers api', () => {
    const response = service.parsersApi;

    expect(response).toEqual('http://localhost:6005');
  });

  it('should return api url', () => {
    const response = service.apiUrl;

    expect(response).toEqual('https://staging-api.qorporates.com');
  });

  it('should get email confirmation url', () => {
    const response = service.domainUrl;

    expect(response).toEqual('https://www.qorporates.com');
  });

  it('should get SMTPConfig', () => {
    const expected = {
      auth: {
        pass: 'pass',
        user: 'no-reply@qorporates.com',
      },
      host: 'smtp.yandex.ru',
      port: 465,
      secure: true,
      tls: {
        rejectUnauthorized: false,
      },
    };

    const response = service.SMTPConfig;

    expect(response).toEqual(expected);
  });

  it('should get minio config', () => {
    const rs = service.minioConfig;

    expect(rs).toEqual({
      accessKey: 'minio_access',
      endPoint: 'files.qorporates.com',
      secretKey: 'minio_secret',
      useSSL: true,
    });
  });

  it('should get domain url', () => {
    const rs = service.domainUrl;

    expect(rs).toEqual('https://www.qorporates.com');
  });

  it('should get files url', () => {
    const rs = service.filesUrl;

    expect(rs).toEqual('https://files.qorporates.com');
  });

  it('get postgres config', () => {
    const rs = service.postgresConfig;

    expect(rs).toEqual({
      database: 'gateway',
      host: 'localhost',
      password: 'postgres',
      port: 5432,
      synchronize: true,
      username: 'postgres',
    });
  });

  it('get jwt access config', () => {
    const rs = service.jwtAccessConfig;

    expect(rs).toEqual({
      expiresIn: '5m',
      secret: 'changeme',
    });
  });

  it('get jwt refresh config', () => {
    const rs = service.jwtRefreshConfig;

    expect(rs).toEqual({
      expiresIn: '1w',
      secret: 'changeme2',
    });
  });

  it('should return google oauth config', () => {
    const rs = service.googleOauthConfig;

    expect(rs).toEqual({
      callbackURL: 'https://staging-api.qorporates.com/auth/google-redirect',
      clientID: 'abcd.apps.googleusercontent.com',
      clientSecret: 'changeme',
      passReqToCallback: true,
      scope: ['profile', 'email'],
    });
  });

  it('should return google frontend redirect url', () => {
    const rs = service.googleFrontendRedirect;

    expect(rs).toEqual('login');
  });

  it('get jwt verification config', () => {
    const rs = service.jwtVerificationConfig;

    expect(rs).toEqual({
      expiresIn: '1d',
      secret: 'changeme',
    });
  });

  it('should get jwt forgot password expiration time', () => {
    const rs = service.jwtForgotPasswordExpirationTime;

    expect(rs).toEqual('1d');
  });

  it('should get recaptcha secret', () => {
    const rs = service.googleRecaptchaSecret;

    expect(rs).toEqual('changeme');
  });

  it('should get recaptcha disabled', () => {
    const rs = service.googleRecaptchaDisabled;

    expect(rs).toBeFalsy();
  });
});
