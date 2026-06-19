package co.edu.sena.service.impl;

import co.edu.sena.domain.BondingCompetence;
import co.edu.sena.repository.BondingCompetenceRepository;
import co.edu.sena.service.BondingCompetenceService;
import co.edu.sena.service.dto.BondingCompetenceDTO;
import co.edu.sena.service.mapper.BondingCompetenceMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.BondingCompetence}.
 */
@Service
public class BondingCompetenceServiceImpl implements BondingCompetenceService {

    private static final Logger LOG = LoggerFactory.getLogger(BondingCompetenceServiceImpl.class);

    private final BondingCompetenceRepository bondingCompetenceRepository;

    private final BondingCompetenceMapper bondingCompetenceMapper;

    public BondingCompetenceServiceImpl(
        BondingCompetenceRepository bondingCompetenceRepository,
        BondingCompetenceMapper bondingCompetenceMapper
    ) {
        this.bondingCompetenceRepository = bondingCompetenceRepository;
        this.bondingCompetenceMapper = bondingCompetenceMapper;
    }

    @Override
    public BondingCompetenceDTO save(BondingCompetenceDTO bondingCompetenceDTO) {
        LOG.debug("Request to save BondingCompetence : {}", bondingCompetenceDTO);
        BondingCompetence bondingCompetence = bondingCompetenceMapper.toEntity(bondingCompetenceDTO);
        bondingCompetence = bondingCompetenceRepository.save(bondingCompetence);
        return bondingCompetenceMapper.toDto(bondingCompetence);
    }

    @Override
    public BondingCompetenceDTO update(BondingCompetenceDTO bondingCompetenceDTO) {
        LOG.debug("Request to update BondingCompetence : {}", bondingCompetenceDTO);
        BondingCompetence bondingCompetence = bondingCompetenceMapper.toEntity(bondingCompetenceDTO);
        bondingCompetence = bondingCompetenceRepository.save(bondingCompetence);
        return bondingCompetenceMapper.toDto(bondingCompetence);
    }

    @Override
    public Optional<BondingCompetenceDTO> partialUpdate(BondingCompetenceDTO bondingCompetenceDTO) {
        LOG.debug("Request to partially update BondingCompetence : {}", bondingCompetenceDTO);

        return bondingCompetenceRepository
            .findById(bondingCompetenceDTO.getId())
            .map(existingBondingCompetence -> {
                bondingCompetenceMapper.partialUpdate(existingBondingCompetence, bondingCompetenceDTO);

                return existingBondingCompetence;
            })
            .map(bondingCompetenceRepository::save)
            .map(bondingCompetenceMapper::toDto);
    }

    @Override
    public Page<BondingCompetenceDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all BondingCompetences");
        return bondingCompetenceRepository.findAll(pageable).map(bondingCompetenceMapper::toDto);
    }

    @Override
    public Optional<BondingCompetenceDTO> findOne(String id) {
        LOG.debug("Request to get BondingCompetence : {}", id);
        return bondingCompetenceRepository.findById(id).map(bondingCompetenceMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete BondingCompetence : {}", id);
        bondingCompetenceRepository.deleteById(id);
    }
}
