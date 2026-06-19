package co.edu.sena.service.impl;

import co.edu.sena.domain.ProjectGroup;
import co.edu.sena.repository.ProjectGroupRepository;
import co.edu.sena.service.ProjectGroupService;
import co.edu.sena.service.dto.ProjectGroupDTO;
import co.edu.sena.service.mapper.ProjectGroupMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.ProjectGroup}.
 */
@Service
public class ProjectGroupServiceImpl implements ProjectGroupService {

    private static final Logger LOG = LoggerFactory.getLogger(ProjectGroupServiceImpl.class);

    private final ProjectGroupRepository projectGroupRepository;

    private final ProjectGroupMapper projectGroupMapper;

    public ProjectGroupServiceImpl(ProjectGroupRepository projectGroupRepository, ProjectGroupMapper projectGroupMapper) {
        this.projectGroupRepository = projectGroupRepository;
        this.projectGroupMapper = projectGroupMapper;
    }

    @Override
    public ProjectGroupDTO save(ProjectGroupDTO projectGroupDTO) {
        LOG.debug("Request to save ProjectGroup : {}", projectGroupDTO);
        ProjectGroup projectGroup = projectGroupMapper.toEntity(projectGroupDTO);
        projectGroup = projectGroupRepository.save(projectGroup);
        return projectGroupMapper.toDto(projectGroup);
    }

    @Override
    public ProjectGroupDTO update(ProjectGroupDTO projectGroupDTO) {
        LOG.debug("Request to update ProjectGroup : {}", projectGroupDTO);
        ProjectGroup projectGroup = projectGroupMapper.toEntity(projectGroupDTO);
        projectGroup = projectGroupRepository.save(projectGroup);
        return projectGroupMapper.toDto(projectGroup);
    }

    @Override
    public Optional<ProjectGroupDTO> partialUpdate(ProjectGroupDTO projectGroupDTO) {
        LOG.debug("Request to partially update ProjectGroup : {}", projectGroupDTO);

        return projectGroupRepository
            .findById(projectGroupDTO.getId())
            .map(existingProjectGroup -> {
                projectGroupMapper.partialUpdate(existingProjectGroup, projectGroupDTO);

                return existingProjectGroup;
            })
            .map(projectGroupRepository::save)
            .map(projectGroupMapper::toDto);
    }

    @Override
    public Page<ProjectGroupDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all ProjectGroups");
        return projectGroupRepository.findAll(pageable).map(projectGroupMapper::toDto);
    }

    public Page<ProjectGroupDTO> findAllWithEagerRelationships(Pageable pageable) {
        return projectGroupRepository.findAllWithEagerRelationships(pageable).map(projectGroupMapper::toDto);
    }

    @Override
    public Optional<ProjectGroupDTO> findOne(String id) {
        LOG.debug("Request to get ProjectGroup : {}", id);
        return projectGroupRepository.findOneWithEagerRelationships(id).map(projectGroupMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete ProjectGroup : {}", id);
        projectGroupRepository.deleteById(id);
    }
}
