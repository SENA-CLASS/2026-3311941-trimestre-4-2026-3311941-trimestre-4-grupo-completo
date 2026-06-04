package co.edu.sena.service.impl;

import co.edu.sena.domain.CurrentQuarter;
import co.edu.sena.repository.CurrentQuarterRepository;
import co.edu.sena.service.CurrentQuarterService;
import co.edu.sena.service.dto.CurrentQuarterDTO;
import co.edu.sena.service.mapper.CurrentQuarterMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.CurrentQuarter}.
 */
@Service
public class CurrentQuarterServiceImpl implements CurrentQuarterService {

    private static final Logger LOG = LoggerFactory.getLogger(CurrentQuarterServiceImpl.class);

    private final CurrentQuarterRepository currentQuarterRepository;

    private final CurrentQuarterMapper currentQuarterMapper;

    public CurrentQuarterServiceImpl(CurrentQuarterRepository currentQuarterRepository, CurrentQuarterMapper currentQuarterMapper) {
        this.currentQuarterRepository = currentQuarterRepository;
        this.currentQuarterMapper = currentQuarterMapper;
    }

    @Override
    public CurrentQuarterDTO save(CurrentQuarterDTO currentQuarterDTO) {
        LOG.debug("Request to save CurrentQuarter : {}", currentQuarterDTO);
        CurrentQuarter currentQuarter = currentQuarterMapper.toEntity(currentQuarterDTO);
        currentQuarter = currentQuarterRepository.save(currentQuarter);
        return currentQuarterMapper.toDto(currentQuarter);
    }

    @Override
    public CurrentQuarterDTO update(CurrentQuarterDTO currentQuarterDTO) {
        LOG.debug("Request to update CurrentQuarter : {}", currentQuarterDTO);
        CurrentQuarter currentQuarter = currentQuarterMapper.toEntity(currentQuarterDTO);
        currentQuarter = currentQuarterRepository.save(currentQuarter);
        return currentQuarterMapper.toDto(currentQuarter);
    }

    @Override
    public Optional<CurrentQuarterDTO> partialUpdate(CurrentQuarterDTO currentQuarterDTO) {
        LOG.debug("Request to partially update CurrentQuarter : {}", currentQuarterDTO);

        return currentQuarterRepository
            .findById(currentQuarterDTO.getId())
            .map(existingCurrentQuarter -> {
                currentQuarterMapper.partialUpdate(existingCurrentQuarter, currentQuarterDTO);

                return existingCurrentQuarter;
            })
            .map(currentQuarterRepository::save)
            .map(currentQuarterMapper::toDto);
    }

    @Override
    public Page<CurrentQuarterDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all CurrentQuarters");
        return currentQuarterRepository.findAll(pageable).map(currentQuarterMapper::toDto);
    }

    public Page<CurrentQuarterDTO> findAllWithEagerRelationships(Pageable pageable) {
        return currentQuarterRepository.findAllWithEagerRelationships(pageable).map(currentQuarterMapper::toDto);
    }

    @Override
    public Optional<CurrentQuarterDTO> findOne(String id) {
        LOG.debug("Request to get CurrentQuarter : {}", id);
        return currentQuarterRepository.findOneWithEagerRelationships(id).map(currentQuarterMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete CurrentQuarter : {}", id);
        currentQuarterRepository.deleteById(id);
    }
}
