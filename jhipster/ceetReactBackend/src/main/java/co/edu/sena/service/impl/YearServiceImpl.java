package co.edu.sena.service.impl;

import co.edu.sena.domain.Year;
import co.edu.sena.repository.YearRepository;
import co.edu.sena.service.YearService;
import co.edu.sena.service.dto.YearDTO;
import co.edu.sena.service.mapper.YearMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.Year}.
 */
@Service
public class YearServiceImpl implements YearService {

    private static final Logger LOG = LoggerFactory.getLogger(YearServiceImpl.class);

    private final YearRepository yearRepository;

    private final YearMapper yearMapper;

    public YearServiceImpl(YearRepository yearRepository, YearMapper yearMapper) {
        this.yearRepository = yearRepository;
        this.yearMapper = yearMapper;
    }

    @Override
    public YearDTO save(YearDTO yearDTO) {
        LOG.debug("Request to save Year : {}", yearDTO);
        Year year = yearMapper.toEntity(yearDTO);
        year = yearRepository.save(year);
        return yearMapper.toDto(year);
    }

    @Override
    public YearDTO update(YearDTO yearDTO) {
        LOG.debug("Request to update Year : {}", yearDTO);
        Year year = yearMapper.toEntity(yearDTO);
        year = yearRepository.save(year);
        return yearMapper.toDto(year);
    }

    @Override
    public Optional<YearDTO> partialUpdate(YearDTO yearDTO) {
        LOG.debug("Request to partially update Year : {}", yearDTO);

        return yearRepository
            .findById(yearDTO.getId())
            .map(existingYear -> {
                yearMapper.partialUpdate(existingYear, yearDTO);

                return existingYear;
            })
            .map(yearRepository::save)
            .map(yearMapper::toDto);
    }

    @Override
    public Page<YearDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all Years");
        return yearRepository.findAll(pageable).map(yearMapper::toDto);
    }

    @Override
    public Optional<YearDTO> findOne(String id) {
        LOG.debug("Request to get Year : {}", id);
        return yearRepository.findById(id).map(yearMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete Year : {}", id);
        yearRepository.deleteById(id);
    }
}
