package co.edu.sena.service.impl;

import co.edu.sena.domain.ItemList;
import co.edu.sena.repository.ItemListRepository;
import co.edu.sena.service.ItemListService;
import co.edu.sena.service.dto.ItemListDTO;
import co.edu.sena.service.mapper.ItemListMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link co.edu.sena.domain.ItemList}.
 */
@Service
public class ItemListServiceImpl implements ItemListService {

    private static final Logger LOG = LoggerFactory.getLogger(ItemListServiceImpl.class);

    private final ItemListRepository itemListRepository;

    private final ItemListMapper itemListMapper;

    public ItemListServiceImpl(ItemListRepository itemListRepository, ItemListMapper itemListMapper) {
        this.itemListRepository = itemListRepository;
        this.itemListMapper = itemListMapper;
    }

    @Override
    public ItemListDTO save(ItemListDTO itemListDTO) {
        LOG.debug("Request to save ItemList : {}", itemListDTO);
        ItemList itemList = itemListMapper.toEntity(itemListDTO);
        itemList = itemListRepository.save(itemList);
        return itemListMapper.toDto(itemList);
    }

    @Override
    public ItemListDTO update(ItemListDTO itemListDTO) {
        LOG.debug("Request to update ItemList : {}", itemListDTO);
        ItemList itemList = itemListMapper.toEntity(itemListDTO);
        itemList = itemListRepository.save(itemList);
        return itemListMapper.toDto(itemList);
    }

    @Override
    public Optional<ItemListDTO> partialUpdate(ItemListDTO itemListDTO) {
        LOG.debug("Request to partially update ItemList : {}", itemListDTO);

        return itemListRepository
            .findById(itemListDTO.getId())
            .map(existingItemList -> {
                itemListMapper.partialUpdate(existingItemList, itemListDTO);

                return existingItemList;
            })
            .map(itemListRepository::save)
            .map(itemListMapper::toDto);
    }

    @Override
    public Page<ItemListDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all ItemLists");
        return itemListRepository.findAll(pageable).map(itemListMapper::toDto);
    }

    public Page<ItemListDTO> findAllWithEagerRelationships(Pageable pageable) {
        return itemListRepository.findAllWithEagerRelationships(pageable).map(itemListMapper::toDto);
    }

    @Override
    public Optional<ItemListDTO> findOne(String id) {
        LOG.debug("Request to get ItemList : {}", id);
        return itemListRepository.findOneWithEagerRelationships(id).map(itemListMapper::toDto);
    }

    @Override
    public void delete(String id) {
        LOG.debug("Request to delete ItemList : {}", id);
        itemListRepository.deleteById(id);
    }
}
