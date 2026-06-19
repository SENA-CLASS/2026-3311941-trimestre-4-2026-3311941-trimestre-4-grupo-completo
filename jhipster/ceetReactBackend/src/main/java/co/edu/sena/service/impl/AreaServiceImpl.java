package co.edu.sena.service.impl;

import co.edu.sena.domain.Area;
import co.edu.sena.repository.AreaRepository;
import co.edu.sena.service.AreaService;
import co.edu.sena.service.dto.AreaDTO;
import co.edu.sena.service.mapper.AreaMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.Area}.
 */
@Service
public class AreaServiceImpl implements AreaService {

    private static final Logger LOG = LoggerFactory.getLogger(AreaServiceImpl.class);

    private final AreaRepository areaRepository;

    private final AreaMapper areaMapper;

    public AreaServiceImpl(AreaRepository areaRepository, AreaMapper areaMapper) {
        this.areaRepository = areaRepository;
        this.areaMapper = areaMapper;
    }

    @Override
    public AreaDTO save(AreaDTO areaDTO) {
        LOG.debug("Request to save Area : {}", areaDTO);
        Area area = areaMapper.toEntity(areaDTO);
        area = areaRepository.save(area);
        return areaMapper.toDto(area);
    }

    @Override
    public AreaDTO update(AreaDTO areaDTO) {
        LOG.debug("Request to update Area : {}", areaDTO);
        Area area = areaMapper.toEntity(areaDTO);
        area = areaRepository.save(area);
        return areaMapper.toDto(area);
    }

    @Override
    public Optional<AreaDTO> partialUpdate(AreaDTO areaDTO) {
        LOG.debug("Request to partially update Area : {}", areaDTO);

        return areaRepository
            .findById(areaDTO.getId())
            .map(existingArea -> {
                areaMapper.partialUpdate(existingArea, areaDTO);

                return existingArea;
            })
            .map(areaRepository::save)
            .map(areaMapper::toDto);
    }

    @Override
    public Page<AreaDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all Areas");
        return areaRepository.findAll(pageable).map(areaMapper::toDto);
    }

    @Override
    public Optional<AreaDTO> findOne(String id) {
        LOG.debug("Request to get Area : {}", id);
        return areaRepository.findById(id).map(areaMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete Area : {}", id);
        areaRepository.deleteById(id);
    }
}
