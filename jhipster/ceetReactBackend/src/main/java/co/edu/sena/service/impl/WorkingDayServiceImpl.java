package co.edu.sena.service.impl;

import co.edu.sena.domain.WorkingDay;
import co.edu.sena.repository.WorkingDayRepository;
import co.edu.sena.service.WorkingDayService;
import co.edu.sena.service.dto.WorkingDayDTO;
import co.edu.sena.service.mapper.WorkingDayMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.WorkingDay}.
 */
@Service
public class WorkingDayServiceImpl implements WorkingDayService {

    private static final Logger LOG = LoggerFactory.getLogger(WorkingDayServiceImpl.class);

    private final WorkingDayRepository workingDayRepository;

    private final WorkingDayMapper workingDayMapper;

    public WorkingDayServiceImpl(WorkingDayRepository workingDayRepository, WorkingDayMapper workingDayMapper) {
        this.workingDayRepository = workingDayRepository;
        this.workingDayMapper = workingDayMapper;
    }

    @Override
    public WorkingDayDTO save(WorkingDayDTO workingDayDTO) {
        LOG.debug("Request to save WorkingDay : {}", workingDayDTO);
        WorkingDay workingDay = workingDayMapper.toEntity(workingDayDTO);
        workingDay = workingDayRepository.save(workingDay);
        return workingDayMapper.toDto(workingDay);
    }

    @Override
    public WorkingDayDTO update(WorkingDayDTO workingDayDTO) {
        LOG.debug("Request to update WorkingDay : {}", workingDayDTO);
        WorkingDay workingDay = workingDayMapper.toEntity(workingDayDTO);
        workingDay = workingDayRepository.save(workingDay);
        return workingDayMapper.toDto(workingDay);
    }

    @Override
    public Optional<WorkingDayDTO> partialUpdate(WorkingDayDTO workingDayDTO) {
        LOG.debug("Request to partially update WorkingDay : {}", workingDayDTO);

        return workingDayRepository
            .findById(workingDayDTO.getId())
            .map(existingWorkingDay -> {
                workingDayMapper.partialUpdate(existingWorkingDay, workingDayDTO);

                return existingWorkingDay;
            })
            .map(workingDayRepository::save)
            .map(workingDayMapper::toDto);
    }

    @Override
    public Page<WorkingDayDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all WorkingDays");
        return workingDayRepository.findAll(pageable).map(workingDayMapper::toDto);
    }

    public Page<WorkingDayDTO> findAllWithEagerRelationships(Pageable pageable) {
        return workingDayRepository.findAllWithEagerRelationships(pageable).map(workingDayMapper::toDto);
    }

    @Override
    public Optional<WorkingDayDTO> findOne(String id) {
        LOG.debug("Request to get WorkingDay : {}", id);
        return workingDayRepository.findOneWithEagerRelationships(id).map(workingDayMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete WorkingDay : {}", id);
        workingDayRepository.deleteById(id);
    }
}
