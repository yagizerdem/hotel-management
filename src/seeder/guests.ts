import GuestModel, { type GuestDocument } from "@models/guest";
import UserModel from "@models/user";
import { chance, faker, fakerEN, hashPassword, nationalId, pick, slug } from "@seeder/utils";

const FOREIGN_NATIONALITIES = ["DE", "GB", "RU", "NL", "UA", "PL"];

export async function seedGuests(count: number) {
  const usedNationalIds = new Set<string>();

  const guests = Array.from({ length: count }, () => {
    const isForeign = chance(0.25);
    const names = isForeign ? fakerEN : faker;
    const sex = pick(["female", "male"] as const);
    const firstName = names.person.firstName(sex);
    const lastName = names.person.lastName();

    let id: string | undefined;
    if (!isForeign) {
      do {
        id = nationalId();
      } while (usedNationalIds.has(id));
      usedNationalIds.add(id);
    }

    return {
      firstName,
      lastName,
      nationalId: id,
      passportNumber: isForeign ? faker.string.alphanumeric({ length: 9, casing: "upper" }) : undefined,
      nationality: isForeign ? pick(FOREIGN_NATIONALITIES) : "TR",
      gender: sex,
      birthDate: faker.date.birthdate({ min: 18, max: 80, mode: "age" }),
      phone: names.phone.number(),
      email: `${slug(firstName, lastName)}@${faker.internet.domainName()}`,
      address: isForeign
        ? `${fakerEN.location.streetAddress()}, ${fakerEN.location.city()}`
        : `${faker.location.streetAddress()}, ${faker.location.city()}`,
    };
  });

  return GuestModel.insertMany(guests);
}

/**
 * Web accounts for some of the guests. Each account is linked to its guest
 * record both ways.
 */
export async function seedCustomers(guests: GuestDocument[], password: string) {
  const passwordHash = hashPassword(password);

  const users = await UserModel.insertMany(
    guests.map((guest, index) => ({
      email: `${slug(guest.firstName, guest.lastName)}.${index + 1}@example.com`,
      passwordHash,
      role: "customer",
      firstName: guest.firstName,
      lastName: guest.lastName,
      phone: guest.phone,
      emailVerifiedAt: chance(0.9) ? faker.date.past({ years: 2 }) : undefined,
      marketingOptIn: chance(0.6),
      guest: guest._id,
    })),
  );

  await GuestModel.bulkWrite(
    users.map((user) => ({
      updateOne: { filter: { _id: user.guest }, update: { $set: { user: user._id } } },
    })),
  );

  return users;
}
