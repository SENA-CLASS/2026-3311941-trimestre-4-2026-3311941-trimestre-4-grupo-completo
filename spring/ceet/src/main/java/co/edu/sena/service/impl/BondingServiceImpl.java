package co.edu.sena.service.impl;

import co.edu.sena.domain.Bonding;
import co.edu.sena.repository.BondingRepository;
import co.edu.sena.service.BondingService;
import co.edu.sena.service.dto.BondingDTO;
import co.edu.sena.service.mapper.BondingMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.Bonding}.
 */
@Service
public class BondingServiceImpl implements BondingService {

    private static final Logger LOG = LoggerFactory.getLogger(BondingServiceImpl.class);

    private final BondingRepository bondingRepository;

    private final BondingMapper bondingMapper;

    public BondingServiceImpl(BondingRepository bondingRepository, BondingMapper bondingMapper) {
        this.bondingRepository = bondingRepository;
        this.bondingMapper = bondingMapper;
    }

    @Override
    public BondingDTO save(BondingDTO bondingDTO) {
        LOG.debug("Request to save Bonding : {}", bondingDTO);
        Bonding bonding = bondingMapper.toEntity(bondingDTO);
        bonding = bondingRepository.save(bonding);
        return bondingMapper.toDto(bonding);
    }

    @Override
    public BondingDTO update(BondingDTO bondingDTO) {
        LOG.debug("Request to update Bonding : {}", bondingDTO);
        Bonding bonding = bondingMapper.toEntity(bondingDTO);
        bonding = bondingRepository.save(bonding);
        return bondingMapper.toDto(bonding);
    }

    @Override
    public Optional<BondingDTO> partialUpdate(BondingDTO bondingDTO) {
        LOG.debug("Request to partially update Bonding : {}", bondingDTO);

        return bondingRepository
            .findById(bondingDTO.getId())
            .map(existingBonding -> {
                bondingMapper.partialUpdate(existingBonding, bondingDTO);

                return existingBonding;
            })
            .map(bondingRepository::save)
            .map(bondingMapper::toDto);
    }

    @Override
    public Page<BondingDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all Bondings");
        return bondingRepository.findAll(pageable).map(bondingMapper::toDto);
    }

    @Override
    public Optional<BondingDTO> findOne(String id) {
        LOG.debug("Request to get Bonding : {}", id);
        return bondingRepository.findById(id).map(bondingMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete Bonding : {}", id);
        bondingRepository.deleteById(id);
    }
}
