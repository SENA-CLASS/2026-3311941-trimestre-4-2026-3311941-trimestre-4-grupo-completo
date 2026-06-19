package co.edu.sena.service.impl;

import co.edu.sena.domain.InstructorWorkingDay;
import co.edu.sena.repository.InstructorWorkingDayRepository;
import co.edu.sena.service.InstructorWorkingDayService;
import co.edu.sena.service.dto.InstructorWorkingDayDTO;
import co.edu.sena.service.mapper.InstructorWorkingDayMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.InstructorWorkingDay}.
 */
@Service
public class InstructorWorkingDayServiceImpl implements InstructorWorkingDayService {

    private static final Logger LOG = LoggerFactory.getLogger(InstructorWorkingDayServiceImpl.class);

    private final InstructorWorkingDayRepository instructorWorkingDayRepository;

    private final InstructorWorkingDayMapper instructorWorkingDayMapper;

    public InstructorWorkingDayServiceImpl(
        InstructorWorkingDayRepository instructorWorkingDayRepository,
        InstructorWorkingDayMapper instructorWorkingDayMapper
    ) {
        this.instructorWorkingDayRepository = instructorWorkingDayRepository;
        this.instructorWorkingDayMapper = instructorWorkingDayMapper;
    }

    @Override
    public InstructorWorkingDayDTO save(InstructorWorkingDayDTO instructorWorkingDayDTO) {
        LOG.debug("Request to save InstructorWorkingDay : {}", instructorWorkingDayDTO);
        InstructorWorkingDay instructorWorkingDay = instructorWorkingDayMapper.toEntity(instructorWorkingDayDTO);
        instructorWorkingDay = instructorWorkingDayRepository.save(instructorWorkingDay);
        return instructorWorkingDayMapper.toDto(instructorWorkingDay);
    }

    @Override
    public InstructorWorkingDayDTO update(InstructorWorkingDayDTO instructorWorkingDayDTO) {
        LOG.debug("Request to update InstructorWorkingDay : {}", instructorWorkingDayDTO);
        InstructorWorkingDay instructorWorkingDay = instructorWorkingDayMapper.toEntity(instructorWorkingDayDTO);
        instructorWorkingDay = instructorWorkingDayRepository.save(instructorWorkingDay);
        return instructorWorkingDayMapper.toDto(instructorWorkingDay);
    }

    @Override
    public Optional<InstructorWorkingDayDTO> partialUpdate(InstructorWorkingDayDTO instructorWorkingDayDTO) {
        LOG.debug("Request to partially update InstructorWorkingDay : {}", instructorWorkingDayDTO);

        return instructorWorkingDayRepository
            .findById(instructorWorkingDayDTO.getId())
            .map(existingInstructorWorkingDay -> {
                instructorWorkingDayMapper.partialUpdate(existingInstructorWorkingDay, instructorWorkingDayDTO);

                return existingInstructorWorkingDay;
            })
            .map(instructorWorkingDayRepository::save)
            .map(instructorWorkingDayMapper::toDto);
    }

    @Override
    public Page<InstructorWorkingDayDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all InstructorWorkingDays");
        return instructorWorkingDayRepository.findAll(pageable).map(instructorWorkingDayMapper::toDto);
    }

    @Override
    public Optional<InstructorWorkingDayDTO> findOne(String id) {
        LOG.debug("Request to get InstructorWorkingDay : {}", id);
        return instructorWorkingDayRepository.findById(id).map(instructorWorkingDayMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete InstructorWorkingDay : {}", id);
        instructorWorkingDayRepository.deleteById(id);
    }
}
