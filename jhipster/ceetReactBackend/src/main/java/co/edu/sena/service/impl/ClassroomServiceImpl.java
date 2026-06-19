package co.edu.sena.service.impl;

import co.edu.sena.domain.Classroom;
import co.edu.sena.repository.ClassroomRepository;
import co.edu.sena.service.ClassroomService;
import co.edu.sena.service.dto.ClassroomDTO;
import co.edu.sena.service.mapper.ClassroomMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.Classroom}.
 */
@Service
public class ClassroomServiceImpl implements ClassroomService {

    private static final Logger LOG = LoggerFactory.getLogger(ClassroomServiceImpl.class);

    private final ClassroomRepository classroomRepository;

    private final ClassroomMapper classroomMapper;

    public ClassroomServiceImpl(ClassroomRepository classroomRepository, ClassroomMapper classroomMapper) {
        this.classroomRepository = classroomRepository;
        this.classroomMapper = classroomMapper;
    }

    @Override
    public ClassroomDTO save(ClassroomDTO classroomDTO) {
        LOG.debug("Request to save Classroom : {}", classroomDTO);
        Classroom classroom = classroomMapper.toEntity(classroomDTO);
        classroom = classroomRepository.save(classroom);
        return classroomMapper.toDto(classroom);
    }

    @Override
    public ClassroomDTO update(ClassroomDTO classroomDTO) {
        LOG.debug("Request to update Classroom : {}", classroomDTO);
        Classroom classroom = classroomMapper.toEntity(classroomDTO);
        classroom = classroomRepository.save(classroom);
        return classroomMapper.toDto(classroom);
    }

    @Override
    public Optional<ClassroomDTO> partialUpdate(ClassroomDTO classroomDTO) {
        LOG.debug("Request to partially update Classroom : {}", classroomDTO);

        return classroomRepository
            .findById(classroomDTO.getId())
            .map(existingClassroom -> {
                classroomMapper.partialUpdate(existingClassroom, classroomDTO);

                return existingClassroom;
            })
            .map(classroomRepository::save)
            .map(classroomMapper::toDto);
    }

    @Override
    public Page<ClassroomDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all Classrooms");
        return classroomRepository.findAll(pageable).map(classroomMapper::toDto);
    }

    public Page<ClassroomDTO> findAllWithEagerRelationships(Pageable pageable) {
        return classroomRepository.findAllWithEagerRelationships(pageable).map(classroomMapper::toDto);
    }

    @Override
    public Optional<ClassroomDTO> findOne(String id) {
        LOG.debug("Request to get Classroom : {}", id);
        return classroomRepository.findOneWithEagerRelationships(id).map(classroomMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete Classroom : {}", id);
        classroomRepository.deleteById(id);
    }
}
