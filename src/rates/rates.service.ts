import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Rate } from "./entities/rate.entity";
import { RatedDto } from "./dto/rated.dto";

@Injectable()
export class RatesService {
  constructor(
    @InjectRepository(Rate)
    private readonly rateRepository: Repository<Rate>,
  ) {}

  async getRatesByUsername(username: string) {
    try {
      const rates = await this.rateRepository.find({
        where: { username },
        relations: {
          product: true,
          user: true,
        },
      });
      return rates;
    } catch (error) {
      console.log("getRatesByUsername", error);
      return [];
    }
  }

  async getRatesByProductId(productId: string) {
    try {
      const rates = await this.rateRepository.find({
        where: { product_id: productId },
        relations: {
          product: true,
          user: true,
        },
      });
      return rates;
    } catch (error) {
      console.log("getRatesByProductId", error);
      return [];
    }
  }

  async rated(data: RatedDto) {
    try {
      console.log("rated", data);

      const rate = this.rateRepository.create(data);
      await this.rateRepository.save(rate);
    } catch (error) {
      console.log("rated", error);
      return null;
    }
  }
}
