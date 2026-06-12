package co.edu.sena.service.impl;

import co.edu.sena.domain.LevelEducation;
import co.edu.sena.repository.LevelEducationRepository;
import co.edu.sena.service.LevelEducationService;
import co.edu.sena.service.dto.LevelEducationDTO;
import co.edu.sena.service.mapper.LevelEducationMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.LevelEducation}.
 */
@Service
public class LevelEducationServiceImpl implements LevelEducationService {

    private static final Logger LOG = LoggerFactory.getLogger(LevelEducationServiceImpl.class);

    private final LevelEducationRepository levelEducationRepository;

    private final LevelEducationMapper levelEducationMapper;

    public LevelEducationServiceImpl(LevelEducationRepository levelEducationRepository, LevelEducationMapper levelEducationMapper) {
        this.levelEducationRepository = levelEducationRepository;
        this.levelEducationMapper = levelEducationMapper;
    }

    @Override
    public LevelEducationDTO save(LevelEducationDTO levelEducationDTO) {
        LOG.debug("Request to save LevelEducation : {}", levelEducationDTO);
        LevelEducation levelEducation = levelEducationMapper.toEntity(levelEducationDTO);
        levelEducation = levelEducationRepository.save(levelEducation);
        return levelEducationMapper.toDto(levelEducation);
    }

    @Override
    public LevelEducationDTO update(LevelEducationDTO levelEducationDTO) {
        LOG.debug("Request to update LevelEducation : {}", levelEducationDTO);
        LevelEducation levelEducation = levelEducationMapper.toEntity(levelEducationDTO);
        levelEducation = levelEducationRepository.save(levelEducation);
        return levelEducationMapper.toDto(levelEducation);
    }

    @Override
    public Optional<LevelEducationDTO> partialUpdate(LevelEducationDTO levelEducationDTO) {
        LOG.debug("Request to partially update LevelEducation : {}", levelEducationDTO);

        return levelEducationRepository
            .findById(levelEducationDTO.getId())
            .map(existingLevelEducation -> {
                levelEducationMapper.partialUpdate(existingLevelEducation, levelEducationDTO);

                return existingLevelEducation;
            })
            .map(levelEducationRepository::save)
            .map(levelEducationMapper::toDto);
    }

    @Override
    public Page<LevelEducationDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all LevelEducations");
        return levelEducationRepository.findAll(pageable).map(levelEducationMapper::toDto);
    }

    @Override
    public Optional<LevelEducationDTO> findOne(String id) {
        LOG.debug("Request to get LevelEducation : {}", id);
        return levelEducationRepository.findById(id).map(levelEducationMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete LevelEducation : {}", id);
        levelEducationRepository.deleteById(id);
    }
}
