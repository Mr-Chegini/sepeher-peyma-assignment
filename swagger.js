import swaggerJsdoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Sepeher Peyma Assignment Documentation",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
};

const options = {
  swaggerDefinition,
  failOnErrors: true,
  apis: ["./index.route.js", "./api/routes/user.route.js"],
};

const openapiSpecification = swaggerJsdoc(options);

export default openapiSpecification;
