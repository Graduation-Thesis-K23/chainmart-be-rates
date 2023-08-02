import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { UsersService } from "./users.service";

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @EventPattern("rates.signin")
  create(@Payload() createUserDto: any) {
    return this.usersService.create(createUserDto);
  }
}
