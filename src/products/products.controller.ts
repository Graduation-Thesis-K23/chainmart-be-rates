import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { ProductsService } from "./products.service";

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern("rates.product.created")
  create(@Payload() createProductDto: any) {
    return this.productsService.create(createProductDto);
  }
}
