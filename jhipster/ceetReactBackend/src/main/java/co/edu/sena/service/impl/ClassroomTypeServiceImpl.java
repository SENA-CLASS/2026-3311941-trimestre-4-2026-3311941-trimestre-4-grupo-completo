package co.edu.sena.service.impl;

import co.edu.sena.domain.ClassroomType;
import co.edu.sena.repository.ClassroomTypeRepository;
import co.edu.sena.service.ClassroomTypeService;
import co.edu.sena.service.dto.ClassroomTypeDTO;
import co.edu.sena.service.mapper.ClassroomTypeMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.ClassroomType}.
 */
@Service
public class ClassroomTypeServiceImpl implements ClassroomTypeService {

    private static final Logger LOG = LoggerFactory.getLogger(ClassroomTypeServiceImpl.class);

    private final ClassroomTypeRepository classroomTypeRepository;

    private final ClassroomTypeMapper classroomTypeMapper;

    public ClassroomTypeServiceImpl(ClassroomTypeRepository classroomTypeRepository, ClassroomTypeMapper classroomTypeMapper) {
        this.classroomTypeRepository = classroomTypeRepository;
        this.classroomTypeMapper = classroomTypeMapper;
    }

    @Override
    public ClassroomTypeDTO save(ClassroomTypeDTO classroomTypeDTO) {
        LOG.debug("Request to save ClassroomType : {}", classroomTypeDTO);
        ClassroomType classroomType = classroomTypeMapper.toEntity(classroomTypeDTO);
        classroomType = classroomTypeRepository.save(classroomType);
        return classroomTypeMapper.toDto(classroomType);
    }

    @Override
    public ClassroomTypeDTO update(ClassroomTypeDTO classroomTypeDTO) {
        LOG.debug("Request to update ClassroomType : {}", classroomTypeDTO);
        ClassroomType classroomType = classroomTypeMapper.toEntity(classroomTypeDTO);
        classroomType = classroomTypeRepository.save(classroomType);
        return classroomTypeMapper.toDto(classroomType);
    }

    @Override
    public Optional<ClassroomTypeDTO> partialUpdate(ClassroomTypeDTO classroomTypeDTO) {
        LOG.debug("Request to partially update ClassroomType : {}", classroomTypeDTO);

        return classroomTypeRepository
            .findById(classroomTypeDTO.getId())
            .map(existingClassroomType -> {
                classroomTypeMapper.partialUpdate(existingClassroomType, classroomTypeDTO);

                return existingClassroomType;
            })
            .map(classroomTypeRepository::save)
            .map(classroomTypeMapper::toDto);
    }

    @Override
    public Page<ClassroomTypeDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all ClassroomTypes");
        return classroomTypeRepository.findAll(pageable).map(classroomTypeMapper::toDto);
    }

    @Override
    public Optional<ClassroomTypeDTO> findOne(String id) {
        LOG.debug("Request to get ClassroomType : {}", id);
        return classroomTypeRepository.findById(id).map(classroomTypeMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete ClassroomType : {}", id);
        classroomTypeRepository.deleteById(id);
    }
}
