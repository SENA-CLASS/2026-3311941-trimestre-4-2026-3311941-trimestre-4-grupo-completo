package co.edu.sena.service.impl;

import co.edu.sena.domain.ObservationResponse;
import co.edu.sena.repository.ObservationResponseRepository;
import co.edu.sena.service.ObservationResponseService;
import co.edu.sena.service.dto.ObservationResponseDTO;
import co.edu.sena.service.mapper.ObservationResponseMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.ObservationResponse}.
 */
@Service
public class ObservationResponseServiceImpl implements ObservationResponseService {

    private static final Logger LOG = LoggerFactory.getLogger(ObservationResponseServiceImpl.class);

    private final ObservationResponseRepository observationResponseRepository;

    private final ObservationResponseMapper observationResponseMapper;

    public ObservationResponseServiceImpl(
        ObservationResponseRepository observationResponseRepository,
        ObservationResponseMapper observationResponseMapper
    ) {
        this.observationResponseRepository = observationResponseRepository;
        this.observationResponseMapper = observationResponseMapper;
    }

    @Override
    public ObservationResponseDTO save(ObservationResponseDTO observationResponseDTO) {
        LOG.debug("Request to save ObservationResponse : {}", observationResponseDTO);
        ObservationResponse observationResponse = observationResponseMapper.toEntity(observationResponseDTO);
        observationResponse = observationResponseRepository.save(observationResponse);
        return observationResponseMapper.toDto(observationResponse);
    }

    @Override
    public ObservationResponseDTO update(ObservationResponseDTO observationResponseDTO) {
        LOG.debug("Request to update ObservationResponse : {}", observationResponseDTO);
        ObservationResponse observationResponse = observationResponseMapper.toEntity(observationResponseDTO);
        observationResponse = observationResponseRepository.save(observationResponse);
        return observationResponseMapper.toDto(observationResponse);
    }

    @Override
    public Optional<ObservationResponseDTO> partialUpdate(ObservationResponseDTO observationResponseDTO) {
        LOG.debug("Request to partially update ObservationResponse : {}", observationResponseDTO);

        return observationResponseRepository
            .findById(observationResponseDTO.getId())
            .map(existingObservationResponse -> {
                observationResponseMapper.partialUpdate(existingObservationResponse, observationResponseDTO);

                return existingObservationResponse;
            })
            .map(observationResponseRepository::save)
            .map(observationResponseMapper::toDto);
    }

    @Override
    public Page<ObservationResponseDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all ObservationResponses");
        return observationResponseRepository.findAll(pageable).map(observationResponseMapper::toDto);
    }

    @Override
    public Optional<ObservationResponseDTO> findOne(String id) {
        LOG.debug("Request to get ObservationResponse : {}", id);
        return observationResponseRepository.findById(id).map(observationResponseMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete ObservationResponse : {}", id);
        observationResponseRepository.deleteById(id);
    }
}
