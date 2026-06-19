package co.edu.sena.service.impl;

import co.edu.sena.domain.LearningResult;
import co.edu.sena.repository.LearningResultRepository;
import co.edu.sena.service.LearningResultService;
import co.edu.sena.service.dto.LearningResultDTO;
import co.edu.sena.service.mapper.LearningResultMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.LearningResult}.
 */
@Service
public class LearningResultServiceImpl implements LearningResultService {

    private static final Logger LOG = LoggerFactory.getLogger(LearningResultServiceImpl.class);

    private final LearningResultRepository learningResultRepository;

    private final LearningResultMapper learningResultMapper;

    public LearningResultServiceImpl(LearningResultRepository learningResultRepository, LearningResultMapper learningResultMapper) {
        this.learningResultRepository = learningResultRepository;
        this.learningResultMapper = learningResultMapper;
    }

    @Override
    public LearningResultDTO save(LearningResultDTO learningResultDTO) {
        LOG.debug("Request to save LearningResult : {}", learningResultDTO);
        LearningResult learningResult = learningResultMapper.toEntity(learningResultDTO);
        learningResult = learningResultRepository.save(learningResult);
        return learningResultMapper.toDto(learningResult);
    }

    @Override
    public LearningResultDTO update(LearningResultDTO learningResultDTO) {
        LOG.debug("Request to update LearningResult : {}", learningResultDTO);
        LearningResult learningResult = learningResultMapper.toEntity(learningResultDTO);
        learningResult = learningResultRepository.save(learningResult);
        return learningResultMapper.toDto(learningResult);
    }

    @Override
    public Optional<LearningResultDTO> partialUpdate(LearningResultDTO learningResultDTO) {
        LOG.debug("Request to partially update LearningResult : {}", learningResultDTO);

        return learningResultRepository
            .findById(learningResultDTO.getId())
            .map(existingLearningResult -> {
                learningResultMapper.partialUpdate(existingLearningResult, learningResultDTO);

                return existingLearningResult;
            })
            .map(learningResultRepository::save)
            .map(learningResultMapper::toDto);
    }

    @Override
    public Page<LearningResultDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all LearningResults");
        return learningResultRepository.findAll(pageable).map(learningResultMapper::toDto);
    }

    @Override
    public Optional<LearningResultDTO> findOne(String id) {
        LOG.debug("Request to get LearningResult : {}", id);
        return learningResultRepository.findById(id).map(learningResultMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete LearningResult : {}", id);
        learningResultRepository.deleteById(id);
    }
}
