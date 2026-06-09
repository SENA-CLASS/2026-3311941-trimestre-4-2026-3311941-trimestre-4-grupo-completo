package co.edu.sena.service.impl;

import co.edu.sena.domain.CoursePlanning;
import co.edu.sena.repository.CoursePlanningRepository;
import co.edu.sena.service.CoursePlanningService;
import co.edu.sena.service.dto.CoursePlanningDTO;
import co.edu.sena.service.mapper.CoursePlanningMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.CoursePlanning}.
 */
@Service
public class CoursePlanningServiceImpl implements CoursePlanningService {

    private static final Logger LOG = LoggerFactory.getLogger(CoursePlanningServiceImpl.class);

    private final CoursePlanningRepository coursePlanningRepository;

    private final CoursePlanningMapper coursePlanningMapper;

    public CoursePlanningServiceImpl(CoursePlanningRepository coursePlanningRepository, CoursePlanningMapper coursePlanningMapper) {
        this.coursePlanningRepository = coursePlanningRepository;
        this.coursePlanningMapper = coursePlanningMapper;
    }

    @Override
    public CoursePlanningDTO save(CoursePlanningDTO coursePlanningDTO) {
        LOG.debug("Request to save CoursePlanning : {}", coursePlanningDTO);
        CoursePlanning coursePlanning = coursePlanningMapper.toEntity(coursePlanningDTO);
        coursePlanning = coursePlanningRepository.save(coursePlanning);
        return coursePlanningMapper.toDto(coursePlanning);
    }

    @Override
    public CoursePlanningDTO update(CoursePlanningDTO coursePlanningDTO) {
        LOG.debug("Request to update CoursePlanning : {}", coursePlanningDTO);
        CoursePlanning coursePlanning = coursePlanningMapper.toEntity(coursePlanningDTO);
        coursePlanning = coursePlanningRepository.save(coursePlanning);
        return coursePlanningMapper.toDto(coursePlanning);
    }

    @Override
    public Optional<CoursePlanningDTO> partialUpdate(CoursePlanningDTO coursePlanningDTO) {
        LOG.debug("Request to partially update CoursePlanning : {}", coursePlanningDTO);

        return coursePlanningRepository
            .findById(coursePlanningDTO.getId())
            .map(existingCoursePlanning -> {
                coursePlanningMapper.partialUpdate(existingCoursePlanning, coursePlanningDTO);

                return existingCoursePlanning;
            })
            .map(coursePlanningRepository::save)
            .map(coursePlanningMapper::toDto);
    }

    @Override
    public Page<CoursePlanningDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all CoursePlannings");
        return coursePlanningRepository.findAll(pageable).map(coursePlanningMapper::toDto);
    }

    public Page<CoursePlanningDTO> findAllWithEagerRelationships(Pageable pageable) {
        return coursePlanningRepository.findAllWithEagerRelationships(pageable).map(coursePlanningMapper::toDto);
    }

    @Override
    public Optional<CoursePlanningDTO> findOne(String id) {
        LOG.debug("Request to get CoursePlanning : {}", id);
        return coursePlanningRepository.findOneWithEagerRelationships(id).map(coursePlanningMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete CoursePlanning : {}", id);
        coursePlanningRepository.deleteById(id);
    }
}
