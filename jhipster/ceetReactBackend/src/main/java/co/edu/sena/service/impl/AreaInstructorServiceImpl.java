package co.edu.sena.service.impl;

import co.edu.sena.domain.AreaInstructor;
import co.edu.sena.repository.AreaInstructorRepository;
import co.edu.sena.service.AreaInstructorService;
import co.edu.sena.service.dto.AreaInstructorDTO;
import co.edu.sena.service.mapper.AreaInstructorMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.AreaInstructor}.
 */
@Service
public class AreaInstructorServiceImpl implements AreaInstructorService {

    private static final Logger LOG = LoggerFactory.getLogger(AreaInstructorServiceImpl.class);

    private final AreaInstructorRepository areaInstructorRepository;

    private final AreaInstructorMapper areaInstructorMapper;

    public AreaInstructorServiceImpl(AreaInstructorRepository areaInstructorRepository, AreaInstructorMapper areaInstructorMapper) {
        this.areaInstructorRepository = areaInstructorRepository;
        this.areaInstructorMapper = areaInstructorMapper;
    }

    @Override
    public AreaInstructorDTO save(AreaInstructorDTO areaInstructorDTO) {
        LOG.debug("Request to save AreaInstructor : {}", areaInstructorDTO);
        AreaInstructor areaInstructor = areaInstructorMapper.toEntity(areaInstructorDTO);
        areaInstructor = areaInstructorRepository.save(areaInstructor);
        return areaInstructorMapper.toDto(areaInstructor);
    }

    @Override
    public AreaInstructorDTO update(AreaInstructorDTO areaInstructorDTO) {
        LOG.debug("Request to update AreaInstructor : {}", areaInstructorDTO);
        AreaInstructor areaInstructor = areaInstructorMapper.toEntity(areaInstructorDTO);
        areaInstructor = areaInstructorRepository.save(areaInstructor);
        return areaInstructorMapper.toDto(areaInstructor);
    }

    @Override
    public Optional<AreaInstructorDTO> partialUpdate(AreaInstructorDTO areaInstructorDTO) {
        LOG.debug("Request to partially update AreaInstructor : {}", areaInstructorDTO);

        return areaInstructorRepository
            .findById(areaInstructorDTO.getId())
            .map(existingAreaInstructor -> {
                areaInstructorMapper.partialUpdate(existingAreaInstructor, areaInstructorDTO);

                return existingAreaInstructor;
            })
            .map(areaInstructorRepository::save)
            .map(areaInstructorMapper::toDto);
    }

    @Override
    public Page<AreaInstructorDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all AreaInstructors");
        return areaInstructorRepository.findAll(pageable).map(areaInstructorMapper::toDto);
    }

    public Page<AreaInstructorDTO> findAllWithEagerRelationships(Pageable pageable) {
        return areaInstructorRepository.findAllWithEagerRelationships(pageable).map(areaInstructorMapper::toDto);
    }

    @Override
    public Optional<AreaInstructorDTO> findOne(String id) {
        LOG.debug("Request to get AreaInstructor : {}", id);
        return areaInstructorRepository.findOneWithEagerRelationships(id).map(areaInstructorMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete AreaInstructor : {}", id);
        areaInstructorRepository.deleteById(id);
    }
}
