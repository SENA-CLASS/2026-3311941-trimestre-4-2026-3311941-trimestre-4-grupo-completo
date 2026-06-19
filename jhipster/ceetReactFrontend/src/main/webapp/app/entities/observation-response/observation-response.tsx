import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { JhiItemCount, JhiPagination, TextFormat, Translate, getPaginationState } from 'react-jhipster';
import { Link, useLocation, useNavigate } from 'react-router';

import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';

import { getEntities } from './observation-response.reducer';

export const ObservationResponse = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const observationResponseList = useAppSelector(state => state.observationResponse.entities);
  const loading = useAppSelector(state => state.observationResponse.loading);
  const totalItems = useAppSelector(state => state.observationResponse.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(pageLocation.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [pageLocation.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = paginationState.sort;
    const { order } = paginationState;
    if (sortFieldName !== fieldName) {
      return faSort;
    }
    return order === ASC ? faSortUp : faSortDown;
  };

  return (
    <div>
      <h2 id="observation-response-heading" data-cy="ObservationResponseHeading">
        <Translate contentKey="ceet2App.observationResponse.home.title">Observation Responses</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="ceet2App.observationResponse.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link
            to="/observation-response/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="ceet2App.observationResponse.home.createLabel">Create new Observation Response</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {observationResponseList?.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="ceet2App.observationResponse.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('numberObservation')}>
                  <Translate contentKey="ceet2App.observationResponse.numberObservation">Number Observation</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('numberObservation')} />
                </th>
                <th className="hand" onClick={sort('obsevation')}>
                  <Translate contentKey="ceet2App.observationResponse.obsevation">Obsevation</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('obsevation')} />
                </th>
                <th className="hand" onClick={sort('juries')}>
                  <Translate contentKey="ceet2App.observationResponse.juries">Juries</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('juries')} />
                </th>
                <th className="hand" onClick={sort('dateObservation')}>
                  <Translate contentKey="ceet2App.observationResponse.dateObservation">Date Observation</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('dateObservation')} />
                </th>
                <th>
                  <Translate contentKey="ceet2App.observationResponse.groupResponse">Group Response</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="ceet2App.observationResponse.customer">Customer</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {observationResponseList.map(observationResponse => (
                <tr key={`entity-${observationResponse.id}`} data-cy="entityTable">
                  <td>
                    <Button as={Link as any} to={`/observation-response/${observationResponse.id}`} variant="link" size="sm">
                      {observationResponse.id}
                    </Button>
                  </td>
                  <td>{observationResponse.numberObservation}</td>
                  <td>{observationResponse.obsevation}</td>
                  <td>{observationResponse.juries}</td>
                  <td>
                    {observationResponse.dateObservation ? (
                      <TextFormat type="date" value={observationResponse.dateObservation} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {observationResponse.groupResponse ? (
                      <Link to={`/group-response/${observationResponse.groupResponse.id}`}>{observationResponse.groupResponse.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {observationResponse.customer ? (
                      <Link to={`/customer/${observationResponse.customer.id}`}>{observationResponse.customer.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        as={Link as any}
                        to={`/observation-response/${observationResponse.id}`}
                        variant="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        as={Link as any}
                        to={`/observation-response/${observationResponse.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        variant="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() =>
                          (globalThis.location.href = `/observation-response/${observationResponse.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
                        }
                        variant="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="ceet2App.observationResponse.home.notFound">No Observation Responses found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={observationResponseList && observationResponseList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default ObservationResponse;
