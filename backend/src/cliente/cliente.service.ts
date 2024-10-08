import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClienteService{
    constructor(
        @InjectRepository(Cliente)
        private readonly clienteRepository:Repository<Cliente>,
    ){}

    async create(createClientepDto:CreateClienteDto){
        const cliente = this.clienteRepository.create(createClientepDto);
        return await this.clienteRepository.save(cliente);
    }

    async findAll(){
        return await this.clienteRepository.find();
    }

    async findOne(idCliente: string){
        try{
            const cliente=await this.clienteRepository.findOne({
                where: { idCliente },
            });

            if(!cliente){
                throw new NotFoundException(
                    `Cliente con el id ${idCliente} no encontrado.`,
                );
            }

            return cliente;
        }catch (error){
            if(error instanceof NotFoundException){
                throw error;
            }

            throw new BadRequestException('El ID proporcionado no es valido');
        }
    }

    async update(
        idCliente:string,
        updateClienteDto:UpdateClienteDto,
    ){
        const cliente = this.clienteRepository.update(
            idCliente,
            updateClienteDto,
        );

        if ((await cliente).affected===0){
            throw new NotFoundException(
                `Cliente con el id ${idCliente} no encontrado`,
              );
        }

        return this.clienteRepository.findOne({ where: {idCliente} });
    }

    async remove(idCliente: string) {
        console.log(idCliente);
    
        const cliente =
          await this.clienteRepository.softDelete(idCliente);
    
        if ((await cliente).affected === 0) {
          throw new NotFoundException(
            `Cliente con el id ${idCliente} no encontrada.`,
          );
        }
    
        return { message: `Cliente con el id ${idCliente} eliminada.` };
      }
}