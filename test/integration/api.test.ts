import {} from 'jest';
import * as supertest from "supertest";

const request = supertest("http://localhost:8080");

describe("GET /articles", () => {
  it("should return 200 OK", () => {
    return request.get("/articles")
      .expect(200);
  });
});
