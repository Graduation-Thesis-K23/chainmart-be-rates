import { Module } from "@nestjs/common";
import { RatesService } from "./rates.service";
import { RatesController } from "./rates.controller";
import { Rate } from "./entities/rate.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Rate])],
  controllers: [RatesController],
  providers: [RatesService],
})
export class RatesModule {}
