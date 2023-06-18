import { Prisma, Swot } from '@prisma/client';
import {SwotRepository} from '../repositories/swot-repository';
import { prisma } from '../lib/prisma';

export class PrismaSwotRepository implements SwotRepository {
    async findById(id: string) {
        const swot = await prisma.swot.findUnique({
            where: {
                    id,
                }
        })
        return swot;
    }
    async create(data: Prisma.SwotCreateInput){
        const swot = await prisma.swot.create({data});

        return swot;
    }

}