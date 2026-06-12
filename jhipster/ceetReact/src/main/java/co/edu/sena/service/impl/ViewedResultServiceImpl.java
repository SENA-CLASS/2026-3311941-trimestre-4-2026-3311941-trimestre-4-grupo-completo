package co.edu.sena.service.impl;

import co.edu.sena.domain.ViewedResult;
import co.edu.sena.repository.ViewedResultRepository;
import co.edu.sena.service.ViewedResultService;
import co.edu.sena.service.dto.ViewedResultDTO;
import co.edu.sena.service.mapper.ViewedResultMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.ViewedResult}.
 */
@Service
public class ViewedResultServiceImpl implements ViewedResultService {

    private static final Logger LOG = LoggerFactory.getLogger(ViewedResultServiceImpl.class);

    private final ViewedResultRepository viewedResultRepository;

    private final ViewedResultMapper viewedResultMapper;

    public ViewedResultServiceImpl(ViewedResultRepository viewedResultRepository, ViewedResultMapper viewedResultMapper) {
        this.viewedResultRepository = viewedResultRepository;
        this.viewedResultMapper = viewedResultMapper;
    }

    @Override
    public ViewedResultDTO save(ViewedResultDTO viewedResultDTO) {
        LOG.debug("Request to save ViewedResult : {}", viewedResultDTO);
        ViewedResult viewedResult = viewedResultMapper.toEntity(viewedResultDTO);
        viewedResult = viewedResultRepository.save(viewedResult);
        return viewedResultMapper.toDto(viewedResult);
    }

    @Override
    public ViewedResultDTO update(ViewedResultDTO viewedResultDTO) {
        LOG.debug("Request to update ViewedResult : {}", viewedResultDTO);
        ViewedResult viewedResult = viewedResultMapper.toEntity(viewedResultDTO);
        viewedResult = viewedResultRepository.save(viewedResult);
        return viewedResultMapper.toDto(viewedResult);
    }

    @Override
    public Optional<ViewedResultDTO> partialUpdate(ViewedResultDTO viewedResultDTO) {
        LOG.debug("Request to partially update ViewedResult : {}", viewedResultDTO);

        return viewedResultRepository
            .findById(viewedResultDTO.getId())
            .map(existingViewedResult -> {
                viewedResultMapper.partialUpdate(existingViewedResult, viewedResultDTO);

                return existingViewedResult;
            })
            .map(viewedResultRepository::save)
            .map(viewedResultMapper::toDto);
    }

    @Override
    public Page<ViewedResultDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all ViewedResults");
        return viewedResultRepository.findAll(pageable).map(viewedResultMapper::toDto);
    }

    public Page<ViewedResultDTO> findAllWithEagerRelationships(Pageable pageable) {
        return viewedResultRepository.findAllWithEagerRelationships(pageable).map(viewedResultMapper::toDto);
    }

    @Override
    public Optional<ViewedResultDTO> findOne(String id) {
        LOG.debug("Request to get ViewedResult : {}", id);
        return viewedResultRepository.findOneWithEagerRelationships(id).map(viewedResultMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete ViewedResult : {}", id);
        viewedResultRepository.deleteById(id);
    }
}
