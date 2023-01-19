const { Command } = require("commander");

const contactsOperations = require("./contacts");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsOperations.listContacts();
      console.table(contacts);

      break;

    case "get":
      const contact = await contactsOperations.getContactById(id);
      console.log(`contact with id=${id}`, contact);

      break;

    case "add":
      await contactsOperations.addContact(name, email, phone);
      console.log(
        `Conatct with name=${name}, email=${email}, phone=${phone} was added`
      );
      break;

    case "remove":
      await contactsOperations.removeContact(id);
      console.log(`Contact with id=${id} was removed`);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
(async () => {
  await invokeAction(argv);
})();
