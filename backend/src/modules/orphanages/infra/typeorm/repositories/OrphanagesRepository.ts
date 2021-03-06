import { getRepository, Repository } from 'typeorm';

import ICreateOrphanageDTO from '@modules/orphanages/dtos/ICreateOrphanageDTO';
import IOrphanagesRepository from '@modules/orphanages/repositories/IOrphanagesRepository';

import Orphanage from '../entities/Orphanage';

class OrphanagesRepository implements IOrphanagesRepository {
  private ormRepository: Repository<Orphanage>;

  constructor() {
    this.ormRepository = getRepository(Orphanage);
  }

  public async create({
    name,
    about,
    instructions,
    latitude,
    longitude,
    openOnWeekends,
    openingHours,
    images,
  }: ICreateOrphanageDTO): Promise<Orphanage> {
    const orphanage = this.ormRepository.create({
      name,
      about,
      instructions,
      latitude,
      longitude,
      openingHours,
      openOnWeekends,
      images,
    });

    await this.ormRepository.save(orphanage);

    return orphanage;
  }

  public async list(): Promise<Orphanage[]> {
    const orphanages = await this.ormRepository.find({
      relations: ['images'],
    });

    return orphanages;
  }

  public async findOne(id: number): Promise<Orphanage | undefined> {
    const orphanage = await this.ormRepository.findOne(id, {
      relations: ['images'],
    });

    return orphanage;
  }
}

export default OrphanagesRepository;
