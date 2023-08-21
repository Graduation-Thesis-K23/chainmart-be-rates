import { Controller } from "@nestjs/common";
import { EventPattern, MessagePattern, Payload } from "@nestjs/microservices";
import { RatesService } from "./rates.service";

@Controller()
export class RatesController {
  constructor(private readonly ratesService: RatesService) {}

  @MessagePattern("rates.health-check")
  async healthCheck() {
    console.log("rates.health-check received");
    return "rates service is working";
  }

  @MessagePattern("rates.getratesbyusername")
  getRatesByUsername(@Payload() username: string) {
    return this.ratesService.getRatesByUsername(username);
  }

  @MessagePattern("rates.getratesbyproductid")
  getRatesByProductId(@Payload() productId: string) {
    return this.ratesService.getRatesByProductId(productId);
  }

  @MessagePattern("rates.get-star-by-ids")
  getStarByIds(@Payload() data: any) {
    return this.ratesService.getStarByIds(data.ids);
  }

  @EventPattern("rates.rated")
  async rated(@Payload() data: any) {
    return this.ratesService.rated(data);
  }
}
