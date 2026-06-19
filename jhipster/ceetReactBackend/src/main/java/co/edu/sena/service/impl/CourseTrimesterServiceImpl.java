package co.edu.sena.service.impl;

import co.edu.sena.domain.CourseTrimester;
import co.edu.sena.repository.CourseTrimesterRepository;
import co.edu.sena.service.CourseTrimesterService;
import co.edu.sena.service.dto.CourseTrimesterDTO;
import co.edu.sena.service.mapper.CourseTrimesterMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.CourseTrimester}.
 */
@Service
public class CourseTrimesterServiceImpl implements CourseTrimesterService {

    private static final Logger LOG = LoggerFactory.getLogger(CourseTrimesterServiceImpl.class);

    private final CourseTrimesterRepository courseTrimesterRepository;

    private final CourseTrimesterMapper courseTrimesterMapper;

    public CourseTrimesterServiceImpl(CourseTrimesterRepository courseTrimesterRepository, CourseTrimesterMapper courseTrimesterMapper) {
        this.courseTrimesterRepository = courseTrimesterRepository;
        this.courseTrimesterMapper = courseTrimesterMapper;
    }

    @Override
    public CourseTrimesterDTO save(CourseTrimesterDTO courseTrimesterDTO) {
        LOG.debug("Request to save CourseTrimester : {}", courseTrimesterDTO);
        CourseTrimester courseTrimester = courseTrimesterMapper.toEntity(courseTrimesterDTO);
        courseTrimester = courseTrimesterRepository.save(courseTrimester);
        return courseTrimesterMapper.toDto(courseTrimester);
    }

    @Override
    public CourseTrimesterDTO update(CourseTrimesterDTO courseTrimesterDTO) {
        LOG.debug("Request to update CourseTrimester : {}", courseTrimesterDTO);
        CourseTrimester courseTrimester = courseTrimesterMapper.toEntity(courseTrimesterDTO);
        courseTrimester = courseTrimesterRepository.save(courseTrimester);
        return courseTrimesterMapper.toDto(courseTrimester);
    }

    @Override
    public Optional<CourseTrimesterDTO> partialUpdate(CourseTrimesterDTO courseTrimesterDTO) {
        LOG.debug("Request to partially update CourseTrimester : {}", courseTrimesterDTO);

        return courseTrimesterRepository
            .findById(courseTrimesterDTO.getId())
            .map(existingCourseTrimester -> {
                courseTrimesterMapper.partialUpdate(existingCourseTrimester, courseTrimesterDTO);

                return existingCourseTrimester;
            })
            .map(courseTrimesterRepository::save)
            .map(courseTrimesterMapper::toDto);
    }

    @Override
    public Page<CourseTrimesterDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all CourseTrimesters");
        return courseTrimesterRepository.findAll(pageable).map(courseTrimesterMapper::toDto);
    }

    public Page<CourseTrimesterDTO> findAllWithEagerRelationships(Pageable pageable) {
        return courseTrimesterRepository.findAllWithEagerRelationships(pageable).map(courseTrimesterMapper::toDto);
    }

    @Override
    public Optional<CourseTrimesterDTO> findOne(String id) {
        LOG.debug("Request to get CourseTrimester : {}", id);
        return courseTrimesterRepository.findOneWithEagerRelationships(id).map(courseTrimesterMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete CourseTrimester : {}", id);
        courseTrimesterRepository.deleteById(id);
    }
}
