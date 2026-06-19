package co.edu.sena.service.impl;

import co.edu.sena.domain.ProjectPhase;
import co.edu.sena.repository.ProjectPhaseRepository;
import co.edu.sena.service.ProjectPhaseService;
import co.edu.sena.service.dto.ProjectPhaseDTO;
import co.edu.sena.service.mapper.ProjectPhaseMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.ProjectPhase}.
 */
@Service
public class ProjectPhaseServiceImpl implements ProjectPhaseService {

    private static final Logger LOG = LoggerFactory.getLogger(ProjectPhaseServiceImpl.class);

    private final ProjectPhaseRepository projectPhaseRepository;

    private final ProjectPhaseMapper projectPhaseMapper;

    public ProjectPhaseServiceImpl(ProjectPhaseRepository projectPhaseRepository, ProjectPhaseMapper projectPhaseMapper) {
        this.projectPhaseRepository = projectPhaseRepository;
        this.projectPhaseMapper = projectPhaseMapper;
    }

    @Override
    public ProjectPhaseDTO save(ProjectPhaseDTO projectPhaseDTO) {
        LOG.debug("Request to save ProjectPhase : {}", projectPhaseDTO);
        ProjectPhase projectPhase = projectPhaseMapper.toEntity(projectPhaseDTO);
        projectPhase = projectPhaseRepository.save(projectPhase);
        return projectPhaseMapper.toDto(projectPhase);
    }

    @Override
    public ProjectPhaseDTO update(ProjectPhaseDTO projectPhaseDTO) {
        LOG.debug("Request to update ProjectPhase : {}", projectPhaseDTO);
        ProjectPhase projectPhase = projectPhaseMapper.toEntity(projectPhaseDTO);
        projectPhase = projectPhaseRepository.save(projectPhase);
        return projectPhaseMapper.toDto(projectPhase);
    }

    @Override
    public Optional<ProjectPhaseDTO> partialUpdate(ProjectPhaseDTO projectPhaseDTO) {
        LOG.debug("Request to partially update ProjectPhase : {}", projectPhaseDTO);

        return projectPhaseRepository
            .findById(projectPhaseDTO.getId())
            .map(existingProjectPhase -> {
                projectPhaseMapper.partialUpdate(existingProjectPhase, projectPhaseDTO);

                return existingProjectPhase;
            })
            .map(projectPhaseRepository::save)
            .map(projectPhaseMapper::toDto);
    }

    @Override
    public Page<ProjectPhaseDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all ProjectPhases");
        return projectPhaseRepository.findAll(pageable).map(projectPhaseMapper::toDto);
    }

    public Page<ProjectPhaseDTO> findAllWithEagerRelationships(Pageable pageable) {
        return projectPhaseRepository.findAllWithEagerRelationships(pageable).map(projectPhaseMapper::toDto);
    }

    @Override
    public Optional<ProjectPhaseDTO> findOne(String id) {
        LOG.debug("Request to get ProjectPhase : {}", id);
        return projectPhaseRepository.findOneWithEagerRelationships(id).map(projectPhaseMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete ProjectPhase : {}", id);
        projectPhaseRepository.deleteById(id);
    }
}
