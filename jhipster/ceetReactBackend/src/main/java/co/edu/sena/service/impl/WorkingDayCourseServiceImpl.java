package co.edu.sena.service.impl;

import co.edu.sena.domain.WorkingDayCourse;
import co.edu.sena.repository.WorkingDayCourseRepository;
import co.edu.sena.service.WorkingDayCourseService;
import co.edu.sena.service.dto.WorkingDayCourseDTO;
import co.edu.sena.service.mapper.WorkingDayCourseMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.WorkingDayCourse}.
 */
@Service
public class WorkingDayCourseServiceImpl implements WorkingDayCourseService {

    private static final Logger LOG = LoggerFactory.getLogger(WorkingDayCourseServiceImpl.class);

    private final WorkingDayCourseRepository workingDayCourseRepository;

    private final WorkingDayCourseMapper workingDayCourseMapper;

    public WorkingDayCourseServiceImpl(
        WorkingDayCourseRepository workingDayCourseRepository,
        WorkingDayCourseMapper workingDayCourseMapper
    ) {
        this.workingDayCourseRepository = workingDayCourseRepository;
        this.workingDayCourseMapper = workingDayCourseMapper;
    }

    @Override
    public WorkingDayCourseDTO save(WorkingDayCourseDTO workingDayCourseDTO) {
        LOG.debug("Request to save WorkingDayCourse : {}", workingDayCourseDTO);
        WorkingDayCourse workingDayCourse = workingDayCourseMapper.toEntity(workingDayCourseDTO);
        workingDayCourse = workingDayCourseRepository.save(workingDayCourse);
        return workingDayCourseMapper.toDto(workingDayCourse);
    }

    @Override
    public WorkingDayCourseDTO update(WorkingDayCourseDTO workingDayCourseDTO) {
        LOG.debug("Request to update WorkingDayCourse : {}", workingDayCourseDTO);
        WorkingDayCourse workingDayCourse = workingDayCourseMapper.toEntity(workingDayCourseDTO);
        workingDayCourse = workingDayCourseRepository.save(workingDayCourse);
        return workingDayCourseMapper.toDto(workingDayCourse);
    }

    @Override
    public Optional<WorkingDayCourseDTO> partialUpdate(WorkingDayCourseDTO workingDayCourseDTO) {
        LOG.debug("Request to partially update WorkingDayCourse : {}", workingDayCourseDTO);

        return workingDayCourseRepository
            .findById(workingDayCourseDTO.getId())
            .map(existingWorkingDayCourse -> {
                workingDayCourseMapper.partialUpdate(existingWorkingDayCourse, workingDayCourseDTO);

                return existingWorkingDayCourse;
            })
            .map(workingDayCourseRepository::save)
            .map(workingDayCourseMapper::toDto);
    }

    @Override
    public Page<WorkingDayCourseDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all WorkingDayCourses");
        return workingDayCourseRepository.findAll(pageable).map(workingDayCourseMapper::toDto);
    }

    @Override
    public Optional<WorkingDayCourseDTO> findOne(String id) {
        LOG.debug("Request to get WorkingDayCourse : {}", id);
        return workingDayCourseRepository.findById(id).map(workingDayCourseMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete WorkingDayCourse : {}", id);
        workingDayCourseRepository.deleteById(id);
    }
}
