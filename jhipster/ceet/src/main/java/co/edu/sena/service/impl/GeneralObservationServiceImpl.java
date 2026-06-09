package co.edu.sena.service.impl;

import co.edu.sena.domain.GeneralObservation;
import co.edu.sena.repository.GeneralObservationRepository;
import co.edu.sena.service.GeneralObservationService;
import co.edu.sena.service.dto.GeneralObservationDTO;
import co.edu.sena.service.mapper.GeneralObservationMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.GeneralObservation}.
 */
@Service
public class GeneralObservationServiceImpl implements GeneralObservationService {

    private static final Logger LOG = LoggerFactory.getLogger(GeneralObservationServiceImpl.class);

    private final GeneralObservationRepository generalObservationRepository;

    private final GeneralObservationMapper generalObservationMapper;

    public GeneralObservationServiceImpl(
        GeneralObservationRepository generalObservationRepository,
        GeneralObservationMapper generalObservationMapper
    ) {
        this.generalObservationRepository = generalObservationRepository;
        this.generalObservationMapper = generalObservationMapper;
    }

    @Override
    public GeneralObservationDTO save(GeneralObservationDTO generalObservationDTO) {
        LOG.debug("Request to save GeneralObservation : {}", generalObservationDTO);
        GeneralObservation generalObservation = generalObservationMapper.toEntity(generalObservationDTO);
        generalObservation = generalObservationRepository.save(generalObservation);
        return generalObservationMapper.toDto(generalObservation);
    }

    @Override
    public GeneralObservationDTO update(GeneralObservationDTO generalObservationDTO) {
        LOG.debug("Request to update GeneralObservation : {}", generalObservationDTO);
        GeneralObservation generalObservation = generalObservationMapper.toEntity(generalObservationDTO);
        generalObservation = generalObservationRepository.save(generalObservation);
        return generalObservationMapper.toDto(generalObservation);
    }

    @Override
    public Optional<GeneralObservationDTO> partialUpdate(GeneralObservationDTO generalObservationDTO) {
        LOG.debug("Request to partially update GeneralObservation : {}", generalObservationDTO);

        return generalObservationRepository
            .findById(generalObservationDTO.getId())
            .map(existingGeneralObservation -> {
                generalObservationMapper.partialUpdate(existingGeneralObservation, generalObservationDTO);

                return existingGeneralObservation;
            })
            .map(generalObservationRepository::save)
            .map(generalObservationMapper::toDto);
    }

    @Override
    public Page<GeneralObservationDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all GeneralObservations");
        return generalObservationRepository.findAll(pageable).map(generalObservationMapper::toDto);
    }

    @Override
    public Optional<GeneralObservationDTO> findOne(String id) {
        LOG.debug("Request to get GeneralObservation : {}", id);
        return generalObservationRepository.findById(id).map(generalObservationMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete GeneralObservation : {}", id);
        generalObservationRepository.deleteById(id);
    }
}
