package co.edu.sena.service.impl;

import co.edu.sena.domain.BondingInstructor;
import co.edu.sena.repository.BondingInstructorRepository;
import co.edu.sena.service.BondingInstructorService;
import co.edu.sena.service.dto.BondingInstructorDTO;
import co.edu.sena.service.mapper.BondingInstructorMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.BondingInstructor}.
 */
@Service
public class BondingInstructorServiceImpl implements BondingInstructorService {

    private static final Logger LOG = LoggerFactory.getLogger(BondingInstructorServiceImpl.class);

    private final BondingInstructorRepository bondingInstructorRepository;

    private final BondingInstructorMapper bondingInstructorMapper;

    public BondingInstructorServiceImpl(
        BondingInstructorRepository bondingInstructorRepository,
        BondingInstructorMapper bondingInstructorMapper
    ) {
        this.bondingInstructorRepository = bondingInstructorRepository;
        this.bondingInstructorMapper = bondingInstructorMapper;
    }

    @Override
    public BondingInstructorDTO save(BondingInstructorDTO bondingInstructorDTO) {
        LOG.debug("Request to save BondingInstructor : {}", bondingInstructorDTO);
        BondingInstructor bondingInstructor = bondingInstructorMapper.toEntity(bondingInstructorDTO);
        bondingInstructor = bondingInstructorRepository.save(bondingInstructor);
        return bondingInstructorMapper.toDto(bondingInstructor);
    }

    @Override
    public BondingInstructorDTO update(BondingInstructorDTO bondingInstructorDTO) {
        LOG.debug("Request to update BondingInstructor : {}", bondingInstructorDTO);
        BondingInstructor bondingInstructor = bondingInstructorMapper.toEntity(bondingInstructorDTO);
        bondingInstructor = bondingInstructorRepository.save(bondingInstructor);
        return bondingInstructorMapper.toDto(bondingInstructor);
    }

    @Override
    public Optional<BondingInstructorDTO> partialUpdate(BondingInstructorDTO bondingInstructorDTO) {
        LOG.debug("Request to partially update BondingInstructor : {}", bondingInstructorDTO);

        return bondingInstructorRepository
            .findById(bondingInstructorDTO.getId())
            .map(existingBondingInstructor -> {
                bondingInstructorMapper.partialUpdate(existingBondingInstructor, bondingInstructorDTO);

                return existingBondingInstructor;
            })
            .map(bondingInstructorRepository::save)
            .map(bondingInstructorMapper::toDto);
    }

    @Override
    public Page<BondingInstructorDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all BondingInstructors");
        return bondingInstructorRepository.findAll(pageable).map(bondingInstructorMapper::toDto);
    }

    public Page<BondingInstructorDTO> findAllWithEagerRelationships(Pageable pageable) {
        return bondingInstructorRepository.findAllWithEagerRelationships(pageable).map(bondingInstructorMapper::toDto);
    }

    @Override
    public Optional<BondingInstructorDTO> findOne(String id) {
        LOG.debug("Request to get BondingInstructor : {}", id);
        return bondingInstructorRepository.findOneWithEagerRelationships(id).map(bondingInstructorMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete BondingInstructor : {}", id);
        bondingInstructorRepository.deleteById(id);
    }
}
