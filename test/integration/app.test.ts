import {} from 'jest';
import * as supertest from "supertest";

const request = supertest("http://localhost:8080");

describe("GET /random-url", () => {
  it("should return 404", () => {
    return request.get("/i-am-batman")
      .expect(404);
  });
});
