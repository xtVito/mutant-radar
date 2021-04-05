import App from "./app";

function main() {
  App.app.listen(process.env.PORT, () => {
    console.log(`server port: ${process.env.PORT}`);
  });
}

main();