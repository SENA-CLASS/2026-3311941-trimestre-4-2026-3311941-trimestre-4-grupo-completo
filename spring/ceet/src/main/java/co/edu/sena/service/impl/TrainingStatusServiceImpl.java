package co.edu.sena.service.impl;

import co.edu.sena.domain.TrainingStatus;
import co.edu.sena.repository.TrainingStatusRepository;
import co.edu.sena.service.TrainingStatusService;
import co.edu.sena.service.dto.TrainingStatusDTO;
import co.edu.sena.service.mapper.TrainingStatusMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.TrainingStatus}.
 */
@Service
public class TrainingStatusServiceImpl implements TrainingStatusService {

    private static final Logger LOG = LoggerFactory.getLogger(TrainingStatusServiceImpl.class);

    private final TrainingStatusRepository trainingStatusRepository;

    private final TrainingStatusMapper trainingStatusMapper;

    public TrainingStatusServiceImpl(TrainingStatusRepository trainingStatusRepository, TrainingStatusMapper trainingStatusMapper) {
        this.trainingStatusRepository = trainingStatusRepository;
        this.trainingStatusMapper = trainingStatusMapper;
    }

    @Override
    public TrainingStatusDTO save(TrainingStatusDTO trainingStatusDTO) {
        LOG.debug("Request to save TrainingStatus : {}", trainingStatusDTO);
        TrainingStatus trainingStatus = trainingStatusMapper.toEntity(trainingStatusDTO);
        trainingStatus = trainingStatusRepository.save(trainingStatus);
        return trainingStatusMapper.toDto(trainingStatus);
    }

    @Override
    public TrainingStatusDTO update(TrainingStatusDTO trainingStatusDTO) {
        LOG.debug("Request to update TrainingStatus : {}", trainingStatusDTO);
        TrainingStatus trainingStatus = trainingStatusMapper.toEntity(trainingStatusDTO);
        trainingStatus = trainingStatusRepository.save(trainingStatus);
        return trainingStatusMapper.toDto(trainingStatus);
    }

    @Override
    public Optional<TrainingStatusDTO> partialUpdate(TrainingStatusDTO trainingStatusDTO) {
        LOG.debug("Request to partially update TrainingStatus : {}", trainingStatusDTO);

        return trainingStatusRepository
            .findById(trainingStatusDTO.getId())
            .map(existingTrainingStatus -> {
                trainingStatusMapper.partialUpdate(existingTrainingStatus, trainingStatusDTO);

                return existingTrainingStatus;
            })
            .map(trainingStatusRepository::save)
            .map(trainingStatusMapper::toDto);
    }

    @Override
    public Page<TrainingStatusDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all TrainingStatuses");
        return trainingStatusRepository.findAll(pageable).map(trainingStatusMapper::toDto);
    }

    @Override
    public Optional<TrainingStatusDTO> findOne(String id) {
        LOG.debug("Request to get TrainingStatus : {}", id);
        return trainingStatusRepository.findById(id).map(trainingStatusMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete TrainingStatus : {}", id);
        trainingStatusRepository.deleteById(id);
    }
}
