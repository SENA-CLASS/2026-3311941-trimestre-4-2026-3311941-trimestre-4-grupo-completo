package co.edu.sena.service.impl;

import co.edu.sena.domain.TrainingProgram;
import co.edu.sena.repository.TrainingProgramRepository;
import co.edu.sena.service.TrainingProgramService;
import co.edu.sena.service.dto.TrainingProgramDTO;
import co.edu.sena.service.mapper.TrainingProgramMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.TrainingProgram}.
 */
@Service
public class TrainingProgramServiceImpl implements TrainingProgramService {

    private static final Logger LOG = LoggerFactory.getLogger(TrainingProgramServiceImpl.class);

    private final TrainingProgramRepository trainingProgramRepository;

    private final TrainingProgramMapper trainingProgramMapper;

    public TrainingProgramServiceImpl(TrainingProgramRepository trainingProgramRepository, TrainingProgramMapper trainingProgramMapper) {
        this.trainingProgramRepository = trainingProgramRepository;
        this.trainingProgramMapper = trainingProgramMapper;
    }

    @Override
    public TrainingProgramDTO save(TrainingProgramDTO trainingProgramDTO) {
        LOG.debug("Request to save TrainingProgram : {}", trainingProgramDTO);
        TrainingProgram trainingProgram = trainingProgramMapper.toEntity(trainingProgramDTO);
        trainingProgram = trainingProgramRepository.save(trainingProgram);
        return trainingProgramMapper.toDto(trainingProgram);
    }

    @Override
    public TrainingProgramDTO update(TrainingProgramDTO trainingProgramDTO) {
        LOG.debug("Request to update TrainingProgram : {}", trainingProgramDTO);
        TrainingProgram trainingProgram = trainingProgramMapper.toEntity(trainingProgramDTO);
        trainingProgram = trainingProgramRepository.save(trainingProgram);
        return trainingProgramMapper.toDto(trainingProgram);
    }

    @Override
    public Optional<TrainingProgramDTO> partialUpdate(TrainingProgramDTO trainingProgramDTO) {
        LOG.debug("Request to partially update TrainingProgram : {}", trainingProgramDTO);

        return trainingProgramRepository
            .findById(trainingProgramDTO.getId())
            .map(existingTrainingProgram -> {
                trainingProgramMapper.partialUpdate(existingTrainingProgram, trainingProgramDTO);

                return existingTrainingProgram;
            })
            .map(trainingProgramRepository::save)
            .map(trainingProgramMapper::toDto);
    }

    @Override
    public Page<TrainingProgramDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all TrainingPrograms");
        return trainingProgramRepository.findAll(pageable).map(trainingProgramMapper::toDto);
    }

    public Page<TrainingProgramDTO> findAllWithEagerRelationships(Pageable pageable) {
        return trainingProgramRepository.findAllWithEagerRelationships(pageable).map(trainingProgramMapper::toDto);
    }

    @Override
    public Optional<TrainingProgramDTO> findOne(String id) {
        LOG.debug("Request to get TrainingProgram : {}", id);
        return trainingProgramRepository.findOneWithEagerRelationships(id).map(trainingProgramMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete TrainingProgram : {}", id);
        trainingProgramRepository.deleteById(id);
    }
}
