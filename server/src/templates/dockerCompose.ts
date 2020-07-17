const dockerComposeContent = function (port: number = 8080, dbUser: string = "postgres", dbPassword: string = "postgres") {
  return `
version: "3"

services:
  db:
    image: postgres
    environment:
      POSTGRES_USER: ${dbUser}
      POSTGRES_PASSWORD: ${dbPassword}
  dj:
    build: .
    environment:
      POSTGRES_USER: ${dbUser}
      POSTGRES_PASSWORD: ${dbPassword}
    command: bash -c "python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:${port}"
    volumes:
      - ./:/code
    ports:
      - "${port}:${port}"
    depends_on:
      - db
`;
};

export { dockerComposeContent };
