package co.edu.sena.service.impl;

import co.edu.sena.domain.Instructor;
import co.edu.sena.repository.InstructorRepository;
import co.edu.sena.service.InstructorService;
import co.edu.sena.service.dto.InstructorDTO;
import co.edu.sena.service.mapper.InstructorMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.Instructor}.
 */
@Service
public class InstructorServiceImpl implements InstructorService {

    private static final Logger LOG = LoggerFactory.getLogger(InstructorServiceImpl.class);

    private final InstructorRepository instructorRepository;

    private final InstructorMapper instructorMapper;

    public InstructorServiceImpl(InstructorRepository instructorRepository, InstructorMapper instructorMapper) {
        this.instructorRepository = instructorRepository;
        this.instructorMapper = instructorMapper;
    }

    @Override
    public InstructorDTO save(InstructorDTO instructorDTO) {
        LOG.debug("Request to save Instructor : {}", instructorDTO);
        Instructor instructor = instructorMapper.toEntity(instructorDTO);
        instructor = instructorRepository.save(instructor);
        return instructorMapper.toDto(instructor);
    }

    @Override
    public InstructorDTO update(InstructorDTO instructorDTO) {
        LOG.debug("Request to update Instructor : {}", instructorDTO);
        Instructor instructor = instructorMapper.toEntity(instructorDTO);
        instructor = instructorRepository.save(instructor);
        return instructorMapper.toDto(instructor);
    }

    @Override
    public Optional<InstructorDTO> partialUpdate(InstructorDTO instructorDTO) {
        LOG.debug("Request to partially update Instructor : {}", instructorDTO);

        return instructorRepository
            .findById(instructorDTO.getId())
            .map(existingInstructor -> {
                instructorMapper.partialUpdate(existingInstructor, instructorDTO);

                return existingInstructor;
            })
            .map(instructorRepository::save)
            .map(instructorMapper::toDto);
    }

    @Override
    public Page<InstructorDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all Instructors");
        return instructorRepository.findAll(pageable).map(instructorMapper::toDto);
    }

    @Override
    public Optional<InstructorDTO> findOne(String id) {
        LOG.debug("Request to get Instructor : {}", id);
        return instructorRepository.findById(id).map(instructorMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete Instructor : {}", id);
        instructorRepository.deleteById(id);
    }
}
