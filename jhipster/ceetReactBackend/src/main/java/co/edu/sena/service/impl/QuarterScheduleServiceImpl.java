package co.edu.sena.service.impl;

import co.edu.sena.domain.QuarterSchedule;
import co.edu.sena.repository.QuarterScheduleRepository;
import co.edu.sena.service.QuarterScheduleService;
import co.edu.sena.service.dto.QuarterScheduleDTO;
import co.edu.sena.service.mapper.QuarterScheduleMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.QuarterSchedule}.
 */
@Service
public class QuarterScheduleServiceImpl implements QuarterScheduleService {

    private static final Logger LOG = LoggerFactory.getLogger(QuarterScheduleServiceImpl.class);

    private final QuarterScheduleRepository quarterScheduleRepository;

    private final QuarterScheduleMapper quarterScheduleMapper;

    public QuarterScheduleServiceImpl(QuarterScheduleRepository quarterScheduleRepository, QuarterScheduleMapper quarterScheduleMapper) {
        this.quarterScheduleRepository = quarterScheduleRepository;
        this.quarterScheduleMapper = quarterScheduleMapper;
    }

    @Override
    public QuarterScheduleDTO save(QuarterScheduleDTO quarterScheduleDTO) {
        LOG.debug("Request to save QuarterSchedule : {}", quarterScheduleDTO);
        QuarterSchedule quarterSchedule = quarterScheduleMapper.toEntity(quarterScheduleDTO);
        quarterSchedule = quarterScheduleRepository.save(quarterSchedule);
        return quarterScheduleMapper.toDto(quarterSchedule);
    }

    @Override
    public QuarterScheduleDTO update(QuarterScheduleDTO quarterScheduleDTO) {
        LOG.debug("Request to update QuarterSchedule : {}", quarterScheduleDTO);
        QuarterSchedule quarterSchedule = quarterScheduleMapper.toEntity(quarterScheduleDTO);
        quarterSchedule = quarterScheduleRepository.save(quarterSchedule);
        return quarterScheduleMapper.toDto(quarterSchedule);
    }

    @Override
    public Optional<QuarterScheduleDTO> partialUpdate(QuarterScheduleDTO quarterScheduleDTO) {
        LOG.debug("Request to partially update QuarterSchedule : {}", quarterScheduleDTO);

        return quarterScheduleRepository
            .findById(quarterScheduleDTO.getId())
            .map(existingQuarterSchedule -> {
                quarterScheduleMapper.partialUpdate(existingQuarterSchedule, quarterScheduleDTO);

                return existingQuarterSchedule;
            })
            .map(quarterScheduleRepository::save)
            .map(quarterScheduleMapper::toDto);
    }

    @Override
    public Page<QuarterScheduleDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all QuarterSchedules");
        return quarterScheduleRepository.findAll(pageable).map(quarterScheduleMapper::toDto);
    }

    public Page<QuarterScheduleDTO> findAllWithEagerRelationships(Pageable pageable) {
        return quarterScheduleRepository.findAllWithEagerRelationships(pageable).map(quarterScheduleMapper::toDto);
    }

    @Override
    public Optional<QuarterScheduleDTO> findOne(String id) {
        LOG.debug("Request to get QuarterSchedule : {}", id);
        return quarterScheduleRepository.findOneWithEagerRelationships(id).map(quarterScheduleMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete QuarterSchedule : {}", id);
        quarterScheduleRepository.deleteById(id);
    }
}
