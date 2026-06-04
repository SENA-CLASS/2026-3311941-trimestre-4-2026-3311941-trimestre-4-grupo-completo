package co.edu.sena.service.impl;

import co.edu.sena.domain.Planning;
import co.edu.sena.repository.PlanningRepository;
import co.edu.sena.service.PlanningService;
import co.edu.sena.service.dto.PlanningDTO;
import co.edu.sena.service.mapper.PlanningMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.Planning}.
 */
@Service
public class PlanningServiceImpl implements PlanningService {

    private static final Logger LOG = LoggerFactory.getLogger(PlanningServiceImpl.class);

    private final PlanningRepository planningRepository;

    private final PlanningMapper planningMapper;

    public PlanningServiceImpl(PlanningRepository planningRepository, PlanningMapper planningMapper) {
        this.planningRepository = planningRepository;
        this.planningMapper = planningMapper;
    }

    @Override
    public PlanningDTO save(PlanningDTO planningDTO) {
        LOG.debug("Request to save Planning : {}", planningDTO);
        Planning planning = planningMapper.toEntity(planningDTO);
        planning = planningRepository.save(planning);
        return planningMapper.toDto(planning);
    }

    @Override
    public PlanningDTO update(PlanningDTO planningDTO) {
        LOG.debug("Request to update Planning : {}", planningDTO);
        Planning planning = planningMapper.toEntity(planningDTO);
        planning = planningRepository.save(planning);
        return planningMapper.toDto(planning);
    }

    @Override
    public Optional<PlanningDTO> partialUpdate(PlanningDTO planningDTO) {
        LOG.debug("Request to partially update Planning : {}", planningDTO);

        return planningRepository
            .findById(planningDTO.getId())
            .map(existingPlanning -> {
                planningMapper.partialUpdate(existingPlanning, planningDTO);

                return existingPlanning;
            })
            .map(planningRepository::save)
            .map(planningMapper::toDto);
    }

    @Override
    public Page<PlanningDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all Plannings");
        return planningRepository.findAll(pageable).map(planningMapper::toDto);
    }

    @Override
    public Optional<PlanningDTO> findOne(String id) {
        LOG.debug("Request to get Planning : {}", id);
        return planningRepository.findById(id).map(planningMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete Planning : {}", id);
        planningRepository.deleteById(id);
    }
}
