import { Note, User } from "@prisma/client";

export const testUsers: User[] = [
  {
    id: "1",
    firstName: "Michael",
    lastName: "Hatay",
    email: "test@test.com",
    registeredAt: new Date(),
  },
  {
    id: "2",
    firstName: "Dohal",
    lastName: "Mitas",
    email: "test2@test.com",
    registeredAt: new Date(),
  },
];

export const testNotes: Note[] = [
  {
    id: "1",
    authorId: testUsers[0].id,
    text: "Testing note 1",
    createdAt: new Date(),
    updatedAt: new Date(),
    orderNumber: 1,
  },
  {
    id: "2",
    authorId: testUsers[0].id,
    text: "Lorem ipsum how are you",
    createdAt: new Date(),
    updatedAt: new Date(),
    orderNumber: 2,
  },
  {
    id: "3",
    authorId: testUsers[1].id,
    text: "Testing note 3",
    createdAt: new Date(),
    updatedAt: new Date(),
    orderNumber: 1,
  },
];
