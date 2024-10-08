import { PartialType } from '@nestjs/swagger';
import { CreateTipoGeneralDto } from './create-tipo-general.dto';

export class UpdateTipoGeneralDto extends PartialType(CreateTipoGeneralDto) {}
