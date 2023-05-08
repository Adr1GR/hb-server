import supertest from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

import { createServer } from "../../src/utils/server";
import userServices from "../../src/persistence/services/user/userServices";

const app = createServer();

const registerPayload = {
  name: "testName",
  email: "testemail@test.com",
  password: "testPassword",
  confirmPassword: "testPassword",
};

//@ts-ignore
let  userId = mongoose.Types.ObjectId().toString(); // generate new ObjectId and convert to string

export const userPayload = {  
  _id: userId,
  name: "testName",
  surname: "testSurname",
  email: "testemail@test.com",
  password: "testPassword",
  location: {
    street: "testStreet",
    city: "testCity",
    state: "testState",
    postalCode: "testPostalCode",
    country: "testCountry",
    address: "testAddress",
  },
  phoneNumber: "testPhoneNumber",
  profilePic: "testProfilePic",
  date: new Date(),
  farm: "testFarm",
}

beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("userRoutes", () => {
  beforeAll(async () => {
    const user = await userServices.createUserRequest(
      userPayload.name,
      userPayload.email,
      userPayload.password
    );
    userId = user._id;
  });

  describe("get user by id", () => {
    describe("given a user that exist", () => {
      it("should return a 200 status and the user", async () => {
        const { body, statusCode } = await supertest(app)
          .get(`/api/user/${userId}`)
          .expect(200);
        expect(statusCode).toBe(200);
        expect(body._id).toBe(userId);
      });
    });

    describe("given a user that does not exist", () => {
      it("should return a 404 status", async () => {
        const _id = new mongoose.Types.ObjectId().toString();
        await supertest(app).get(`/api/user/${_id}`).expect(404);
      });
    });
  });
});
