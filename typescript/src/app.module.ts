import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RequestIdMiddleware } from "./middlewares/logger.middleware";
import { ImageService } from "./images/services/image.service";

@Module({
  controllers: [AppController],
  providers: [AppService, ImageService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply( RequestIdMiddleware)
      .forRoutes("*");
  }
}
