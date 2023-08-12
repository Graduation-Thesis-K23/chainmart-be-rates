import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Rate } from "./entities/rate.entity";
import { RatedDto } from "./dto/rated.dto";

@Injectable()
export class RatesService {
  constructor(
    @InjectRepository(Rate)
    private readonly rateRepository: Repository<Rate>,
  ) {}

  async getRatesByUsername(username: string) {
    console.log("getRatesByUsername", username);
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
    console.log("getRatesByProductId", productId);
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

  async getStarByIds(ids: string[]) {
    console.log("getStarByIds", ids);

    try {
      const rates = await this.rateRepository.find({
        where: { product_id: In(ids) },
        select: ["product_id", "star"],
      });

      // avg star by product_id
      const avgStar = rates.reduce((acc, rate) => {
        if (!acc[rate.product_id]) {
          acc[rate.product_id] = [];
        }

        acc[rate.product_id].push(rate.star);

        return acc;
      }, {});

      const result = ids.reduce((acc, id) => {
        if (!avgStar[id]) {
          return acc;
        }

        const star = avgStar[id].reduce((acc, star) => acc + star, 0) / avgStar[id].length;

        acc.push({
          productId: id,
          star,
        });

        return acc;
      }, []);

      return result;
    } catch (error) {
      console.log("getStarByIds", error);
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
