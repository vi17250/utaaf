import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { validationSchema } from "./configuration.schema";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RequestIdMiddleware } from "./middlewares/logger.middleware";
import { ImageService } from "./images/services/image.service";
import { SocketService } from "./unix_socket/socket.service";

@Module({
  controllers: [AppController],
  imports: [ConfigModule.forRoot({
    envFilePath: "../.env",
    validationSchema
  })],
  providers: [AppService, ImageService, SocketService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestIdMiddleware)
      .forRoutes("*");
  }
}
