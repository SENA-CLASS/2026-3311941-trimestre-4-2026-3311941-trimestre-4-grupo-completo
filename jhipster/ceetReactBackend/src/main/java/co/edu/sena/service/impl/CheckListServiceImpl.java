package co.edu.sena.service.impl;

import co.edu.sena.domain.CheckList;
import co.edu.sena.repository.CheckListRepository;
import co.edu.sena.service.CheckListService;
import co.edu.sena.service.dto.CheckListDTO;
import co.edu.sena.service.mapper.CheckListMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.CheckList}.
 */
@Service
public class CheckListServiceImpl implements CheckListService {

    private static final Logger LOG = LoggerFactory.getLogger(CheckListServiceImpl.class);

    private final CheckListRepository checkListRepository;

    private final CheckListMapper checkListMapper;

    public CheckListServiceImpl(CheckListRepository checkListRepository, CheckListMapper checkListMapper) {
        this.checkListRepository = checkListRepository;
        this.checkListMapper = checkListMapper;
    }

    @Override
    public CheckListDTO save(CheckListDTO checkListDTO) {
        LOG.debug("Request to save CheckList : {}", checkListDTO);
        CheckList checkList = checkListMapper.toEntity(checkListDTO);
        checkList = checkListRepository.save(checkList);
        return checkListMapper.toDto(checkList);
    }

    @Override
    public CheckListDTO update(CheckListDTO checkListDTO) {
        LOG.debug("Request to update CheckList : {}", checkListDTO);
        CheckList checkList = checkListMapper.toEntity(checkListDTO);
        checkList = checkListRepository.save(checkList);
        return checkListMapper.toDto(checkList);
    }

    @Override
    public Optional<CheckListDTO> partialUpdate(CheckListDTO checkListDTO) {
        LOG.debug("Request to partially update CheckList : {}", checkListDTO);

        return checkListRepository
            .findById(checkListDTO.getId())
            .map(existingCheckList -> {
                checkListMapper.partialUpdate(existingCheckList, checkListDTO);

                return existingCheckList;
            })
            .map(checkListRepository::save)
            .map(checkListMapper::toDto);
    }

    @Override
    public Page<CheckListDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all CheckLists");
        return checkListRepository.findAll(pageable).map(checkListMapper::toDto);
    }

    @Override
    public Optional<CheckListDTO> findOne(String id) {
        LOG.debug("Request to get CheckList : {}", id);
        return checkListRepository.findById(id).map(checkListMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete CheckList : {}", id);
        checkListRepository.deleteById(id);
    }
}
