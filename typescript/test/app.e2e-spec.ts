import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { App } from "supertest/types";
import { AppModule } from "./../src/app.module";

describe("AppController (e2e)", () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/ (GET)", async () => {
    const response = await request(app.getHttpServer())
      .get("/")
      .expect(200)
      .expect("Content-Type", /html/);
    expect(response.text).toContain('<form action="/" method="post">');
    expect(response.text).toContain(
      '<label for="url">Enter a image URL:</label>',
    );
    expect(response.text).toContain(
      '<input type="text" id="url" name="incoming_value" />',
    );
    expect(response.text).toContain('<input type="submit" value="Submit">');
  });

  it("/bad-path (GET)", () => {
    return request(app.getHttpServer())
      .get("/bad-path")
      .expect(404);
  });

  it("/ (POST)", async () => {
    const response = await request(app.getHttpServer())
      .post("/")
      .send({ incoming_value: "https://github.com/vi17250/utaaf/" })
      .expect(201);
    expect(response.text).toContain("https://github.com/vi17250/utaaf/");
  });

  it("/ (POST) a bad value", async () => {
    await request(app.getHttpServer())
      .post("/")
      .send({ incoming_value: "i_m_not_a_url" })
      .expect(400);
  });
});
