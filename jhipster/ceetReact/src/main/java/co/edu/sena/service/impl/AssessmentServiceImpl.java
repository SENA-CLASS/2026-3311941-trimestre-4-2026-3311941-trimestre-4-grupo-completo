package co.edu.sena.service.impl;

import co.edu.sena.domain.Assessment;
import co.edu.sena.repository.AssessmentRepository;
import co.edu.sena.service.AssessmentService;
import co.edu.sena.service.dto.AssessmentDTO;
import co.edu.sena.service.mapper.AssessmentMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.Assessment}.
 */
@Service
public class AssessmentServiceImpl implements AssessmentService {

    private static final Logger LOG = LoggerFactory.getLogger(AssessmentServiceImpl.class);

    private final AssessmentRepository assessmentRepository;

    private final AssessmentMapper assessmentMapper;

    public AssessmentServiceImpl(AssessmentRepository assessmentRepository, AssessmentMapper assessmentMapper) {
        this.assessmentRepository = assessmentRepository;
        this.assessmentMapper = assessmentMapper;
    }

    @Override
    public AssessmentDTO save(AssessmentDTO assessmentDTO) {
        LOG.debug("Request to save Assessment : {}", assessmentDTO);
        Assessment assessment = assessmentMapper.toEntity(assessmentDTO);
        assessment = assessmentRepository.save(assessment);
        return assessmentMapper.toDto(assessment);
    }

    @Override
    public AssessmentDTO update(AssessmentDTO assessmentDTO) {
        LOG.debug("Request to update Assessment : {}", assessmentDTO);
        Assessment assessment = assessmentMapper.toEntity(assessmentDTO);
        assessment = assessmentRepository.save(assessment);
        return assessmentMapper.toDto(assessment);
    }

    @Override
    public Optional<AssessmentDTO> partialUpdate(AssessmentDTO assessmentDTO) {
        LOG.debug("Request to partially update Assessment : {}", assessmentDTO);

        return assessmentRepository
            .findById(assessmentDTO.getId())
            .map(existingAssessment -> {
                assessmentMapper.partialUpdate(existingAssessment, assessmentDTO);

                return existingAssessment;
            })
            .map(assessmentRepository::save)
            .map(assessmentMapper::toDto);
    }

    @Override
    public Page<AssessmentDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all Assessments");
        return assessmentRepository.findAll(pageable).map(assessmentMapper::toDto);
    }

    @Override
    public Optional<AssessmentDTO> findOne(String id) {
        LOG.debug("Request to get Assessment : {}", id);
        return assessmentRepository.findById(id).map(assessmentMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete Assessment : {}", id);
        assessmentRepository.deleteById(id);
    }
}
