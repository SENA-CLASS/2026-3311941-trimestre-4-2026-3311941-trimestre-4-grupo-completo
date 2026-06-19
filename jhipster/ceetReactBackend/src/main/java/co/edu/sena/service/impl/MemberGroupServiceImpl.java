package co.edu.sena.service.impl;

import co.edu.sena.domain.MemberGroup;
import co.edu.sena.repository.MemberGroupRepository;
import co.edu.sena.service.MemberGroupService;
import co.edu.sena.service.dto.MemberGroupDTO;
import co.edu.sena.service.mapper.MemberGroupMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.MemberGroup}.
 */
@Service
public class MemberGroupServiceImpl implements MemberGroupService {

    private static final Logger LOG = LoggerFactory.getLogger(MemberGroupServiceImpl.class);

    private final MemberGroupRepository memberGroupRepository;

    private final MemberGroupMapper memberGroupMapper;

    public MemberGroupServiceImpl(MemberGroupRepository memberGroupRepository, MemberGroupMapper memberGroupMapper) {
        this.memberGroupRepository = memberGroupRepository;
        this.memberGroupMapper = memberGroupMapper;
    }

    @Override
    public MemberGroupDTO save(MemberGroupDTO memberGroupDTO) {
        LOG.debug("Request to save MemberGroup : {}", memberGroupDTO);
        MemberGroup memberGroup = memberGroupMapper.toEntity(memberGroupDTO);
        memberGroup = memberGroupRepository.save(memberGroup);
        return memberGroupMapper.toDto(memberGroup);
    }

    @Override
    public MemberGroupDTO update(MemberGroupDTO memberGroupDTO) {
        LOG.debug("Request to update MemberGroup : {}", memberGroupDTO);
        MemberGroup memberGroup = memberGroupMapper.toEntity(memberGroupDTO);
        memberGroup = memberGroupRepository.save(memberGroup);
        return memberGroupMapper.toDto(memberGroup);
    }

    @Override
    public Optional<MemberGroupDTO> partialUpdate(MemberGroupDTO memberGroupDTO) {
        LOG.debug("Request to partially update MemberGroup : {}", memberGroupDTO);

        return memberGroupRepository
            .findById(memberGroupDTO.getId())
            .map(existingMemberGroup -> {
                memberGroupMapper.partialUpdate(existingMemberGroup, memberGroupDTO);

                return existingMemberGroup;
            })
            .map(memberGroupRepository::save)
            .map(memberGroupMapper::toDto);
    }

    @Override
    public Page<MemberGroupDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all MemberGroups");
        return memberGroupRepository.findAll(pageable).map(memberGroupMapper::toDto);
    }

    @Override
    public Optional<MemberGroupDTO> findOne(String id) {
        LOG.debug("Request to get MemberGroup : {}", id);
        return memberGroupRepository.findById(id).map(memberGroupMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete MemberGroup : {}", id);
        memberGroupRepository.deleteById(id);
    }
}
