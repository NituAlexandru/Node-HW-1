import { Command } from "commander";
import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} from "./contacts.js";

const program = new Command();

program.version("0.0.1").description("Contact management system");

program.command("list").description("List all contacts").action(listContacts);

program
  .command("get")
  .description("Get a contact by ID")
  .requiredOption("-i, --id <id>", "Contact ID")
  .action((cmd) => getContactById(cmd.id));

program
  .command("add")
  .description("Add a new contact")
  .requiredOption("-n, --name <name>", "Contact name")
  .requiredOption("-e, --email <email>", "Contact email")
  .requiredOption("-p, --phone <phone>", "Contact phone")
  .action((cmd) => addContact(cmd.name, cmd.email, cmd.phone));

program
  .command("remove")
  .description("Remove a contact")
  .requiredOption("-i, --id <id>", "Contact ID")
  .action((cmd) => removeContact(cmd.id));

program.parse(process.argv);
