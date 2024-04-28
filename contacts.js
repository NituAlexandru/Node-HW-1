import fs from "fs/promises";
import path from "path";

// Calea către fișierul contacts.json
const contactsPath = path.join(process.cwd(), "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, { encoding: "utf8" });
    const contacts = JSON.parse(data);

    // Asigură-te că fiecare contact are toate cheile necesare
    const allKeys = ["id", "name", "email", "phone"]; // Cheile așteptate
    const contactsEnhanced = contacts.map((contact) => {
      allKeys.forEach((key) => {
        if (!contact.hasOwnProperty(key)) {
          contact[key] = "N/A"; // Atribuie o valoare implicită dacă cheia lipsește
        }
      });
      return contact;
    });

    console.table(contactsEnhanced);
  } catch (err) {
    console.error("Error reading file:", err);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    const contact = contacts.find((contact) => contact.id === contactId);
    if (contact) {
      console.table(contact);
    } else {
      console.log("Contact not found.");
    }
  } catch (err) {
    console.error(err);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    let contacts = JSON.parse(data);
    const initialLength = contacts.length;
    contacts = contacts.filter((contact) => contact.id !== contactId);
    if (contacts.length < initialLength) {
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      console.log("Contact deleted");
    } else {
      console.log("Contact not found.");
    }
  } catch (err) {
    console.error(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    const newContact = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log("Contact added");
  } catch (err) {
    console.error(err);
  }
}

export { listContacts, getContactById, removeContact, addContact };
