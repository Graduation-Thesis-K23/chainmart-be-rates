import { Controller } from "@nestjs/common";
import { EventPattern, MessagePattern, Payload } from "@nestjs/microservices";
import { RatesService } from "./rates.service";

@Controller()
export class RatesController {
  constructor(private readonly ratesService: RatesService) {}

  @MessagePattern("rates.getratesbyusername")
  getRatesByUsername(@Payload() username: string) {
    return this.ratesService.getRatesByUsername(username);
  }

  @MessagePattern("rates.getratesbyproductid")
  getRatesByProductId(@Payload() productId: string) {
    return this.ratesService.getRatesByProductId(productId);
  }

  @EventPattern("rates.rated")
  async rated(@Payload() data: any) {
    return this.ratesService.rated(data);
  }
}
