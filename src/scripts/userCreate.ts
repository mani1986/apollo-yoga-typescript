import boot from '../boot'
import auth from '../lib/auth'

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const userCreate = () => {
  rl.question("Full name: ", (fullName:string) => {
    rl.question("Email: ", async (email:string) => {
      const password = auth.getRandomPassword();

      try {
        const res = await auth.createUser(
          fullName,
          email,
          password
        );

        console.log(res)

        // @todo Mani, email temp password to user?

        console.log(
          `User with id ${res._id} created ${fullName} (${email}), temporary password:`,
          `\x1b[33m${password}\x1b[0m`
        );
      } catch (e) {
        console.error(e)
      }

      rl.close();
    });
  });
};

boot.start().then(userCreate)

rl.on("close", function() {
  process.exit(0);
});
