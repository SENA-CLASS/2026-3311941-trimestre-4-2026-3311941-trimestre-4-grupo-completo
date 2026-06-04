package co.edu.sena.service.impl;

import co.edu.sena.domain.CourseStatus;
import co.edu.sena.repository.CourseStatusRepository;
import co.edu.sena.service.CourseStatusService;
import co.edu.sena.service.dto.CourseStatusDTO;
import co.edu.sena.service.mapper.CourseStatusMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.CourseStatus}.
 */
@Service
public class CourseStatusServiceImpl implements CourseStatusService {

    private static final Logger LOG = LoggerFactory.getLogger(CourseStatusServiceImpl.class);

    private final CourseStatusRepository courseStatusRepository;

    private final CourseStatusMapper courseStatusMapper;

    public CourseStatusServiceImpl(CourseStatusRepository courseStatusRepository, CourseStatusMapper courseStatusMapper) {
        this.courseStatusRepository = courseStatusRepository;
        this.courseStatusMapper = courseStatusMapper;
    }

    @Override
    public CourseStatusDTO save(CourseStatusDTO courseStatusDTO) {
        LOG.debug("Request to save CourseStatus : {}", courseStatusDTO);
        CourseStatus courseStatus = courseStatusMapper.toEntity(courseStatusDTO);
        courseStatus = courseStatusRepository.save(courseStatus);
        return courseStatusMapper.toDto(courseStatus);
    }

    @Override
    public CourseStatusDTO update(CourseStatusDTO courseStatusDTO) {
        LOG.debug("Request to update CourseStatus : {}", courseStatusDTO);
        CourseStatus courseStatus = courseStatusMapper.toEntity(courseStatusDTO);
        courseStatus = courseStatusRepository.save(courseStatus);
        return courseStatusMapper.toDto(courseStatus);
    }

    @Override
    public Optional<CourseStatusDTO> partialUpdate(CourseStatusDTO courseStatusDTO) {
        LOG.debug("Request to partially update CourseStatus : {}", courseStatusDTO);

        return courseStatusRepository
            .findById(courseStatusDTO.getId())
            .map(existingCourseStatus -> {
                courseStatusMapper.partialUpdate(existingCourseStatus, courseStatusDTO);

                return existingCourseStatus;
            })
            .map(courseStatusRepository::save)
            .map(courseStatusMapper::toDto);
    }

    @Override
    public Page<CourseStatusDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all CourseStatuses");
        return courseStatusRepository.findAll(pageable).map(courseStatusMapper::toDto);
    }

    @Override
    public Optional<CourseStatusDTO> findOne(String id) {
        LOG.debug("Request to get CourseStatus : {}", id);
        return courseStatusRepository.findById(id).map(courseStatusMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete CourseStatus : {}", id);
        courseStatusRepository.deleteById(id);
    }
}
