package co.edu.sena.service.impl;

import co.edu.sena.domain.LogError;
import co.edu.sena.repository.LogErrorRepository;
import co.edu.sena.service.LogErrorService;
import co.edu.sena.service.dto.LogErrorDTO;
import co.edu.sena.service.mapper.LogErrorMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.LogError}.
 */
@Service
public class LogErrorServiceImpl implements LogErrorService {

    private static final Logger LOG = LoggerFactory.getLogger(LogErrorServiceImpl.class);

    private final LogErrorRepository logErrorRepository;

    private final LogErrorMapper logErrorMapper;

    public LogErrorServiceImpl(LogErrorRepository logErrorRepository, LogErrorMapper logErrorMapper) {
        this.logErrorRepository = logErrorRepository;
        this.logErrorMapper = logErrorMapper;
    }

    @Override
    public LogErrorDTO save(LogErrorDTO logErrorDTO) {
        LOG.debug("Request to save LogError : {}", logErrorDTO);
        LogError logError = logErrorMapper.toEntity(logErrorDTO);
        logError = logErrorRepository.save(logError);
        return logErrorMapper.toDto(logError);
    }

    @Override
    public LogErrorDTO update(LogErrorDTO logErrorDTO) {
        LOG.debug("Request to update LogError : {}", logErrorDTO);
        LogError logError = logErrorMapper.toEntity(logErrorDTO);
        logError = logErrorRepository.save(logError);
        return logErrorMapper.toDto(logError);
    }

    @Override
    public Optional<LogErrorDTO> partialUpdate(LogErrorDTO logErrorDTO) {
        LOG.debug("Request to partially update LogError : {}", logErrorDTO);

        return logErrorRepository
            .findById(logErrorDTO.getId())
            .map(existingLogError -> {
                logErrorMapper.partialUpdate(existingLogError, logErrorDTO);

                return existingLogError;
            })
            .map(logErrorRepository::save)
            .map(logErrorMapper::toDto);
    }

    @Override
    public Page<LogErrorDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all LogErrors");
        return logErrorRepository.findAll(pageable).map(logErrorMapper::toDto);
    }

    @Override
    public Optional<LogErrorDTO> findOne(String id) {
        LOG.debug("Request to get LogError : {}", id);
        return logErrorRepository.findById(id).map(logErrorMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete LogError : {}", id);
        logErrorRepository.deleteById(id);
    }
}
