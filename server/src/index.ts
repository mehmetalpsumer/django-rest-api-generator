import { app } from "./app";

const port = process.env.PORT || 3000; 
const start = async () => {
  app.listen(port, () => {
    console.log("Listening on " + port);
  });
};

start();
