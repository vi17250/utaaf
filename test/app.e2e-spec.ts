import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('<!DOCTYPE html>\n' +
      '<html>\n' +
      '    <head>\n' +
      '        <title>Le titre de ma page HTML</title>\n' +
      '    </head>\n' +
      '    <body>\n' +
      '        <h1>utaaf 🐶</h1>\n' +
      '        <p>Url To Ascii Art Format</p>\n' +
      '    </body>\n' +
      '</html>');
  });

  it('/other-path (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('<!DOCTYPE html>\n' +
      '<html>\n' +
      '    <head>\n' +
      '        <title>Le titre de ma page HTML</title>\n' +
      '    </head>\n' +
      '    <body>\n' +
      '        <h1>utaaf 🐶</h1>\n' +
      '        <p>Url To Ascii Art Format</p>\n' +
      '    </body>\n' +
      '</html>');
  });
});
