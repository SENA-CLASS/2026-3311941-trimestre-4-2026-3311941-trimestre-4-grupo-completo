package co.edu.sena.service.impl;

import co.edu.sena.domain.Campus;
import co.edu.sena.repository.CampusRepository;
import co.edu.sena.service.CampusService;
import co.edu.sena.service.dto.CampusDTO;
import co.edu.sena.service.mapper.CampusMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.Campus}.
 */
@Service
public class CampusServiceImpl implements CampusService {

    private static final Logger LOG = LoggerFactory.getLogger(CampusServiceImpl.class);

    private final CampusRepository campusRepository;

    private final CampusMapper campusMapper;

    public CampusServiceImpl(CampusRepository campusRepository, CampusMapper campusMapper) {
        this.campusRepository = campusRepository;
        this.campusMapper = campusMapper;
    }

    @Override
    public CampusDTO save(CampusDTO campusDTO) {
        LOG.debug("Request to save Campus : {}", campusDTO);
        Campus campus = campusMapper.toEntity(campusDTO);
        campus = campusRepository.save(campus);
        return campusMapper.toDto(campus);
    }

    @Override
    public CampusDTO update(CampusDTO campusDTO) {
        LOG.debug("Request to update Campus : {}", campusDTO);
        Campus campus = campusMapper.toEntity(campusDTO);
        campus = campusRepository.save(campus);
        return campusMapper.toDto(campus);
    }

    @Override
    public Optional<CampusDTO> partialUpdate(CampusDTO campusDTO) {
        LOG.debug("Request to partially update Campus : {}", campusDTO);

        return campusRepository
            .findById(campusDTO.getId())
            .map(existingCampus -> {
                campusMapper.partialUpdate(existingCampus, campusDTO);

                return existingCampus;
            })
            .map(campusRepository::save)
            .map(campusMapper::toDto);
    }

    @Override
    public Page<CampusDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all Campuses");
        return campusRepository.findAll(pageable).map(campusMapper::toDto);
    }

    @Override
    public Optional<CampusDTO> findOne(String id) {
        LOG.debug("Request to get Campus : {}", id);
        return campusRepository.findById(id).map(campusMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete Campus : {}", id);
        campusRepository.deleteById(id);
    }
}
