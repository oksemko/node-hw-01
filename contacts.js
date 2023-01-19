const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const currentContact = contacts.find(({ id }) => id === contactId);
  if (!currentContact) {
    return null;
  }
  return currentContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const newContacts = JSON.stringify(
    contacts.filter(({ id }) => id !== contactId)
  );
  await fs.writeFile(contactsPath, newContacts);
}
// const newContacts = contacts.findIndex((contact) => contact.id === contactId);

// if (newContacts === -1) {
//   return null;
// }

//  const [removeContact] = contacts.splice(newContacts, 1);
//  updateContacts(contacts);

//  return removeContact;

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const id = require("nanoid").nanoid();
  const newContacts = JSON.stringify(
    [...contacts, { id, name, email, phone }],
    null,
    2
  );
  await fs.writeFile(contactsPath, newContacts);
}

const contactsOperations = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

module.exports = contactsOperations;
