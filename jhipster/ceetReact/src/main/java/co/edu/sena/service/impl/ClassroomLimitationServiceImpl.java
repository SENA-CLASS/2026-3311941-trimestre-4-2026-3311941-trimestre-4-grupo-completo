package co.edu.sena.service.impl;

import co.edu.sena.domain.ClassroomLimitation;
import co.edu.sena.repository.ClassroomLimitationRepository;
import co.edu.sena.service.ClassroomLimitationService;
import co.edu.sena.service.dto.ClassroomLimitationDTO;
import co.edu.sena.service.mapper.ClassroomLimitationMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.ClassroomLimitation}.
 */
@Service
public class ClassroomLimitationServiceImpl implements ClassroomLimitationService {

    private static final Logger LOG = LoggerFactory.getLogger(ClassroomLimitationServiceImpl.class);

    private final ClassroomLimitationRepository classroomLimitationRepository;

    private final ClassroomLimitationMapper classroomLimitationMapper;

    public ClassroomLimitationServiceImpl(
        ClassroomLimitationRepository classroomLimitationRepository,
        ClassroomLimitationMapper classroomLimitationMapper
    ) {
        this.classroomLimitationRepository = classroomLimitationRepository;
        this.classroomLimitationMapper = classroomLimitationMapper;
    }

    @Override
    public ClassroomLimitationDTO save(ClassroomLimitationDTO classroomLimitationDTO) {
        LOG.debug("Request to save ClassroomLimitation : {}", classroomLimitationDTO);
        ClassroomLimitation classroomLimitation = classroomLimitationMapper.toEntity(classroomLimitationDTO);
        classroomLimitation = classroomLimitationRepository.save(classroomLimitation);
        return classroomLimitationMapper.toDto(classroomLimitation);
    }

    @Override
    public ClassroomLimitationDTO update(ClassroomLimitationDTO classroomLimitationDTO) {
        LOG.debug("Request to update ClassroomLimitation : {}", classroomLimitationDTO);
        ClassroomLimitation classroomLimitation = classroomLimitationMapper.toEntity(classroomLimitationDTO);
        classroomLimitation = classroomLimitationRepository.save(classroomLimitation);
        return classroomLimitationMapper.toDto(classroomLimitation);
    }

    @Override
    public Optional<ClassroomLimitationDTO> partialUpdate(ClassroomLimitationDTO classroomLimitationDTO) {
        LOG.debug("Request to partially update ClassroomLimitation : {}", classroomLimitationDTO);

        return classroomLimitationRepository
            .findById(classroomLimitationDTO.getId())
            .map(existingClassroomLimitation -> {
                classroomLimitationMapper.partialUpdate(existingClassroomLimitation, classroomLimitationDTO);

                return existingClassroomLimitation;
            })
            .map(classroomLimitationRepository::save)
            .map(classroomLimitationMapper::toDto);
    }

    @Override
    public Page<ClassroomLimitationDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all ClassroomLimitations");
        return classroomLimitationRepository.findAll(pageable).map(classroomLimitationMapper::toDto);
    }

    @Override
    public Optional<ClassroomLimitationDTO> findOne(String id) {
        LOG.debug("Request to get ClassroomLimitation : {}", id);
        return classroomLimitationRepository.findById(id).map(classroomLimitationMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete ClassroomLimitation : {}", id);
        classroomLimitationRepository.deleteById(id);
    }
}
