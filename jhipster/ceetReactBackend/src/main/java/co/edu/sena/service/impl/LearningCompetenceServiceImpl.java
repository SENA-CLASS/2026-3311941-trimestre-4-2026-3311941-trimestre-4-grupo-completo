package co.edu.sena.service.impl;

import co.edu.sena.domain.LearningCompetence;
import co.edu.sena.repository.LearningCompetenceRepository;
import co.edu.sena.service.LearningCompetenceService;
import co.edu.sena.service.dto.LearningCompetenceDTO;
import co.edu.sena.service.mapper.LearningCompetenceMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.LearningCompetence}.
 */
@Service
public class LearningCompetenceServiceImpl implements LearningCompetenceService {

    private static final Logger LOG = LoggerFactory.getLogger(LearningCompetenceServiceImpl.class);

    private final LearningCompetenceRepository learningCompetenceRepository;

    private final LearningCompetenceMapper learningCompetenceMapper;

    public LearningCompetenceServiceImpl(
        LearningCompetenceRepository learningCompetenceRepository,
        LearningCompetenceMapper learningCompetenceMapper
    ) {
        this.learningCompetenceRepository = learningCompetenceRepository;
        this.learningCompetenceMapper = learningCompetenceMapper;
    }

    @Override
    public LearningCompetenceDTO save(LearningCompetenceDTO learningCompetenceDTO) {
        LOG.debug("Request to save LearningCompetence : {}", learningCompetenceDTO);
        LearningCompetence learningCompetence = learningCompetenceMapper.toEntity(learningCompetenceDTO);
        learningCompetence = learningCompetenceRepository.save(learningCompetence);
        return learningCompetenceMapper.toDto(learningCompetence);
    }

    @Override
    public LearningCompetenceDTO update(LearningCompetenceDTO learningCompetenceDTO) {
        LOG.debug("Request to update LearningCompetence : {}", learningCompetenceDTO);
        LearningCompetence learningCompetence = learningCompetenceMapper.toEntity(learningCompetenceDTO);
        learningCompetence = learningCompetenceRepository.save(learningCompetence);
        return learningCompetenceMapper.toDto(learningCompetence);
    }

    @Override
    public Optional<LearningCompetenceDTO> partialUpdate(LearningCompetenceDTO learningCompetenceDTO) {
        LOG.debug("Request to partially update LearningCompetence : {}", learningCompetenceDTO);

        return learningCompetenceRepository
            .findById(learningCompetenceDTO.getId())
            .map(existingLearningCompetence -> {
                learningCompetenceMapper.partialUpdate(existingLearningCompetence, learningCompetenceDTO);

                return existingLearningCompetence;
            })
            .map(learningCompetenceRepository::save)
            .map(learningCompetenceMapper::toDto);
    }

    @Override
    public Page<LearningCompetenceDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all LearningCompetences");
        return learningCompetenceRepository.findAll(pageable).map(learningCompetenceMapper::toDto);
    }

    @Override
    public Optional<LearningCompetenceDTO> findOne(String id) {
        LOG.debug("Request to get LearningCompetence : {}", id);
        return learningCompetenceRepository.findById(id).map(learningCompetenceMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete LearningCompetence : {}", id);
        learningCompetenceRepository.deleteById(id);
    }
}
