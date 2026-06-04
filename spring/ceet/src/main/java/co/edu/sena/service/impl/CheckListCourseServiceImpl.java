package co.edu.sena.service.impl;

import co.edu.sena.domain.CheckListCourse;
import co.edu.sena.repository.CheckListCourseRepository;
import co.edu.sena.service.CheckListCourseService;
import co.edu.sena.service.dto.CheckListCourseDTO;
import co.edu.sena.service.mapper.CheckListCourseMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.CheckListCourse}.
 */
@Service
public class CheckListCourseServiceImpl implements CheckListCourseService {

    private static final Logger LOG = LoggerFactory.getLogger(CheckListCourseServiceImpl.class);

    private final CheckListCourseRepository checkListCourseRepository;

    private final CheckListCourseMapper checkListCourseMapper;

    public CheckListCourseServiceImpl(CheckListCourseRepository checkListCourseRepository, CheckListCourseMapper checkListCourseMapper) {
        this.checkListCourseRepository = checkListCourseRepository;
        this.checkListCourseMapper = checkListCourseMapper;
    }

    @Override
    public CheckListCourseDTO save(CheckListCourseDTO checkListCourseDTO) {
        LOG.debug("Request to save CheckListCourse : {}", checkListCourseDTO);
        CheckListCourse checkListCourse = checkListCourseMapper.toEntity(checkListCourseDTO);
        checkListCourse = checkListCourseRepository.save(checkListCourse);
        return checkListCourseMapper.toDto(checkListCourse);
    }

    @Override
    public CheckListCourseDTO update(CheckListCourseDTO checkListCourseDTO) {
        LOG.debug("Request to update CheckListCourse : {}", checkListCourseDTO);
        CheckListCourse checkListCourse = checkListCourseMapper.toEntity(checkListCourseDTO);
        checkListCourse = checkListCourseRepository.save(checkListCourse);
        return checkListCourseMapper.toDto(checkListCourse);
    }

    @Override
    public Optional<CheckListCourseDTO> partialUpdate(CheckListCourseDTO checkListCourseDTO) {
        LOG.debug("Request to partially update CheckListCourse : {}", checkListCourseDTO);

        return checkListCourseRepository
            .findById(checkListCourseDTO.getId())
            .map(existingCheckListCourse -> {
                checkListCourseMapper.partialUpdate(existingCheckListCourse, checkListCourseDTO);

                return existingCheckListCourse;
            })
            .map(checkListCourseRepository::save)
            .map(checkListCourseMapper::toDto);
    }

    @Override
    public Page<CheckListCourseDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all CheckListCourses");
        return checkListCourseRepository.findAll(pageable).map(checkListCourseMapper::toDto);
    }

    @Override
    public Optional<CheckListCourseDTO> findOne(String id) {
        LOG.debug("Request to get CheckListCourse : {}", id);
        return checkListCourseRepository.findById(id).map(checkListCourseMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete CheckListCourse : {}", id);
        checkListCourseRepository.deleteById(id);
    }
}
