package co.edu.sena.service.impl;

import co.edu.sena.domain.PlanningActivity;
import co.edu.sena.repository.PlanningActivityRepository;
import co.edu.sena.service.PlanningActivityService;
import co.edu.sena.service.dto.PlanningActivityDTO;
import co.edu.sena.service.mapper.PlanningActivityMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.PlanningActivity}.
 */
@Service
public class PlanningActivityServiceImpl implements PlanningActivityService {

    private static final Logger LOG = LoggerFactory.getLogger(PlanningActivityServiceImpl.class);

    private final PlanningActivityRepository planningActivityRepository;

    private final PlanningActivityMapper planningActivityMapper;

    public PlanningActivityServiceImpl(
        PlanningActivityRepository planningActivityRepository,
        PlanningActivityMapper planningActivityMapper
    ) {
        this.planningActivityRepository = planningActivityRepository;
        this.planningActivityMapper = planningActivityMapper;
    }

    @Override
    public PlanningActivityDTO save(PlanningActivityDTO planningActivityDTO) {
        LOG.debug("Request to save PlanningActivity : {}", planningActivityDTO);
        PlanningActivity planningActivity = planningActivityMapper.toEntity(planningActivityDTO);
        planningActivity = planningActivityRepository.save(planningActivity);
        return planningActivityMapper.toDto(planningActivity);
    }

    @Override
    public PlanningActivityDTO update(PlanningActivityDTO planningActivityDTO) {
        LOG.debug("Request to update PlanningActivity : {}", planningActivityDTO);
        PlanningActivity planningActivity = planningActivityMapper.toEntity(planningActivityDTO);
        planningActivity = planningActivityRepository.save(planningActivity);
        return planningActivityMapper.toDto(planningActivity);
    }

    @Override
    public Optional<PlanningActivityDTO> partialUpdate(PlanningActivityDTO planningActivityDTO) {
        LOG.debug("Request to partially update PlanningActivity : {}", planningActivityDTO);

        return planningActivityRepository
            .findById(planningActivityDTO.getId())
            .map(existingPlanningActivity -> {
                planningActivityMapper.partialUpdate(existingPlanningActivity, planningActivityDTO);

                return existingPlanningActivity;
            })
            .map(planningActivityRepository::save)
            .map(planningActivityMapper::toDto);
    }

    @Override
    public Page<PlanningActivityDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all PlanningActivities");
        return planningActivityRepository.findAll(pageable).map(planningActivityMapper::toDto);
    }

    @Override
    public Optional<PlanningActivityDTO> findOne(String id) {
        LOG.debug("Request to get PlanningActivity : {}", id);
        return planningActivityRepository.findById(id).map(planningActivityMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete PlanningActivity : {}", id);
        planningActivityRepository.deleteById(id);
    }
}
