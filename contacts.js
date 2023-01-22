const fs = require("fs").promises;
const path = require("path");
// const { nanoid } = import("nanoid");
// import { nanoid } from 'nanoid'
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

// Via listContacts we can read & get contacts from 'contacts.json'
async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);

  return contacts;
}

// Via getContactById we can get contacts from 'contacts.json'
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
  // const { nanoid } = import("nanoid");
  const newContact = { id: v4(), name, email, phone };

  contacts.push(newContact);

  updateContacts(contacts);

  return newContact;
}

const contactsOperations = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

module.exports = contactsOperations;
