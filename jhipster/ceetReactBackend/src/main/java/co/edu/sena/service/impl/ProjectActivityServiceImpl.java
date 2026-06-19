package co.edu.sena.service.impl;

import co.edu.sena.domain.ProjectActivity;
import co.edu.sena.repository.ProjectActivityRepository;
import co.edu.sena.service.ProjectActivityService;
import co.edu.sena.service.dto.ProjectActivityDTO;
import co.edu.sena.service.mapper.ProjectActivityMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.ProjectActivity}.
 */
@Service
public class ProjectActivityServiceImpl implements ProjectActivityService {

    private static final Logger LOG = LoggerFactory.getLogger(ProjectActivityServiceImpl.class);

    private final ProjectActivityRepository projectActivityRepository;

    private final ProjectActivityMapper projectActivityMapper;

    public ProjectActivityServiceImpl(ProjectActivityRepository projectActivityRepository, ProjectActivityMapper projectActivityMapper) {
        this.projectActivityRepository = projectActivityRepository;
        this.projectActivityMapper = projectActivityMapper;
    }

    @Override
    public ProjectActivityDTO save(ProjectActivityDTO projectActivityDTO) {
        LOG.debug("Request to save ProjectActivity : {}", projectActivityDTO);
        ProjectActivity projectActivity = projectActivityMapper.toEntity(projectActivityDTO);
        projectActivity = projectActivityRepository.save(projectActivity);
        return projectActivityMapper.toDto(projectActivity);
    }

    @Override
    public ProjectActivityDTO update(ProjectActivityDTO projectActivityDTO) {
        LOG.debug("Request to update ProjectActivity : {}", projectActivityDTO);
        ProjectActivity projectActivity = projectActivityMapper.toEntity(projectActivityDTO);
        projectActivity = projectActivityRepository.save(projectActivity);
        return projectActivityMapper.toDto(projectActivity);
    }

    @Override
    public Optional<ProjectActivityDTO> partialUpdate(ProjectActivityDTO projectActivityDTO) {
        LOG.debug("Request to partially update ProjectActivity : {}", projectActivityDTO);

        return projectActivityRepository
            .findById(projectActivityDTO.getId())
            .map(existingProjectActivity -> {
                projectActivityMapper.partialUpdate(existingProjectActivity, projectActivityDTO);

                return existingProjectActivity;
            })
            .map(projectActivityRepository::save)
            .map(projectActivityMapper::toDto);
    }

    @Override
    public Page<ProjectActivityDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all ProjectActivities");
        return projectActivityRepository.findAll(pageable).map(projectActivityMapper::toDto);
    }

    @Override
    public Optional<ProjectActivityDTO> findOne(String id) {
        LOG.debug("Request to get ProjectActivity : {}", id);
        return projectActivityRepository.findById(id).map(projectActivityMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete ProjectActivity : {}", id);
        projectActivityRepository.deleteById(id);
    }
}
