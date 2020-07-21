const djangoSettings = function (
  projectName: string,
  appName: string,
  corsWhitelist: string[] = [],
  pageSize: number = 25,
  jwtExpiration: number = 3600 * 12
) {
  return `
    import os
    import datetime

    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    SECRET_KEY = 'qh9s+kq4ef_y3mv9x_&6ik=2&s-=l=!8*m^r$+7sd^7awsfy^@'

    # SECURITY WARNING: don't run with debug turned on in production!
    DEBUG = True
    ALLOWED_HOSTS = ["*"]


    # Application definition

    INSTALLED_APPS = [
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
        'django_filters',
        'rest_framework',
        'rest_framework.authtoken',
        'corsheaders',
        'rest_framework_swagger',
        '${appName}'
    ]

    MIDDLEWARE = [
        'corsheaders.middleware.CorsMiddleware',
        'django.middleware.security.SecurityMiddleware',
        'django.contrib.sessions.middleware.SessionMiddleware',
        'django.middleware.common.CommonMiddleware',
        'django.middleware.csrf.CsrfViewMiddleware',
        'django.contrib.auth.middleware.AuthenticationMiddleware',
        'django.contrib.messages.middleware.MessageMiddleware',
        'django.middleware.clickjacking.XFrameOptionsMiddleware',
    ]

    ROOT_URLCONF = '${projectName}.urls'

    TEMPLATES = [
        {
            'BACKEND': 'django.template.backends.django.DjangoTemplates',
            'DIRS': [],
            'APP_DIRS': True,
            'OPTIONS': {
                'context_processors': [
                    'django.template.context_processors.debug',
                    'django.template.context_processors.request',
                    'django.contrib.auth.context_processors.auth',
                    'django.contrib.messages.context_processors.messages',
                ],
            },
        },
    ]

    WSGI_APPLICATION = '${projectName}.wsgi.application'


    # Database
    # https://docs.djangoproject.com/en/2.1/ref/settings/#databases

    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'postgres',
            'USER': os.environ['POSTGRES_USER'],
            'HOST': 'db',
            'PORT': 5432,
            'PASSWORD': os.environ['POSTGRES_PASSWORD']
        }
    }


    # Password validation
    # https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators

    AUTH_PASSWORD_VALIDATORS = [
        {
            'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
        },
    ]

    # Internationalization
    # https://docs.djangoproject.com/en/2.1/topics/i18n/

    LANGUAGE_CODE = 'en-US'

    TIME_ZONE = 'Europe/Istanbul'

    USE_I18N = True

    USE_L10N = True

    USE_TZ = True


    # Static files (CSS, JavaScript, Images)
    # https://docs.djangoproject.com/en/2.1/howto/static-files/

    STATIC_URL = '/static/'

    STATIC_URL = '/static/'
    STATIC_ROOT = '/var/www/yonetim.shop-wash.co/staticfiles/'

    MEDIA_URL = '/media/'
    MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

    # Cors Rules

    CORS_ORIGIN_WHITELIST = (
        ${corsWhitelist.map((adr) => `'${adr}'`).join(",")}
    )

    # REST settings

    REST_FRAMEWORK = {
        'DEFAULT_AUTHENTICATION_CLASSES': (
            'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
            'rest_framework.authentication.SessionAuthentication',
            'rest_framework.authentication.BasicAuthentication',
        ),
        'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],
        'PAGE_SIZE': ${pageSize},
        'TEST_REQUEST_DEFAULT_FORMAT': 'json'
    }

    # API Auth
    JWT_AUTH = {
        'JWT_ALLOW_REFRESH': True,
        'JWT_EXPIRATION_DELTA': datetime.timedelta(seconds=${jwtExpiration}),
        'JWT_PAYLOAD_HANDLER':
        '${appName}.utils.jwt_payload_handler',
    }
  `;
};

export { djangoSettings };
