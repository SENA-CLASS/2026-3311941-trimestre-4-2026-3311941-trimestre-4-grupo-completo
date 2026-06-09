package co.edu.sena.service.impl;

import co.edu.sena.domain.GroupResponse;
import co.edu.sena.repository.GroupResponseRepository;
import co.edu.sena.service.GroupResponseService;
import co.edu.sena.service.dto.GroupResponseDTO;
import co.edu.sena.service.mapper.GroupResponseMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.GroupResponse}.
 */
@Service
public class GroupResponseServiceImpl implements GroupResponseService {

    private static final Logger LOG = LoggerFactory.getLogger(GroupResponseServiceImpl.class);

    private final GroupResponseRepository groupResponseRepository;

    private final GroupResponseMapper groupResponseMapper;

    public GroupResponseServiceImpl(GroupResponseRepository groupResponseRepository, GroupResponseMapper groupResponseMapper) {
        this.groupResponseRepository = groupResponseRepository;
        this.groupResponseMapper = groupResponseMapper;
    }

    @Override
    public GroupResponseDTO save(GroupResponseDTO groupResponseDTO) {
        LOG.debug("Request to save GroupResponse : {}", groupResponseDTO);
        GroupResponse groupResponse = groupResponseMapper.toEntity(groupResponseDTO);
        groupResponse = groupResponseRepository.save(groupResponse);
        return groupResponseMapper.toDto(groupResponse);
    }

    @Override
    public GroupResponseDTO update(GroupResponseDTO groupResponseDTO) {
        LOG.debug("Request to update GroupResponse : {}", groupResponseDTO);
        GroupResponse groupResponse = groupResponseMapper.toEntity(groupResponseDTO);
        groupResponse = groupResponseRepository.save(groupResponse);
        return groupResponseMapper.toDto(groupResponse);
    }

    @Override
    public Optional<GroupResponseDTO> partialUpdate(GroupResponseDTO groupResponseDTO) {
        LOG.debug("Request to partially update GroupResponse : {}", groupResponseDTO);

        return groupResponseRepository
            .findById(groupResponseDTO.getId())
            .map(existingGroupResponse -> {
                groupResponseMapper.partialUpdate(existingGroupResponse, groupResponseDTO);

                return existingGroupResponse;
            })
            .map(groupResponseRepository::save)
            .map(groupResponseMapper::toDto);
    }

    @Override
    public Page<GroupResponseDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all GroupResponses");
        return groupResponseRepository.findAll(pageable).map(groupResponseMapper::toDto);
    }

    public Page<GroupResponseDTO> findAllWithEagerRelationships(Pageable pageable) {
        return groupResponseRepository.findAllWithEagerRelationships(pageable).map(groupResponseMapper::toDto);
    }

    @Override
    public Optional<GroupResponseDTO> findOne(String id) {
        LOG.debug("Request to get GroupResponse : {}", id);
        return groupResponseRepository.findOneWithEagerRelationships(id).map(groupResponseMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete GroupResponse : {}", id);
        groupResponseRepository.deleteById(id);
    }
}
